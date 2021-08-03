const crypto = require('crypto');

const genPassword = password => {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return {
    salt,
    hash,
  };
};

const validPassword = (password, hash, salt) => {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return hash === hashVerify;
};

module.exports = {
  validPassword,
  genPassword,
};
