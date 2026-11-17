import { parse } from 'yaml';
import profileYaml from '../../content/profile.yaml?raw';
import worksYaml from '../../content/works.yaml?raw';
import careersYaml from '../../content/careers.yaml?raw';
import achievementsYaml from '../../content/achievements.yaml?raw';

/** Achievement kinds and their display labels. */
export const ACHIEVEMENT_TYPES = {
	paper: '論文',
	conference: '学会発表',
	talk: '講演・LT',
	contest: 'コンテスト',
	misc: '寄稿・掲載'
} as const;

export type AchievementType = keyof typeof ACHIEVEMENT_TYPES;

/** External link shown in the profile area. */
export interface ProfileLink {
	label: string;
	url: string;
	/** Known icon name ("github" or "x"). */
	icon?: 'github' | 'x';
}

/** Site owner profile. */
export interface Profile {
	siteTitle: string;
	name: string;
	nameEn?: string;
	bio: string;
	links: ProfileLink[];
}

/** Product or project card. */
export interface Work {
	name: string;
	description: string;
	url: string;
}

/** Entry in the career timeline. */
export interface Career {
	/** Free-form period label, e.g. "2020.04.01〜2024.03.31". */
	period: string;
	title: string;
	/** Role or job title at the organization. */
	position?: string;
}

/** Research output or publication (talk, paper, article, ...). */
export interface Achievement {
	/** Date formatted as YYYY-MM-DD. */
	date: string;
	type: AchievementType;
	title: string;
	venue: string;
	/** Author names in publication order. */
	authors: string[];
	/** Supplementary text such as a series or column name. */
	note?: string;
	url?: string;
	awards: string[];
}

/** Achievements published in the same year. */
export interface AchievementYear {
	year: string;
	items: Achievement[];
}

// YAML の書き間違いはビルドを失敗させて、どのファイルの何件目が悪いかを日本語で知らせる
export class ContentError extends Error {
	constructor(file: string, where: string, message: string) {
		super(`[src/content/${file}] ${where}: ${message}`);
	}
}

type Row = Record<string, unknown>;

/** Parse a YAML file, reporting syntax errors with the file name. */
const parseYaml = (file: string, source: string): unknown => {
	try {
		return parse(source);
	} catch (e) {
		// yaml のエラーには行番号付きの位置情報が入っているのでそのまま見せる
		throw new ContentError(file, 'YAMLの書き方', e instanceof Error ? e.message : String(e));
	}
};

/** Reject keys that are not part of the schema, which usually means a typo. */
const checkKeys = (file: string, where: string, row: Row, allowed: readonly string[]): void => {
	for (const key of Object.keys(row)) {
		if (!allowed.includes(key)) {
			throw new ContentError(
				file,
				where,
				`「${key}」は使えない項目名です。打ち間違いではありませんか？（使える項目: ${allowed.join(' / ')}）`
			);
		}
	}
};

const asRows = (file: string, value: unknown): Row[] => {
	if (!Array.isArray(value))
		throw new ContentError(file, 'ファイル全体', '「- 」で始まるリストで書いてください');
	return value.map((row, i) => {
		if (typeof row !== 'object' || row === null || Array.isArray(row)) {
			throw new ContentError(file, `${i + 1}件目`, '「キー: 値」の形で書いてください');
		}
		return row as Row;
	});
};

const str = (file: string, where: string, row: Row, key: string): string => {
	const v = row[key];
	// 数字だけのタイトルなどは YAML が数値として読むので文字列に揃える
	if (typeof v === 'number') return String(v);
	if (typeof v !== 'string' || v.trim() === '') {
		throw new ContentError(file, where, `「${key}」が必要です`);
	}
	return v.trim();
};

const optStr = (file: string, where: string, row: Row, key: string): string | undefined => {
	const v = row[key];
	if (v === undefined || v === null || v === '') return undefined;
	return str(file, where, row, key);
};

/**
 * Read an optional list of strings. A plain string is also accepted; when `splitString`
 * is true it is split on commas so that author lists can be pasted as one line.
 */
const strList = (row: Row, key: string, splitString: boolean): string[] => {
	const v = row[key];
	if (v === undefined || v === null) return [];
	const items = Array.isArray(v) ? v : splitString ? String(v).split(/[,，、]/) : [v];
	return items.map((item) => String(item).trim()).filter((item) => item !== '');
};

