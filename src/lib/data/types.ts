/** Tag attached to an achievement. */
export interface Category {
	/** Label shown in the tag. */
	name: string;
	/** CSS color used as the tag background, e.g. "#ffdbd3". */
	colorCode: string;
}

/** Research output or publication (talk, paper, article, ...). */
export interface Achievement {
	/** Unique, stable key (lowercase letters, digits, hyphens). Used as the each-block key. */
	slug: string;
	title: string;
	conference: string;
	author: string;
	/** Date in JST, formatted as YYYY-MM-DD. */
	date: string;
	/** Link to the paper, article or event page. Omit when there is none. */
	url?: string;
	/** Award names, comma-separated when there are several. Omit when there is none. */
	award?: string;
	categories: Category[];
}

/** Entry in the career timeline. */
export interface Career {
	/** Unique, stable key. */
	slug: string;
	title: string;
	/** Free-form period label, e.g. "2020.04.01〜2024.03.31". */
	term: string;
}

/** Product or project card. */
export interface Work {
	/** Unique, stable key. */
	slug: string;
	name: string;
	description: string;
	url: string;
}
