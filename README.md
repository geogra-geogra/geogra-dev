# 山本将大のページ (geogra.dev)

SvelteKit で作った自己紹介ページです。ビルド時に静的 HTML として書き出し、Cloudflare にデプロイしています。

## 内容の更新方法

ページに載せる内容はすべて `src/content/` の YAML ファイルにあります。コードを触らずに、このファイルを書き換えるだけで更新できます（GitHub の Web 画面から直接編集しても OK）。

| ファイル            | 内容                                   | 並び順                                       |
| ------------------- | -------------------------------------- | -------------------------------------------- |
| `profile.yaml`      | 名前・自己紹介・リンク・ページタイトル | -                                            |
| `works.yaml`        | 作ったもの                             | 書いた順                                     |
| `careers.yaml`      | 経歴                                   | 書いた順（新しいものを上に）                 |
| `achievements.yaml` | 発表・掲載                             | 日付の新しい順に自動で並び、年ごとにまとまる |

### 業績を 1 件追加する例

`src/content/achievements.yaml` のどこかに追記します。

```yaml
- date: 2026-03-01 # 必須 YYYY-MM-DD
  type: talk # 必須 conference（学会発表） / talk（講演・LT） / misc（寄稿・掲載）
  title: 発表タイトル # 必須
  venue: イベント名 # 必須
  note: 著者や連載名など # 省略可
  url: https://example.com # 省略可
  awards: [賞の名前] # 省略可
```

書き方を間違えると、ビルドが「どのファイルの何件目の何が悪いか」を表示して止まるので、壊れたページが公開されることはありません。

## 開発

```bash
pnpm install
pnpm dev      # http://localhost:5173
pnpm check    # 型チェック
pnpm build    # 本番ビルド（YAML の検証もここで走る）
```
