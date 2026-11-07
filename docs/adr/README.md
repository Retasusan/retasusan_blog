# Architecture Decision Records

ポートフォリオの構造や運用に影響する設計判断を記録する。

| ADR | 状態 | 決定 |
| --- | --- | --- |
| [0001](0001-typed-local-content.md) | Superseded by 0005 | 掲載内容を型付きのローカルデータとして管理する |
| [0002](0002-section-registry.md) | Accepted | セクションを独立させ、構成とナビゲーションを共有する |
| [0003](0003-application-boundary.md) | Superseded by 0007 | 既存の Next.js 内でポートフォリオと記事アーカイブを分離する |
| [0004](0004-sourced-activity-periods.md) | Superseded by 0005 | 出典付きの活動データに、任意の終了日を持たせる |
| [0005](0005-markdown-content-management.md) | Accepted | Markdown を編集元とし、検証済みモジュールへ変換する |
| [0006](0006-editorial-portfolio-design.md) | Superseded by 0008 | 文章と実画面を中心に制作物を見せる |
| [0007](0007-vue-nuxt-migration.md) | Accepted | 表示とサーバーを Vue 3・Nuxt に移行する |
| [0008](0008-reference-led-layout.md) | Accepted | 参考サイトをもとに二段組と一覧を設計する |

## 運用

- 新しい判断は [テンプレート](template.md) をコピーし、次の連番で追加する。
- 掲載項目の追加や文章の修正は [コンテンツ編集ガイド](../content-guide.md) に従う。通常の追加に ADR は不要。
- 既存の判断を変更するときは新しい ADR を作り、旧 ADR を `Superseded by 000N` にする。判断の履歴は残す。
- 状態は `Proposed` / `Accepted` / `Superseded` を使う。
