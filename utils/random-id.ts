const { customAlphabet } = require('nanoid');

export const randomId = (size: number = 7) => {
  const alphabet =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const nanoid = customAlphabet(alphabet, size);
  return nanoid(); //=> "Lgxg2tV"
};
