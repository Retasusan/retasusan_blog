# コンテンツの編集ガイド

管理用フォルダーは [`content/`](../content/README.md)。本文も設定も Markdown ファイルで管理する。
`src/content/generated.ts` は自動生成される表示用データなので、編集しない。

## 編集する場所

| 内容 | ファイル |
| --- | --- |
| 自己紹介・見出し・アカウント | `content/profile.md` |
| セクションの順序・表示 | `content/site.md` |
| 制作物 | `content/projects/*.md` |
| 職歴・イベント・受賞・登壇・学習 | `content/activities/*.md` |
| 技術のグループ | `content/skills/*.md` |

VS Code の推奨拡張 **Front Matter CMS** を入れると、一覧・フォームからも編集できる。
設定は `frontmatter.json`。拡張の利用は任意で、普通の Markdown エディターでもすべて編集できる。

## 新しい項目を作る

VS Code の「ターミナル → タスクの実行」に、種類ごとの「管理: …を追加」を用意している。
コマンドでも作成できる。

```bash
npm run content:new -- project my-project "新しい制作物"
npm run content:new -- activity study-2026 "勉強会で発表" 2026-10
npm run content:new -- skill databases "Databases"
```

`content/_templates/` の該当テンプレートから、下書きの Markdown が作られる。
同じファイル名がある場合は上書きせずエラーになる。

### 公開と下書き

- `draft: true`: 公開データに含まれない。開発中の表示でも同様。
- `draft: false`: ページに表示する。
- `draft` の省略: 公開として扱う。新規作成時は明示的に `true` にしている。
- 下書きのメタデータも検証する。書きかけの設定でエラーが出た場合は「内容を検証」から確認する。

### ID とファイル名

`id` があればそれを使い、省略した場合は拡張子を除いたファイル名を使う。
英数字・日本語の文字・ハイフン・アンダースコアが使える。空白を含める場合は、設定欄で `id` を指定する。
タイトルを変えても ID は保てる。既存のファイルの ID を変更すると、その項目へのアンカーも変わる。
同じ種類の中で ID が重複すると検証エラーになる。

## 制作物

```yaml
type: project
title: "制作物の名前"
summary: "何を作ったかを一文で。"
category: "チーム制作"
technologies:
  - TypeScript
  - Next.js
links:
  - label: Source code
    href: https://github.com/your-name/your-project
order: 10
featured: false
draft: true
```

- `title` と `summary` は必須。本文に背景・担当したこと・工夫を書く。
- `order` の小さいものが先に表示される。未指定は `1000` として扱い、同じ値ではファイル名順になる。
- `featured: true` で見出しを大きく見せる。未指定は `false`。
- 画像なしの場合は文章中心の作品紹介になる。
- スクリーンショットは `public/projects/` に置いて、次の設定を追加する。

```yaml
image:
  src: /projects/my-project.webp
  alt: "何が写っているかの説明"
```

画像ファイルの存在も検証する。リンクは `https://`、`http://`、`mailto:`、または `/` から始まるサイト内パスを使用できる。

## 活動・職歴

```yaml
type: activity
title: "何をしたか"
date: "2026-10"
endDate: "present"
kind: work
links: []
draft: true
```

- `title` と `date` は必須。
- 日付は `YYYY` / `YYYY-MM` / `YYYY-MM-DD`。元の記録の精度を維持し、年・月しかわからなければ日付は補わない。
- `endDate` は任意。継続中は `present`、終了したら実際の時期に変える。
- `kind` は `conference`（カンファレンス）、`internship`（インターン）、`hackathon`（ハッカソン）、`contest`（コンテスト）、`event`（イベント）、`work`（職歴）、`project`（制作）、`learning`（学び）。省略時は `event`。
- 通常は日付の新しい順。`order` を設定した項目は、その数値を優先する。未指定は `1000`、同じ値なら日付の新しい順。
- 具体的な担当内容や成果は本文、出典は `links` に書く。
- 存在しない日付、終了日の逆転、壊れた URL は検証でエラーになる。

## プロフィール・スキル・表示設定

- `profile.md`: `headline` はトップの見出しを1〜3行で指定するリスト。`description` は短い紹介文と検索向けの説明、本文は自己紹介セクションに表示する。`socials` で外部リンクを管理する。
- `skills/*.md`: `title` と `technologies` を指定する。本文には使いどころなどの補足を書ける。表示順は制作物と同じ `order` を使う。
- `site.md`: `sections` の配列を並べ替えたり `enabled: false` にする。本文・ナビゲーション・番号が同じ設定に従う。導入の見出しは固定枠。

## Markdown 本文

段落、太字、リンク、リスト、引用、コードブロック、GFM の表・チェックリストを表示できる。
本文の見出しは作品名や活動名の下位の見出しとして表示する。
画像は `/projects/ファイル名` で参照できる。表やコードブロックは、画面幅を超えた部分を横にスクロールできる。
HTML や MDX のコードは実行しない。

## 検証と反映

```bash
npm run content:check
npm test
npm run typecheck
npm run lint
npm run build
```

開発は `npm run dev`。Markdown の保存・追加・削除を監視して表示用モジュールを更新するので、開発サーバーの再起動は不要。
入力ミスがある保存では直前の有効な表示データを保ち、ターミナルにファイル名と項目を出す。修正して保存すると再反映される。
本番ではビルド時に変換する。不正な設定がある場合はビルドを止める。

## 新しい種類のセクションを追加する

通常の制作物・活動の追加には不要。

1. `src/content/types.ts` の `portfolioSectionIds` に種類を追加する。
2. 必要に応じて Markdown のスキーマと読み込みを `src/lib/content/` に追加する。
3. `app/components/portfolio/sections/` に共通の `Section` 枠を使ったコンポーネントを作る。
4. `Portfolio.vue` のレジストリに登録し、`content/site.md` に設定を追加する。

構造や運用方針を変える場合は [ADR](adr/README.md) に理由を記録する。
