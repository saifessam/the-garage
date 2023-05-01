const bcrypt = require('bcrypt');

const CheckPasswords = (props) => {
  const { currentPassword, storedPassword } = props;
  const check = bcrypt.compareSync(currentPassword, storedPassword);
  return check;
};

module.exports = CheckPasswords;
