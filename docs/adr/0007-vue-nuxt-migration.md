# 0007: 表示とサーバーを Vue 3・Nuxt に移行する

- 状態: Accepted
- 日付: 2026-10-30
- 置き換える判断: [0003](0003-application-boundary.md) のフレームワーク選択

## 背景

Vue.js でサイトを作り直す。Markdown の管理フォルダー、モジュール単位の構成、実績の出典、既存の記事 URL は移行先でも使いたい。記事にはサーバー側だけで扱う microCMS の認証情報がある。

## 決定

- Vue 3 の Single File Components と Nuxt 4 を使用する。ルーティング・サーバー描画・ページごとのメタデータ・API を同じプロジェクトで管理する。
- Vue の画面は `app/`、サーバー API は `server/`、編集元は引き続き `content/` に置く。
- `app/components/portfolio/sections/` をセクション単位とし、`Portfolio.vue` の型付きレジストリと `content/site.md` で組み立てる。
- Markdown の検証・生成・監視はフレームワークから独立した既存の仕組みを使う。生成したデータを Vue の composable から参照し、Vite のモジュール更新で保存を反映する。
- Markdown 本文は unified・remark・rehype の処理で HTML に変換し、サニタイズ後に Vue で描画する。GFM の表・チェックリスト・コードと、項目の下位になる見出しを維持する。
- 既存の `/about`、記事・お知らせの一覧と詳細 URL を Vue ページとして用意する。記事の検索・タグ絞り込みも Vue の状態として扱う。
- microCMS の接続は Nitro の `server/api/` に置き、認証情報をブラウザへ渡さない。従来の `SERVICE_DOMAIN`・`API_KEY` と Nuxt の実行時設定に対応する。
- Nuxt の API エラーは適切な HTTP ステータスにし、記事がない場合は 404、取得に失敗した場合は 502 を返す。
- React・Next.js・専用の設定と依存を外す。元の画像は `public/` に移し、実績に書かれた Next.js などの技術名は制作当時の事実として保つ。

## 検討した選択肢

- Vue と Vite の SPA: 構成は小さいが、サーバー描画と microCMS の認証を扱うサーバーを別途用意する必要がある。
- Nuxt: Vue のコンポーネントに揃えながら、検索向けの HTML と既存のサーバー機能をまとめて管理できる。
- 画面だけ Vue に埋め込む: 二つのフレームワークの境界が残り、今後の修正箇所が分散する。

## 影響とトレードオフ

- 管理フォルダーの使い方を変えず、表示だけを `.vue` で編集できる。
- 本番の出力は `.output/`。通常の Node サーバーは `npm start` で起動する。
- `npm run typecheck` で Vue の型と Markdown 管理スクリプトの型を確認する。
- 公開先は Nuxt / Nitro をビルドできる構成を使う。今回の作業は外部サイトのデプロイを含まない。
- 本文の直接描画は検証した HTML に限定する。外部 CMS の本文も HTML としてサニタイズする。

## 関連

- [0005: Markdown 管理](0005-markdown-content-management.md)
- [Nuxt の TypeScript](https://nuxt.com/docs/4.x/guide/concepts/typescript)
- [Nuxt の runtime config](https://nuxt.com/docs/4.x/guide/going-further/runtime-config)
