const murmurhash = require("murmurhash");

function base62(num) {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (num === 0) return '';
  return base62(Math.floor(num / 62)) + chars[num % 62];
}
function hash(url) {
  const firstHash = murmurhash.v3(url);
  return(firstHash === 0 ? '0' : base62(firstHash));
}

module.exports = hash;
