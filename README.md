# ブックマークレット開発環境の試作(Docker+VSCode)

## 概要

ビルドでソースコードを`javascript:(function(){<ソースコード>})()`の形式に変換できる環境。

変換前

```Javascript
const message = 'Hello World';
console.log(message);
```

変換後

```text
javascript:(function()%7Bconsole.log(%22Hello%20World%22)%3B%7D)()
```

## 前提条件[^1]

[^1]: Mac, Linux は Node.js をインストールしてプロジェクトフォルダで`npm install`すれば Docker なしで動くかも？

- Docker Desktop(docker daemon)が起動している
- VSCode の拡張機能「Remote - Containers」をインストールしている

## ビルドの内容

1. ソースコードの最適化([google-closure-compiler](https://github.com/google/closure-compiler/))
   - `--compilation_level ADVANCED`オプションで圧縮率を上げる
   - `--language_out ECMASCRIPT5`オプションで ES6 未対応のブラウザに対応
1. `(function(){<ソースコード>})()`の形式に変換
1. パーセントエンコーディング
   - 半角スペースは「+」に変換した方が良いが「%20」で妥協
1. 先頭に`javascript:`を付加

ビルド時に実行する Linux コマンド

```text
npx google-closure-compiler --compilation_level ADVANCED --language_out ECMASCRIPT5 --js "/app/src/bookmarklet.js" | echo -n "(function(){"`cat`}")()" | node -p "encodeURIComponent(require('fs').readFileSync(0))" | echo -n "javascript:"`cat` > "/app/src/bookmarklet.txt
```

## 開発環境の使用方法

1. [ここ](https://github.com/NeetworkEngineerSato/bookmarklet-development-environment/archive/refs/heads/main.zip)からファイルをダウンロードして解凍する
1. 解凍してできたフォルダを VSCode で開く
1. 「Remote - Containers」で開き直す
   - VSCode で開いた時に右下に「Remote - Containers」によるメッセージが表示されるので「Reopen in Container」をクリックする
   - 表示されなければ「F1」を押し、「Remote-Containers: Reopen in Container」を入力して実行する

## ブックマークレットの作成方法

1. 「bookmarklet.js」にソースコードを入力して保存する
1. 「bookmarklet.js」を開いている状態で、メニューバーの「ターミナル」->「ビルド タスクの実行(Ctrl+Shift+B)」をクリックする
1. 「bookmarklet.txt」が生成される
