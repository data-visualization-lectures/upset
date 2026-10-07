# DatavizJP 公開キット（UpSet）

このリポジトリはツール本体です。案内・レジストリ・catalog の正本は兄弟リポジトリにあります。推測で第二の catalog は作りません。

| 行き先 | 内容 | このエージェントの適用 |
| --- | --- | --- |
| `data-visualization-lectures/upset` | ツール本体・CNAME・共通ヘッダー | PR #4 |
| `data-visualization-lectures/tools-data-viz-lectures` | 一覧投稿（日英）・カバー・使い分け・機能紹介・changelog | ブランチ `cursor/list-upset-0d50` |
| `data-visualization-lectures/dataviz-jp` | 一覧投稿（日英）・カバー・使い分け・機能紹介（changelog は置かない） | アクセス不可。このキットの `dataviz-jp/` |
| `data-visualization-lectures/dataviz-api` | `APP_REGISTRY` に `upset` | ブランチ `cursor/register-upset-0d50` |
| `data-visualization-lectures/dataviz-app` | `catalog.json`（必要なら `tool-capabilities`） | アクセス不可。このキットの `dataviz-app/` |

スキル正本は `dataviz-core` の `.agents/skills/`（このトークンでは 404）。Notion の「可視化ツールを公開する」（2026-09-10）は `dataviz-app` に一覧があると書いてあるが、今回の依頼では一覧ホストは `dataviz-jp` と `tools-data-viz-lectures`、changelog は tools 側のみ。

## ツール本体

- 本番 URL: `https://upset.dataviz.jp/`
- GitHub Pages の CNAME ファイル: `upset.dataviz.jp`（この PR）
- `appName`: `upset`（`setProjectConfig({ appName: "upset" })` と同じ）
- 保存データは集合定義のポインタと集約／並べ替え／使用集合名。全要素のダンプは保存しない
- サンプルは UpSet の JSON 記述子（`sets` / `meta`）。CSV 単体は読めない

## 兄弟リポジトリは clone できたが push は 403

`cursor[bot]` には `tools-data-viz-lectures` と `dataviz-api` の書き込みがありません。変更はローカルでコミット済みで、このキットに差分を残しています。ユーザー側でブランチを push して PR を開いてください。**merge はしないでください。**

### tools-data-viz-lectures（changelog はこちらだけ）

`main` 時点の clone に対するテキスト差分: `docs/publish/tools-data-viz-lectures/listing-text.diff`

```bash
git clone https://github.com/data-visualization-lectures/tools-data-viz-lectures.git
cd tools-data-viz-lectures
git checkout -b cursor/list-upset-0d50
git apply /path/to/upset/docs/publish/tools-data-viz-lectures/listing-text.diff
mkdir -p content/post/upset/images static/images
cp /path/to/upset/docs/publish/cover_upset.png content/post/upset/images/cover_upset.png
cp /path/to/upset/docs/publish/cover_upset.png static/images/cover_upset.png
git add -A && git commit -m "Add UpSet to the visualization tool listings"
git push -u origin cursor/list-upset-0d50
```

適用後の全文コピーも `docs/publish/tools-data-viz-lectures/content/` と `static/images/cover_upset.png` にあります。

### dataviz-api

```bash
git clone https://github.com/data-visualization-lectures/dataviz-api.git
cd dataviz-api
git checkout -b cursor/register-upset-0d50
git apply /path/to/upset/docs/publish/dataviz-api/apply-register-upset.patch
npm test -- api/_lib/app-registry.test.ts
git add api/_lib/app-registry.ts api/_lib/app-registry.test.ts
git commit -m "Register upset in APP_REGISTRY"
git push -u origin cursor/register-upset-0d50
```

`upset` が既にあれば重複追加しない。パッチは `weighted-directed-flow-map` の直後に 1 件だけ足します。

## アクセスできなかったリポジトリへの適用

### dataviz-jp（www.dataviz.jp / app.dataviz.jp の一覧）

changelog は入れない。投稿とカードだけ。

1. `docs/publish/dataviz-jp/content/post/upset/` を `content/post/upset/` へコピー（`index.md` / `index.en.md` / `images/cover_upset.png`）
2. `docs/publish/cover_upset.png` を `static/images/cover_upset.png` へコピー
3. `content/page/how-to-use-data-viz/` の日英に `docs/publish/snippets/how-to-use-data-viz.md` と `.en.md` を追記（目次リンクも）
4. `content/post/feature-data-viz-capabilities/` の「探索的なデータ可視化」に `docs/publish/snippets/feature-data-viz-capabilities.md` を追記

### dataviz-app（catalog）

1. `catalog.json` の `entries` に `docs/publish/dataviz-app/catalog-entries.json` をマージする。既存 id（`upset-movies-genres` など）があれば重複追加しない
2. 必要なら `tool-capabilities` に `docs/publish/dataviz-app/tool-capabilities-entry.json` をマージする
3. サンプル JSON はツールオリジン（`https://upset.dataviz.jp/data/...`）を指す。CSV 単体は UpSet が読めないので `public/data/` へ生 CSV だけ置かない

`fileUrl` を `https://app.dataviz.jp/data/` に移すなら、記述子 JSON とその `file` が指す表データを同じディレクトリに置く。

## ユーザーがやること（権限が要る作業）

本番 DNS はこちらから変更していません。

1. このリポジトリの PR #4 をレビューして master へマージする（マージはエージェントではしない）
2. 上のパッチを `tools-data-viz-lectures` と `dataviz-api` に適用して PR を開く（このトークンは push 403）
3. `dataviz-jp` と `dataviz-app` にキットを適用して PR を開く（このトークンではリポジトリが見つからない）
4. GitHub Pages: Source は `master` / `/`。Custom domain を `upset.dataviz.jp` にする（リポジトリ設定。Pages API 上は現在 `cname: null`）
5. DNS: `upset.dataviz.jp` を GitHub Pages（`data-visualization-lectures.github.io`）へ向ける。既に向いている場合は触らない
6. デプロイ後の確認
   - https://upset.dataviz.jp/ が 200（共通ヘッダー付き）
   - https://www.dataviz.jp/upset/ が 200
   - https://www.dataviz.jp/tools/ ・ https://app.dataviz.jp/tools ・ https://tools.data-viz-lectures.com/tools/ にカード
   - 認証済みブラウザで保存・読込・サンプル
