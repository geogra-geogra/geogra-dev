import type { Career } from './types';

/**
 * Career timeline entries shown in the Careers section.
 */
// 配列の順番がそのまま表示順になる
export const careers: Career[] = [
	{
		slug: 'company-1',
		title: '札幌のGeoSpatialな会社',
		term: '2024.04.16〜'
	},
	{
		slug: 'master',
		title: '東京都立大学 都市環境科学研究科 地理環境学域',
		term: '2024.04.01〜'
	},
	{
		slug: 'bachelor',
		title: '東京都立大学 都市環境学部 地理環境学科',
		term: '2020.04.01〜2024.03.31'
	}
];
