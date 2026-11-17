/** Languages the site is published in. */
export type Lang = 'ja' | 'en';

/** Achievement kinds and their display labels per language. */
export const ACHIEVEMENT_TYPES = {
	ja: {
		paper: '論文',
		conference: '学会発表',
		talk: '講演・LT',
		contest: 'コンテスト',
		misc: '寄稿・掲載'
	},
	en: {
		paper: 'Paper',
		conference: 'Conference',
		talk: 'Talk',
		contest: 'Contest',
		misc: 'Media'
	}
} as const;

export type AchievementType = keyof (typeof ACHIEVEMENT_TYPES)['ja'];

/** Section of the page, in display order. */
export interface SectionLabel {
	id: 'careers' | 'achievements' | 'works';
	/** Heading and navigation label. */
	label: string;
	/** Small sub-heading in the other language. */
	sub?: string;
}

/** Fixed UI strings (everything that is not written in src/content). */
export const UI = {
	ja: {
		// 下の <section> の並び順に合わせる
		sections: [
			{ id: 'careers', label: '経歴', sub: 'Careers' },
			{ id: 'achievements', label: '発表・掲載', sub: 'Achievements' },
			{ id: 'works', label: '作ったもの', sub: 'Works' }
		] satisfies SectionLabel[],
		navLabel: 'ページ内リンク',
		langLabel: '言語',
		authorSeparator: '、',
		locale: 'ja_JP'
	},
	en: {
		sections: [
			{ id: 'careers', label: 'Careers' },
			{ id: 'achievements', label: 'Achievements' },
			{ id: 'works', label: 'Works' }
		] satisfies SectionLabel[],
		navLabel: 'Sections',
		langLabel: 'Language',
		authorSeparator: ', ',
		locale: 'en_US'
	}
} as const;

/** Path of the top page for each language. */
export const HOME_PATH = { ja: '/', en: '/en' } as const satisfies Record<Lang, string>;
