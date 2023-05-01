const { CheckPhones } = require('../Globals/CheckPhones');
const { HashPassword } = require('../Globals/HashPassword');
const { StrongPassword } = require('../Globals/StrongPassword');

const CreateServiceProvider = async (props) => {
  const { prisma, name, email, password, branch, images, type, workTime, offDays, description, approved } = props;

  const isExistedEmail = await prisma.ServiceProviders.findUnique({ where: { email } });
  if (isExistedEmail) {
    return { status: false, cause: 'email', response: 'E-mail is already in use' };
  } else {
    const strongPassword = StrongPassword({ password });
    if (!strongPassword) {
      return { status: false, cause: 'password', response: 'Weak password' };
    } else {
      try {
        await prisma.ServiceProviders.create({
          data: {
            name,
            email: email.toLowerCase(),
            password: HashPassword({ password }),
            branches: branch,
            images,
            type,
            workTime,
            offDays: offDays || undefined,
            description,
            approved,
          },
        });
        return { status: true, response: 'Account is successfully submitted for revision' };
      } catch (error) {
        console.log(error);
      }
    }
  }
};

module.exports = { CreateServiceProvider };
