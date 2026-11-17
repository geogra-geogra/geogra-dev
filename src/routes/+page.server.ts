import { error } from '@sveltejs/kit';
import { ACHIEVEMENT_TYPES, ContentError, loadContent } from '$lib/server/content';
import type { PageServerLoad } from './$types';

// コンテンツはリポジトリ内の YAML なので、ビルド時に HTML として書き出す
export const prerender = true;
// 動きのないページなので JS を配信せず HTML と CSS だけにする
export const csr = false;

export const load: PageServerLoad = () => {
	try {
		return { ...loadContent(), typeLabels: ACHIEVEMENT_TYPES };
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
