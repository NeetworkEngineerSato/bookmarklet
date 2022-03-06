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
  const text = encodeURIComponent(
    `RT ${tweetUrlEndingWithStatusID}/photo\n${tweetUrlEndingWithStatusID}/photo/1`
  );
  window.location.href = `https://twitter.com/intent/tweet?text=${text}`;
} else {
  alert('failed.');
}
