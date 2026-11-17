import { loadPage } from '$lib/server/content';
import type { PageServerLoad } from './$types';

// コンテンツはリポジトリ内の YAML なので、ビルド時に HTML として書き出す
export const prerender = true;
// 動きのないページなので JS を配信せず HTML と CSS だけにする
export const csr = false;

export const load: PageServerLoad = () => loadPage('en');
