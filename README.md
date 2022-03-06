# ブックマークレット集

## ツイートの画像だけを引用する

### ブックマークレット

```text
javascript:(function()%7Bvar%20a%3Dwindow.location.href.match(RegExp(%22%5Ehttp%5Bs%5D%3F%3A%2F%2F(%3F%3A%5B%5E%2F%5D%2B%5C%5C.)%3Ftwitter%5C%5C.com%2F(%5B%5E%2F%5D%2B)%2F%5B%5E%2F%5D%2B%2F(%5C%5Cd%2B)%22))%3Bif(null!%3D%3Da)%7Bvar%20b%3DencodeURIComponent(a%5B0%5D%2B%22%2Fphoto%2F1%22)%3Bwindow.location.href%3D%22https%3A%2F%2Ftwitter.com%2Fintent%2Ftweet%3Ftext%3D%22%2Bb%7Delse%20alert(%22failed.%22)%3B%7D)()
```

### 使用方法

1. Web 版の Twitter にログインする
1. 引用する画像があるツイートを開く
1. ブックマークレットを実行する

### 備考

- 「引用する画像があるツイートの URL の末尾に`/photo/1`をつけた URL」を「ツイートの文末」につけると画像だけを引用できる
- 同じ方法で画像を引用しているツイートの画像は引用できない
- 現在は動画も引用できる

### ソースコード

```Javascript
// USER_ID等は、文字の種類と数が変更される可能性を考慮する。
const PROTOCOL = 'http[s]?';
const FQDN = '(?:[^/]+\\.)?twitter\\.com'; // m. | mobile. | www.
const USER_ID = '([^/]+)';
const STATUS_ID_LABEL = '[^/]+'; // status | statuses
const STATUS_ID = '(\\d+)'; // 2桁の存在を確認済み(jack/status/20)
const REG_EXP = new RegExp(
  `^${PROTOCOL}://${FQDN}/${USER_ID}/${STATUS_ID_LABEL}/${STATUS_ID}`
);

const url = window.location.href;
const regExpMatchArray = url.match(REG_EXP);

if (regExpMatchArray !== null) {
  const tweetUrlEndingWithStatusID = regExpMatchArray[0];
  const text = encodeURIComponent(`${tweetUrlEndingWithStatusID}/photo/1`);
  window.location.href = `https://twitter.com/intent/tweet?text=${text}`;
} else {
  alert('failed.');
}
```

## ツイートの動画だけを引用する

### ブックマークレット

```text
javascript:(function()%7Bvar%20a%3Dwindow.location.href.match(RegExp(%22%5Ehttp%5Bs%5D%3F%3A%2F%2F(%3F%3A%5B%5E%2F%5D%2B%5C%5C.)%3Ftwitter%5C%5C.com%2F(%5B%5E%2F%5D%2B)%2F%5B%5E%2F%5D%2B%2F(%5C%5Cd%2B)%22))%3Bif(null!%3D%3Da)%7Bvar%20b%3DencodeURIComponent(a%5B0%5D%2B%22%2Fvideo%2F1%22)%3Bwindow.location.href%3D%22https%3A%2F%2Ftwitter.com%2Fintent%2Ftweet%3Ftext%3D%22%2Bb%7Delse%20alert(%22failed.%22)%3B%7D)()
```

### 使用方法

1. Web 版の Twitter にログインする
1. 引用する動画があるツイートを開く
1. ブックマークレットを実行する

### 備考

- 「引用する動画があるツイートの URL の末尾に`/video/1`をつけた URL」を「ツイートの文末」につけると動画だけを引用できる
- 同じ方法で動画を引用しているツイートの動画は引用できない
- 現在は画像も引用できる

### ソースコード

```Javascript
// USER_ID等は、文字の種類と数が変更される可能性を考慮する。
const PROTOCOL = 'http[s]?';
const FQDN = '(?:[^/]+\\.)?twitter\\.com'; // m. | mobile. | www.
const USER_ID = '([^/]+)';
const STATUS_ID_LABEL = '[^/]+'; // status | statuses
const STATUS_ID = '(\\d+)'; // 2桁の存在を確認済み(jack/status/20)
const REG_EXP = new RegExp(
  `^${PROTOCOL}://${FQDN}/${USER_ID}/${STATUS_ID_LABEL}/${STATUS_ID}`
);

