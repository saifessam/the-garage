const { HashPassword } = require('../Globals/HashPassword');
const { Login } = require('../globals/Login');
const { StrongPassword } = require('../Globals/StrongPassword');

const CreateUser = async (props) => {
  const { prisma, name, email, image, location, phone, password, isAdmin } = props;
  const count = await prisma.Users.count();
  if (count === 0) {
    try {
      await prisma.Users.create({
        data: {
          name,
          email,
          image,
          location,
          phone,
          password: HashPassword({ password }),
          isAdmin: true,
        },
      });
      return { status: true, response: 'Account is created successfully' };
    } catch (error) {
      console.log(error);
    }
  } else {
    const isExisted = await prisma.Users.count({ where: { email } });
    if (isExisted !== 0) {
      return { status: false, cause: 'email', response: 'E-mail is already in use' };
    } else {
      const strongPassword = StrongPassword({ password });
      if (!strongPassword) {
        return { status: false, cause: 'password', response: 'Weak password' };
      } else {
        try {
          await prisma.Users.create({
            data: {
              name,
              email,
              image,
              location,
              phone,
              password: HashPassword({ password }),
              isAdmin,
            },
          });
          return { status: true, response: 'Account is created successfully' };
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
};

module.exports = { CreateUser };
