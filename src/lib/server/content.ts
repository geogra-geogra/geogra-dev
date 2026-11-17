import { error } from '@sveltejs/kit';
import { parse } from 'yaml';
import { ACHIEVEMENT_TYPES, type AchievementType, type Lang } from '#lib/i18n.ts';
import profileYaml from '../../content/profile.yaml?raw';
import worksYaml from '../../content/works.yaml?raw';
import careersYaml from '../../content/careers.yaml?raw';
import achievementsYaml from '../../content/achievements.yaml?raw';

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
	/** Name in the page language. */
	name: string;
	/** Name in the other language, shown under the main name. */
	altName?: string;
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

/** Allowed keys plus the English variants of the translatable ones ("title" -> "titleEn"). */
const withEn = (keys: string[], translatable: string[]): string[] => [
	...keys,
	...translatable.flatMap((key) => [key, `${key}En`])
];

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

const isBlank = (v: unknown): boolean => v === undefined || v === null || v === '';

// 英語ページでは「〜En」を優先し、書かれていなければ日本語の値をそのまま使う
const locKey = (row: Row, key: string, lang: Lang): string =>
	lang === 'en' && !isBlank(row[`${key}En`]) ? `${key}En` : key;

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

const optStr = (file: string, where: string, row: Row, key: string): string | undefined =>
	isBlank(row[key]) ? undefined : str(file, where, row, key);

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

const loadProfile = (lang: Lang): Profile => {
	const file = 'profile.yaml';
	const row = parseYaml(file, profileYaml) as Row;
	checkKeys(file, 'ファイル全体', row, withEn(['links'], ['siteTitle', 'name', 'bio']));
	const links = row.links === undefined ? [] : asRows(file, row.links);
	const name = str(file, 'name', row, 'name');
	const nameEn = optStr(file, 'nameEn', row, 'nameEn');
	return {
		siteTitle: str(file, 'siteTitle', row, locKey(row, 'siteTitle', lang)),
		// 英語ページでは英語名を大きく、日本語名を小さく出す
		name: lang === 'en' ? (nameEn ?? name) : name,
		altName: lang === 'en' ? (nameEn === undefined ? undefined : name) : nameEn,
		bio: str(file, 'bio', row, locKey(row, 'bio', lang)),
		links: links.map((link, i) => {
			const where = `links ${i + 1}件目`;
			checkKeys(file, where, link, withEn(['url', 'icon'], ['label']));
			const icon = optStr(file, where, link, 'icon');
			if (icon !== undefined && icon !== 'github' && icon !== 'x') {
				throw new ContentError(file, where, `icon は github か x を指定してください（${icon}）`);
			}
			return {
				label: str(file, where, link, locKey(link, 'label', lang)),
				url: url(file, where, str(file, where, link, 'url')),
				icon
			};
		})
	};
};

const loadWorks = (lang: Lang): Work[] => {
	const file = 'works.yaml';
	return asRows(file, parseYaml(file, worksYaml)).map((row, i) => {
		const where = `${i + 1}件目`;
		checkKeys(file, where, row, withEn(['url'], ['name', 'description']));
		return {
			name: str(file, where, row, locKey(row, 'name', lang)),
			description: str(file, where, row, locKey(row, 'description', lang)),
			url: url(file, where, str(file, where, row, 'url'))
		};
	});
};

const loadCareers = (lang: Lang): Career[] => {
	const file = 'careers.yaml';
	return asRows(file, parseYaml(file, careersYaml)).map((row, i) => {
		const where = `${i + 1}件目`;
		checkKeys(file, where, row, withEn([], ['period', 'title', 'position']));
		const period = str(file, where, row, locKey(row, 'period', lang));
		return {
			// 英語ページでは「〜」を英語の範囲表記に置き換える
			period: lang === 'en' ? period.replace(/\s*〜\s*/g, ' – ').trim() : period,
			title: str(file, where, row, locKey(row, 'title', lang)),
			position: optStr(file, where, row, locKey(row, 'position', lang))
		};
	});
};

const loadAchievements = (lang: Lang): Achievement[] => {
	const file = 'achievements.yaml';
	const types = Object.keys(ACHIEVEMENT_TYPES.ja);
	return asRows(file, parseYaml(file, achievementsYaml)).map((row, i) => {
		const where = `${i + 1}件目`;
		checkKeys(
			file,
			where,
			row,
			withEn(['date', 'type', 'url'], ['title', 'venue', 'authors', 'note', 'awards'])
		);
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
			title: str(file, where, row, locKey(row, 'title', lang)),
			venue: str(file, where, row, locKey(row, 'venue', lang)),
			authors: strList(row, locKey(row, 'authors', lang), true),
			note: optStr(file, where, row, locKey(row, 'note', lang)),
			url: link === undefined ? undefined : url(file, where, link),
			awards: strList(row, locKey(row, 'awards', lang), false)
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
const loadContent = (lang: Lang) => ({
	lang,
	profile: loadProfile(lang),
	works: loadWorks(lang),
	careers: loadCareers(lang),
	achievementYears: groupByYear(loadAchievements(lang))
});

export type PageContent = ReturnType<typeof loadContent>;

/** Page load shared by the Japanese and English routes. */
export const loadPage = (lang: Lang): PageContent => {
	try {
		return loadContent(lang);
	} catch (e) {
		// 想定外エラーのままだと画面に「Internal Error」としか出ないため、YAML の誤りはメッセージごと表示する
		if (e instanceof ContentError) {
			// ビルド(prerender)時は画面が無いのでログにも出す
			console.error(e.message);
			error(500, e.message);
		}
		throw e;
	}
};
