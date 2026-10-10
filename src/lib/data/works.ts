import type { Work } from './types';

/**
 * Products and projects shown in the Works section.
 */
// 配列の順番がそのまま表示順になる
export const works: Work[] = [
	{
		slug: 'baseball-mascot',
		name: '球団マスコットの情報。',
		description: 'プロ野球12球団マスコットの出演情報を取りまとめているサイト。',
		url: 'https://baseball-mascot.com'
	},
	{
		slug: 'tokyohistorymap',
		name: '東京歴史MAPMAP',
		description: '江戸・明治・昭和期の江戸東京の復元地図を閲覧できるビューア。',
		url: 'https://jhico.org/map/'
	},
	{
		slug: 'mapmap-tokyo',
		name: 'mapmap.tokyo',
		description: 'レイヤを重ねることに特化した地図ビューアの開発。',
		url: 'https://mapmap.tokyo'
	},
	{
		slug: 'bb212',
		name: '212みらい大志MAP',
		description: 'レジェンドマスコットが「みらい大志」の活動で道内各地を回った記録。',
		url: 'https://212map.baseball-mascot.com/'
	},
	{
		slug: 'qgis_otp_multi_isochrone_plugin',
		name: '到達圏連続表示QGISプラグイン',
		description: 'OpenTripPlannerの到達圏表示をGUIだけで完結するプラグイン。',
		url: 'https://plugins.qgis.org/plugins/qgis_otp_multi_isochrone_plugin/'
	}
];
