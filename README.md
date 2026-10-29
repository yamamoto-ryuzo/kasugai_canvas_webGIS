# kasugai_canvas_webGIS

KASUGAI Canvas **CDN ホスト版**（[kasugai-canvas-web](https://yamamoto-ryuzo.github.io/kasugai-canvas-web/)）向けの
**テストデータ（`.kasc` + `DATA/`）配信リポジトリ**です。

`kasugai_canvas` リポジトリはエンジン（`web/`）とデータが一体のため、
「エンジン = CDN、データ = 外部ホスト」という実運用構成の動作確認がしにくい課題がありました。
本リポジトリは **データだけ**を GitHub Pages で配信し、CDN エンジンからの `?kasc=` 参照を検証します。

## 構成

```text
kasugai_canvas_webGIS/
├─ index.html       # プロジェクト一覧 + エンジン別起動リンク
├─ projects.json    # プロジェクトマニフェスト
└─ <id>/            # プロジェクト（.kasc + DATA/ + 付随ファイル）
   ├─ kasugai_canvas.kasc
   └─ DATA/
```

## 使い方

```
https://yamamoto-ryuzo.github.io/kasugai-canvas-web/<stage>/<engine>/?kasc=<このサイトの .kasc URL>
```

例（default プロジェクトを Cesium で開く）:

```
https://yamamoto-ryuzo.github.io/kasugai-canvas-web/stable/cesium/?kasc=https%3A%2F%2Fyamamoto-ryuzo.github.io%2Fkasugai_canvas_webGIS%2Fdefault%2Fkasugai_canvas.kasc
```

## テストデータの追加

1. QGIS プラグイン `geo_webview` の `Export` で `.kasc + DATA/` を出力
2. このリポジトリに `<プロジェクトID>/` フォルダとして配置
3. `projects.json` に `{"id": "...", "title": "..."}` を追記して push

## 関連

- [kasugai-canvas-web](https://github.com/yamamoto-ryuzo/kasugai-canvas-web) — エンジンの CDN 配信元（本サイトから参照される側）
- [kasugai_canvas](https://github.com/yamamoto-ryuzo/kasugai_canvas) — エンジン正本（`web/`）とアプリ本体
- [qgis_live_harness](https://github.com/yamamoto-ryuzo/qgis_live_harness) — geo_webview（.kasc 出力元）
