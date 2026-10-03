# DatavizJP 公開キット

このリポジトリはツール本体だけです。`dataviz-app` と `tools-data-viz-lectures` はワークスペースに無いので、案内サイトと catalog の正本はここでは編集しません。推測で第二の正本を作らないでください。

掲載スキル（`Prj_DatavizJP/.agents/skills/dataviz-tool-publish/SKILL.md`）どおり、**ツール本体のマージだけでは一覧に出ません**。以下を **両方のリポジトリ** に適用してから完了にしてください。

- `data-visualization-lectures/tools-data-viz-lectures`
- ローカル `Prj_DatavizJP/dataviz-app`

## ツール本体（このリポジトリ）

- 本番 URL: `https://upset.dataviz.jp/`
- GitHub Pages の CNAME: `upset.dataviz.jp`
- `appName`: `upset`（`setProjectConfig({ appName: "upset" })` と同じ）
- 保存データは集合定義のポインタと集約／並べ替え／使用集合名。全要素のダンプは保存しない
- サンプルは **UpSet の JSON 記述子**（`sets` / `meta`）。CSV 単体は読めない

DNS で `upset.dataviz.jp` をこの GitHub Pages に向けたあと、ツール本体が 200 を返すことを確認してください。

ローカル確認は `http://127.0.0.1:8000/?auth_debug` を付けます。付けないと認証ヘッダーが www.dataviz.jp へ誘導することがあります。

## 適用手順

1. カバー画像 `cover_upset.png` を用意し、両方のリポジトリへコピーする
   - `content/post/upset/images/cover_upset.png`
   - `static/images/cover_upset.png`
2. `content/post/upset/` にこのキットの `index.md` と `index.en.md` を置く（**両方のリポジトリ**）
3. `dataviz-app` の `APP_REGISTRY` に `app-registry-entry.ts` を追記する。既存の `upset` があれば重複追加しない
4. `dataviz-app` の `catalog.json` に `catalog-entries.json` をマージする。CSV/JSON は `public/data/` へコピーし、`fileUrl` を `https://app.dataviz.jp/data/...` に合わせてよい。相対パスの `file` はツールオリジン（`https://upset.dataviz.jp/`）でも動く
5. `dataviz-app` の `tool-capabilities.json` に `tool-capabilities-entry.json` をマージする
6. 両方のリポジトリで `content/page/how-to-use-data-viz/` の日英と、`content/post/feature-data-viz-capabilities/` の「動く可視化」にカードを足す（`snippets/` を参照）
7. 両方のリポジトリで `content/page/changelog/` の日英先頭に当日付で追記する。文型は「新規ツール「UpSet」を追加しました。」
8. デプロイ後、次を確認する
   - https://www.dataviz.jp/upset/ が 200
   - https://www.dataviz.jp/tools/ ・ https://app.dataviz.jp/tools ・ https://tools.data-viz-lectures.com/tools/ の3つにカードがある
   - 認証済みブラウザで保存・読込・サンプル。未ログインは `/?auth_debug`

changelog だけ、または `tools.data-viz-lectures.com` に出ているだけでは未完了です。
