const UserLogin = require('./UserLogin');
const ServiceProviderLogin = require('./ServiceProviderLogin');

const Login = async (props) => {
  const { prisma, email, password } = props;
  const user = await prisma.Users.findUnique({ where: { email } });
  if (user) {
    return UserLogin({ currentPassword: password, storedPassword: user.password, target: user });
  } else {
    const serviceProvider = await prisma.ServiceProviders.findUnique({ where: { email } });
    if (serviceProvider) {
      return ServiceProviderLogin({
        currentPassword: password,
        storedPassword: serviceProvider.password,
        target: serviceProvider,
      });
    } else {
      return { status: false, response: 'E-mail does not exist' };
    }
  }
};

module.exports = { Login };
