const bcrypt = require('bcrypt');

const HashPassword = (props) => {
  const { password } = props;
  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  return hash;
};

module.exports = { HashPassword };
