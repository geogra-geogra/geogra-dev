import { categories } from './categories';
import type { Achievement } from './types';

/**
 * Research outputs and publications shown in the Achievements section.
 */
// 新しい業績はどこに追加してもよい(表示時に日付の新しい順へ並べ替える)
export const achievements: Achievement[] = [
	{
		slug: 'gis-next-94',
		title: 'デジタル歴史地図のあゆみ',
		conference: 'GIS NEXT 94号',
		author: '日本地図学会 地図のチカラ',
		date: '2026-01-27',
		url: 'http://www.nextpb.com/gisnext/backnumber/no94.html',
		categories: [categories.misc]
	},
	{
		slug: 'odd-2025',
		title: '連続的な到達圏を表示するQGISプラグインを作ってみた',
		conference: '公共交通オープンデータ最前線2025',
		author: '',
		date: '2025-03-01',
		url: 'https://www.busdata.or.jp/odd2025_shiryo/',
		categories: [categories.talk]
	},
	{
		slug: 'servay-202501',
		title: 'レイヤを重ねることに特化した地図ビューアの開発',
		conference: '月刊「測量」2025年1月号',
		author: 'G空間EXPO2023 Geoアクティビティコンテスト 受賞作品紹介',
		date: '2025-01-20',
		url: 'https://www.jsurvey.jp/1-4-2025.htm',
		categories: [categories.misc]
	},
	{
		slug: 'mierune-bbq-13',
		title: '趣味をそのまま仕事にしてしまった方に研究活動をおすすめする話',
		conference: 'MIERUNE BBQ #13',
		author: '',
		date: '2024-11-20',
		url: 'https://mierune.connpass.com/event/335812/',
		categories: [categories.talk]
	},
	{
		slug: 'gisa-2024',
		title: 'GTFSデータを使用した到達圏を解析・表示するQGISプラグインの開発',
		conference: '第33回地理情報システム学会学術研究発表大会',
		author: '山本将大',
		date: '2024-10-27',
		url: 'https://pub.confit.atlas.jp/ja/event/gisa2024/presentation/E5-02',
		categories: [categories.conference]
	},
	{
		slug: 'jcacj-2024',
		title: '今昔マップの補完方法の検討',
		conference: '2024年度 日本地図学会 定期大会',
		author:
			'栗山絵理， 山本将大，岡本耕平， 小口 高，大西宏治，斎藤 敦， 鶴岡謙一，山内啓之，若林芳樹',
		date: '2024-08-24',
		url: 'https://doi.org/10.11212/jjca.62.supplement_7',
		categories: [categories.conference]
	},
	{
		slug: 'chizu-chushin-202405',
		title: '江戸・明治・現代の地図を重ねて見られる「東京歴史MAPMAP」',
		conference: '地図中心2024年5月号',
		author: '《地図づくり最前線 019》',
		date: '2024-05-10',
		url: 'https://net.jmc.or.jp/shopdetail/000000531709/',
		categories: [categories.misc]
	},
	{
		slug: 'geo-activity-2023',
		title: 'レイヤを重ねることに特化した地図ビューアの開発',
		conference: 'Geoアクティビティコンテスト',
		author: '山本将大',
		date: '2023-11-08',
		url: 'https://internet.watch.impress.co.jp/docs/column/chizu3/1550453.html',
		award: '地理教育賞,東京都立大学 学生特別表彰',
		categories: [categories.conference]
	},
	{
		slug: 'jcacj-2023',
		title: '重ねることに特化した地図ビューアーの作成',
		conference: '2023年度 日本地図学会 定期大会',
		author: '山本将大',
		date: '2023-08-26',
		url: 'https://www.jstage.jst.go.jp/article/jjca/61/3/61_12/_article/-char/ja',
		categories: [categories.conference]
	},
	{
		slug: 'suribachi-night-15',
		title: '山本の野望',
		conference: 'スリバチナイト15(東京カルチャーカルチャー)',
		author: '',
		date: '2023-01-16',
		url: 'https://tokyocultureculture.com/event/general/33900',
		categories: [categories.talk]
	},
	{
		slug: 'nihonbashi-morning-lt',
		title: '街の歴史がつながる！身近で使えるデジタル地図の世界',
		conference: '日本橋朝会',
		author: '',
		date: '2022-02-17',
		categories: [categories.talk]
	}
];
