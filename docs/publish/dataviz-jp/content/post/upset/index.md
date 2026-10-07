---
title: UpSet
description: 集合の交差と要素を、マトリックスとバーで探索するインタラクティブな可視化
slug: "upset"
weight: 1
categories: "data-visualization"
address: https://upset.dataviz.jp/
image: "images/cover_upset.png"
---

{{< external-link-card
    url="https://upset.dataviz.jp/"
    title="UpSet"
    image="images/cover_upset.png"
    site="dataviz.jp"
    description="集合の交差と要素をマトリックスとバーで探索"
>}}
{{< /external-link-card >}}

## どんなツールか？

UpSet は、複数の集合がどう重なるかを探索するためのインタラクティブな可視化です。ベン図では追いにくい、集合が多いデータの交差・要素数・偏差を、マトリックスとバーチャートで並べて見られます。交差の集約や並べ替え、要素側のクエリと連動可視化に対応しています。

## 機能

- 交差マトリックス: どの集合の組み合わせかを点と線で示し、要素数をバーで比較
- 集約: 次数・集合・偏差・重なり次数でグループ化。2段階の集約にも対応
- 並べ替え: 次数、要素数（Cardinality）、偏差
- 集合の選択: 使う集合の追加・解除、サイズ順／名前順
- 要素ビュー: 散布図、ヒストグラム、ワードクラウドなどで交差に属する要素を確認
- カスタムデータ: UpSet 形式の JSON 記述子（表データの所在と集合列を定義）を URL から読み込み
- プロジェクト保存: データセットの指定、使用集合、集約と並べ替えをクラウドに保存・復元

## 使い方

- ヘッダーのサンプル、またはデータセット一覧から読み込む
- 上段で使う集合を選び、左パネルで集約と並べ替えを切り替える
- 交差のバーをクリックすると、右パネルの要素クエリとテーブルが連動する
- 独自データは「データを読み込む」から JSON 記述子の URL を指定する
- 作業状態はヘッダーの「プロジェクトの保存」でクラウドに残せる

## データ形式

- ファイル形式: UpSet の JSON 記述子 + 参照先の表データ（CSV / TSV）
- JSON に `file`（表のパス）、`separator`、`header`、`sets`（集合列の範囲）、`meta`（ID や属性列）を書く
- 集合列は 0/1 のバイナリ（その行が集合に属するか）
- 生の CSV だけを渡すことはできない。記述子の作り方は [Data Import](https://github.com/VCG/upset/wiki/Data-Import) を参照
