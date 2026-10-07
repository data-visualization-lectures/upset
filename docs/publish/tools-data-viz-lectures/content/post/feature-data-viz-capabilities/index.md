---
title: データ可視化ツールで出来ること
description: チャートだけに留まらない、データ地図・ネットワーク・テキスト可視化など幅広い表現をカバーします。
slug: "feature-data-viz-capabilities"
weight: 3
categories: "features"
image: "/images/features/feature-data-viz-capabilities.png"
---

「データの道具箱」のデータ可視化ツール群では、**一般的なチャートから専門的な可視化まで**、さまざまな表現を手軽に作成できます。

- [さまざまなチャートを作りたい](#さまざまなチャートを作りたい)
- [クロス集計表を可視化したい](#クロス集計表を可視化したい)
- [探索的なデータ可視化をしたい](#探索的なデータ可視化をしたい)
- [3D・3D地図の可視化をしたい](#3d3d地図の可視化をしたい)
- [データ地図をつくりたい](#データ地図をつくりたい)
- [ネットワークの可視化をしたい](#ネットワークの可視化をしたい)
- [テキストの可視化をしたい](#テキストの可視化をしたい)
- [コードベースで可視化したい](#コードベースで可視化したい)
- [動く可視化をつくりたい](#動く可視化をつくりたい)


## さまざまなチャートを作りたい

棒グラフや折れ線グラフといった定番チャートから、**サンキー・ダイアグラム、モザイク・プロット、リニア・デンドログラム**など、Excelでは作成しづらい多様なチャートをノーコードで作成できます。

{{< external-link-card
    url="https://rawgraphs.dataviz.jp/"
    title="RAWGraphs2"
    image="/images/cover_rawgraphs-db.jpg"
    site="dataviz.jp"
    description="多様なチャートを手軽に作成"
>}}
{{< /external-link-card >}}
{{< external-link-card
    url="https://data-illustrator.dataviz.jp/"
    title="Data Illustrator"
    image="/images/cover_data-illustrator.jpg"
    site="dataviz.jp"
    description="多様なチャートを手軽に作成"
>}}
{{< /external-link-card >}}


## クロス集計表を可視化したい

行×列のクロス集計表を、**リスト形式に直さず**ヒートマップやモザイク、コード・ダイアグラムなどで読めます。

{{< external-link-card
    url="https://matrix-table-chart.dataviz.jp/"
    title="Matrix Table Chart"
    image="/images/cover_matrix-table-chart.png"
    site="dataviz.jp"
    description="クロス集計表をリストに変換せず可視化"
>}}
{{< /external-link-card >}}


## 探索的なデータ可視化をしたい

データに含まれる変数の関係性を**探索的に把握**したいときに便利なツールです。EDA(Exploratory Data Analysis)を支援します。

{{< external-link-card
    url="https://voyager2.dataviz.jp/"
    title="Voyager2"
    image="/images/cover_voyager2.jpg"
    site="dataviz.jp"
    description="データ探索（Exploratory Data Analysis, EDA）を支援するビジュアライゼーションツール"
>}}
{{< /external-link-card >}}
{{< external-link-card
    url="https://parallel-coordinates.dataviz.jp/"
    title="Parallel Coordinates"
    image="/images/cover_parallel-coordinates.png"
    site="dataviz.jp"
    description=""
>}}
{{< /external-link-card >}}
{{< external-link-card
    url="https://parallel-sets.dataviz.jp/"
    title="Parallel Sets"
    image="/images/cover_parallel-sets.png"
    site="dataviz.jp"
    description="カテゴリの組み合わせと件数を帯で可視化"
>}}
{{< /external-link-card >}}
{{< external-link-card
    url="https://upset.dataviz.jp/"
    title="UpSet"
    image="/images/cover_upset.png"
    site="dataviz.jp"
    description="集合の交差をマトリックスとバーで探索"
>}}
{{< /external-link-card >}}


## 3D・3D地図の可視化をしたい

立体的な表現で**多次元データを一度に見せたい**ときに便利です。

{{< external-link-card
    url="https://3d-surface-chart.dataviz.jp/"
    title="3Dサーフェイス・チャート"
    image="/images/cover_3d-surface-chart.png"
    site="dataviz.jp"
    description="「行 × 列 × 値」の3次元データを、色付きの曲面として地形図のように立体表示"
>}}
{{< /external-link-card >}}
{{< external-link-card
    url="https://kepler-gl.dataviz.jp/"
    title="kepler.gl"
    image="/images/cover_kepler-gl.jpg"
    site="dataviz.jp"
    description="大規模地理空間データの可視化・探索ツール"
>}}
{{< /external-link-card >}}


## データ地図をつくりたい

都道府県や市区町村などの行政単位、そしてタイル地図まで、**日本のデータ地図に特化**したツールを取り揃えています。

{{< external-link-card
    url="https://choropleth.dataviz.jp/"
    title="コロプレスマップ"
    image="/images/cover_choropleth.png"
    site="dataviz.jp"
    description="日本地図・都道府県地図を一つのツールで作成"
>}}
{{< /external-link-card >}}
{{< external-link-card
    url="https://cartogram.dataviz.jp/"
    title="カルトグラム"
    image="/images/cover_cartogram.png"
    site="dataviz.jp"
    description="日本地図・都道府県地図を一つのツールで作成"
>}}
{{< /external-link-card >}}
{{< external-link-card
    url="https://www.dataviz.jp/shape-cartogram/"
    image="/images/cover_shape-cartogram.png"
    title="図形カルトグラム"
    site="dataviz.jp"
    description="47都道府県の値を円・正方形の面積で比較"
>}}
{{< /external-link-card >}}

{{< external-link-card
    url="https://tilegrams.dataviz.jp/"
    title="Tilegrams"
    image="/images/cover_tilegrams.png"
    site="dataviz.jp"
    description="タイル地図を作成できるツール"
>}}
{{< /external-link-card >}}


## ネットワークの可視化をしたい

**ノード（点）とエッジ（線）**で表現されるネットワーク図、フローを表現するサンキー・ダイアグラムなどに対応しています。

{{< external-link-card
    url="https://sankeymatic.dataviz.jp/"
    title="Sankeymatic"
    image="/images/cover_sankeymatic.png"
    site="dataviz.jp"
    description="サンキー・ダイアグラムを手軽に"
>}}
{{< /external-link-card >}}
{{< external-link-card
    url="https://gephi-lite.dataviz.jp/"
    title="Gephi Lite"
    image="/images/cover_gephi-lite.jpg"
    site="dataviz.jp"
    description="ネットワークグラフを手軽に作成"
>}}
{{< /external-link-card >}}


## テキストの可視化をしたい

テキストデータの**頻出語や傾向**を、視覚的に表現します。

{{< external-link-card
    url="https://word-cloud.dataviz.jp/"
    title="Word Cloud"
    image="/images/cover_wordcloud.png"
    site="dataviz.jp"
    description="日本語に特化したWord Cloud"
>}}
{{< /external-link-card >}}


## コードベースで可視化したい

JSONで可視化仕様を記述したり、URLだけでチャート画像を生成したりと、**プログラマブルに可視化**を扱える柔軟なツールも揃っています。

{{< external-link-card
    url="https://vega-editor.dataviz.jp/"
    title="Vega Editor"
    image="/images/cover_vega-editor.jpg"
    site="dataviz.jp"
    description="JSON 形式で可視化仕様を書くことで、インタラクティブなグラフやチャートをリアルタイムにレンダリング"
>}}
{{< /external-link-card >}}
{{< external-link-card
    url="https://quickchart.dataviz.jp/"
    title="QuickChart UI"
    image="/images/cover-quickchart.png"
    site="dataviz.jp"
    description="URLだけでチャート画像生成"
>}}
{{< /external-link-card >}}


## 動く可視化をつくりたい

時系列の順位や値の変化を**レースチャートとしてアニメーション**したり、飛行機や船の軌跡データを**動画として可視化**したりできます。

{{< external-link-card
    url="https://race-chart-builder.dataviz.jp/"
    title="Race Chart Builder"
    image="/images/cover_race-chart-builder.png"
    site="dataviz.jp"
    description="順位の入れ替わりをアニメーションで見せるレースチャート"
>}}
{{< /external-link-card >}}

{{< external-link-card
    url="https://bbts.dataviz.jp/"
    title="ADS-B / AIS 可視化"
    image="/images/cover_broadcast-tracking-system.jpg"
    site="dataviz.jp"
    description="飛行機や船の移動データを手軽に動画化"
>}}
{{< /external-link-card >}}


## 関連ページ

- <a href="/how-to-use-data-viz/">データ可視化ツールの使い分け</a>
- <a href="/tools/">ツール一覧</a>
