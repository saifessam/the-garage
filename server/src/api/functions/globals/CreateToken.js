const JWT = require('jsonwebtoken');

const CreateToken = (values) => {
  const token = JWT.sign(values, process.env.TOKEN_SECRET, {
    expiresIn: '7d',
  });
  return token;
};

module.exports = CreateToken;
