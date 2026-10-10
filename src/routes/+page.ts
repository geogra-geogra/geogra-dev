import { achievements } from '$lib/data/achievements';
import { careers } from '$lib/data/careers';
import { works } from '$lib/data/works';
import type { PageLoad } from './$types';

// コンテンツはすべてリポジトリ内の静的データなので、ビルド時に HTML として書き出す
export const prerender = true;

/** Fail the build if two entries in a collection share a slug. */
const assertUniqueSlugs = (name: string, items: { slug: string }[]): void => {
	const seen = new Set<string>();
	for (const { slug } of items) {
		if (seen.has(slug)) throw new Error(`Duplicate slug "${slug}" in ${name}`);
		seen.add(slug);
	}
};

export const load: PageLoad = () => {
	assertUniqueSlugs('achievements', achievements);
	assertUniqueSlugs('careers', careers);
	assertUniqueSlugs('works', works);

	return {
		// YYYY-MM-DD 形式なので文字列比較で日付の新しい順に並ぶ(同日は配列順を維持)
		achievements: [...achievements].sort((a, b) => b.date.localeCompare(a.date)),
		careers,
		works
	};
};