const url = window.location.href;
const regExpMatchArray = url.match(REG_EXP);

if (regExpMatchArray !== null) {
  const tweetUrlEndingWithStatusID = regExpMatchArray[0];
  const text = encodeURIComponent(`${tweetUrlEndingWithStatusID}/video/1`);
  window.location.href = `https://twitter.com/intent/tweet?text=${text}`;
} else {
  alert('failed.');
}
```

## リツイートにならないようにツイートの URL をツイートする

### ブックマークレット

```text
javascript:(function()%7Bvar%20a%3Dwindow.location.href.match(RegExp(%22%5Ehttp%5Bs%5D%3F%3A%2F%2F(%3F%3A%5B%5E%2F%5D%2B%5C%5C.)%3Ftwitter%5C%5C.com%2F(%5B%5E%2F%5D%2B)%2F%5B%5E%2F%5D%2B%2F(%5C%5Cd%2B)%22))%3Bif(null!%3D%3Da)%7Bvar%20b%3DencodeURIComponent(%22RT%20%22%2Ba%5B0%5D%2B%22%2Fphoto%22)%3Bwindow.location.href%3D%22https%3A%2F%2Ftwitter.com%2Fintent%2Ftweet%3Ftext%3D%22%2Bb%7Delse%20alert(%22failed.%22)%3B%7D)()
```

### 使用方法

1. Web 版の Twitter にログインする
1. 引用するツイートを開く
1. ブックマークレットを実行する

### 備考

- 「ツイートの URL の末尾に`/photo`をつけた URL」をツイートすると、リツイートにならないように URL をツイートできる
- ツイートの URL をそのままツイートするとリツイート扱いになる場合がある

### ソースコード

```Javascript
// USER_ID等は、文字の種類と数が変更される可能性を考慮する。
const PROTOCOL = 'http[s]?';
const FQDN = '(?:[^/]+\\.)?twitter\\.com'; // m. | mobile. | www.
const USER_ID = '([^/]+)';
const STATUS_ID_LABEL = '[^/]+'; // status | statuses
const STATUS_ID = '(\\d+)'; // 2桁の存在を確認済み(jack/status/20)
const REG_EXP = new RegExp(
  `^${PROTOCOL}://${FQDN}/${USER_ID}/${STATUS_ID_LABEL}/${STATUS_ID}`
);

const url = window.location.href;
const regExpMatchArray = url.match(REG_EXP);

if (regExpMatchArray !== null) {
  const tweetUrlEndingWithStatusID = regExpMatchArray[0];
  const text = encodeURIComponent(`RT ${tweetUrlEndingWithStatusID}/photo`);
  window.location.href = `https://twitter.com/intent/tweet?text=${text}`;
} else {
  alert('failed.');
}
```

## ソースコードをブックマークレットに変換する処理の内容

1. ソースコードの最適化([google-closure-compiler](https://github.com/google/closure-compiler/))
   - `--compilation_level ADVANCED`オプションで圧縮率を上げる
   - `--language_out ECMASCRIPT5`オプションで ES6 未対応のブラウザに対応
1. `(function(){<ソースコード>})()`の形式に変換
1. パーセントエンコーディング
   - 半角スペースは「+」に変換した方が良いが「%20」で妥協
1. 先頭に`javascript:`を付加

Linux コマンド

```text
npx google-closure-compiler --compilation_level ADVANCED --language_out ECMASCRIPT5 --js "/app/src/bookmarklet.js" | echo -n "(function(){"`cat`}")()" | node -p "encodeURIComponent(require('fs').readFileSync(0))" | echo -n "javascript:"`cat` > "/app/src/bookmarklet.txt
```

## 開発環境

<https://github.com/NeetworkEngineerSato/bookmarklet-development-environment>