const url = (file: string, where: string, value: string): string => {
	if (!/^https?:\/\//.test(value)) {
		throw new ContentError(file, where, `URL は http:// か https:// で始めてください（${value}）`);
	}
	return value;
};

const loadProfile = (): Profile => {
	const file = 'profile.yaml';
	const row = parseYaml(file, profileYaml) as Row;
	checkKeys(file, 'ファイル全体', row, ['siteTitle', 'name', 'nameEn', 'bio', 'links']);
	const links = row.links === undefined ? [] : asRows(file, row.links);
	return {
		siteTitle: str(file, 'siteTitle', row, 'siteTitle'),
		name: str(file, 'name', row, 'name'),
		nameEn: optStr(file, 'nameEn', row, 'nameEn'),
		bio: str(file, 'bio', row, 'bio'),
		links: links.map((link, i) => {
			const where = `links ${i + 1}件目`;
			checkKeys(file, where, link, ['label', 'url', 'icon']);
			const icon = optStr(file, where, link, 'icon');
			if (icon !== undefined && icon !== 'github' && icon !== 'x') {
				throw new ContentError(file, where, `icon は github か x を指定してください（${icon}）`);
			}
			return {
				label: str(file, where, link, 'label'),
				url: url(file, where, str(file, where, link, 'url')),
				icon
			};
		})
	};
};

const loadWorks = (): Work[] => {
	const file = 'works.yaml';
	return asRows(file, parseYaml(file, worksYaml)).map((row, i) => {
		const where = `${i + 1}件目`;
		checkKeys(file, where, row, ['name', 'description', 'url']);
		return {
			name: str(file, where, row, 'name'),
			description: str(file, where, row, 'description'),
			url: url(file, where, str(file, where, row, 'url'))
		};
	});
};

const loadCareers = (): Career[] => {
	const file = 'careers.yaml';
	return asRows(file, parseYaml(file, careersYaml)).map((row, i) => {
		const where = `${i + 1}件目`;
		checkKeys(file, where, row, ['period', 'title', 'position']);
		return {
			period: str(file, where, row, 'period'),
			title: str(file, where, row, 'title'),
			position: optStr(file, where, row, 'position')
		};
	});
};

const loadAchievements = (): Achievement[] => {
	const file = 'achievements.yaml';
	const types = Object.keys(ACHIEVEMENT_TYPES);
	return asRows(file, parseYaml(file, achievementsYaml)).map((row, i) => {
		const where = `${i + 1}件目`;
		checkKeys(file, where, row, [
			'date',
			'type',
			'title',
			'venue',
			'authors',
			'note',
			'url',
			'awards'
		]);
		const date = str(file, where, row, 'date');
		if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
			throw new ContentError(file, where, `date は YYYY-MM-DD 形式で書いてください（${date}）`);
		}
		const type = str(file, where, row, 'type');
		if (!types.includes(type)) {
			throw new ContentError(file, where, `type は ${types.join(' / ')} のどれかです（${type}）`);
		}
		const link = optStr(file, where, row, 'url');
		return {
			date,
			type: type as AchievementType,
			title: str(file, where, row, 'title'),
			venue: str(file, where, row, 'venue'),
			authors: strList(row, 'authors', true),
			note: optStr(file, where, row, 'note'),
			url: link === undefined ? undefined : url(file, where, link),
			awards: strList(row, 'awards', false)
		};
	});
};

/** Group achievements by year, newest first. */
const groupByYear = (items: Achievement[]): AchievementYear[] => {
	// YYYY-MM-DD なので文字列比較で新しい順に並ぶ（同日は書いた順を維持）
	const sorted = [...items].sort((a, b) => b.date.localeCompare(a.date));
	const years: AchievementYear[] = [];
	for (const item of sorted) {
		const year = item.date.slice(0, 4);
		const last = years.at(-1);
		if (last?.year === year) last.items.push(item);
		else years.push({ year, items: [item] });
	}
	return years;
};

/** Load and validate all site content from the YAML files in src/content. */
export const loadContent = () => ({
	profile: loadProfile(),
	works: loadWorks(),
	careers: loadCareers(),
	achievementYears: groupByYear(loadAchievements())
});
