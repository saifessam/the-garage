const CheckPasswords = require('./CheckPasswords');
const CreateToken = require('./CreateToken');

const ServiceProviderLogin = async ({ currentPassword, storedPassword, target }) => {
  const check = CheckPasswords({ currentPassword, storedPassword });
  if (!check) {
    return { status: false, cause: 'password', response: 'Wrong password' };
  } else {
    const token = CreateToken({
      id: target.id,
      email: target.email,
    });

    return { status: true, response: 'Login successful', token: token };
  }
};

module.exports = ServiceProviderLogin;
