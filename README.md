# Retasusan Portfolio

Vue 3・Nuxt 4 で制作した、制作物・仕事・活動をまとめる個人サイト。
左にプロフィールと目次、右に本文を置き、狭い画面では縦に並べる。
掲載内容は Markdown で管理し、VS Code から追加・編集できる。

## まず開くところ

[コンテンツ管理](content/README.md)から、制作物・活動・プロフィールの編集先を選べる。
推奨拡張 **Front Matter CMS** で一覧・入力フォーム、**Vue - Official** で Vue コンポーネントの編集支援を利用できる。

## ローカル開発

```bash
npm ci
npm run dev
```

`http://localhost:3000` を開く。Markdown の保存・追加・削除は自動反映される。
確認が終わったら `Ctrl+C` で停止する。ポートフォリオに環境変数は不要。
移行前の開発サーバーが起動中なら、一度停止して新しいコマンドで起動する。

## よく使う操作

VS Code の「ターミナル → タスクの実行」にも同じ操作を用意している。

```bash
npm run content:new -- project my-project "新しい制作物"
npm run content:new -- activity my-event "参加したイベント" 2026-10
npm run content:check
```

新規ファイルは下書き。公開するときに `draft: false` に変える。
詳しくは [編集ガイド](docs/content-guide.md) を参照。

## 構成

```text
app/                              # Vue の表示
  app.vue                         # サイトの共通枠
  components/portfolio/           # セクションと制作物
  components/ui/                  # プロフィール・ナビ・フッター
  composables/usePortfolio.ts     # 検証済みの掲載データ
  pages/                          # ポートフォリオ・記事・お知らせ
  assets/                         # スタイル
server/                           # Nitro のサーバー処理
  api/articles/                   # microCMS の記事 API
  api/notifications/              # microCMS のお知らせ API
  utils/microcms.ts               # サーバー側だけで認証情報を扱う
content/                          # ふだん編集する管理フォルダー
  profile.md                      # 自己紹介・見出し・アカウント
  site.md                         # セクションの順序・表示
  projects/*.md                   # 制作物を1件ずつ
  activities/*.md                 # 職歴・参加・受賞・登壇を1件ずつ
  skills/*.md                     # 技術のグループ
  _templates/                     # 新規作成のひな形
src/lib/content/                  # YAML の解析とデータ検証
src/lib/markdown.ts               # Markdown / HTML の変換とサニタイズ
src/content/generated.ts          # 自動生成。手動編集・Git 管理はしない
scripts/                         # 変換・新規作成・開発時の監視
frontmatter.json                  # VS Code 管理パネルの設定
docs/adr/                         # 設計判断の履歴
```

## チェックと本番起動

```bash
npm run content:check
npm test
npm run typecheck
npm run lint
npm run build
npm start
```

`npm run build` は Markdown の変換・検証から実行し、Nuxt の本番出力を `.output/` に作る。
ポートフォリオは生成済みデータをサーバー側で表示する。ブラウザで本文を読み込むまで待つ必要はない。

## 記事アーカイブ

既存の `/articles`、`/articles/:articleId`、`/notifications`、`/notifications/:notificationId` を維持している。
開発で記事を表示する場合は、従来の `.env.local` に接続設定を追加する。

```dotenv
SERVICE_DOMAIN=your-service-domain
API_KEY=your-api-key
```

開発スクリプトは `.env.local` があれば読み込む。未作成なら Nuxt 標準の `.env` を使用する。
環境変数を変えたら開発サーバーを再起動する。
本番では上記をサーバー環境に設定するか、Nuxt 標準の次の変数を使う。

```dotenv
NUXT_MICROCMS_SERVICE_DOMAIN=your-service-domain
NUXT_MICROCMS_API_KEY=your-api-key
```

認証情報は Nitro のサーバー側だけで使用する。未設定では一覧は空状態、記事詳細は404になる。
検索・タグ絞り込みは取得した直近100件が対象。取得エラーは502として扱う。

## Cloudflare Workers

Cloudflare Workers へは Wrangler でデプロイできる。`portfolio.retasusan.com` を Custom Domain として設定してある。初回は Cloudflare にログインしてから実行する。

```sh
npx wrangler login
npm run deploy
npx wrangler secret put API_KEY
```

Cloudflare では `API_KEY` を Secret として登録し、`SERVICE_DOMAIN` は Worker の環境変数（Variables）として設定する。ローカルの `wrangler dev` では `.dev.vars.example` を `.dev.vars` にコピーして値を設定する。.dev.vars は Git 管理対象外。
`npm run preview` は Cloudflare Workers 用にビルドして Wrangler のローカル実行環境で確認する。

## 出典と設計

- [出典メモ](docs/content-sources.md): 公開 Scrapbox とリポジトリから取り込んだ実績。
- [ADR](docs/adr/README.md): Markdown 管理、Vue 移行、参考サイトに基づくデザインの判断。
- [Front Matter 公式ガイド](https://frontmatter.codes/docs/getting-started/): 任意の VS Code 拡張の使い方。

## License

MIT
