const { CheckPasswords } = require('./CheckPasswords');
const { HashPassword } = require('./HashPassword');

const UpdatePassword = async (props) => {
  const { prisma, userId, currentPassword, newPassword } = props;
  const userData = await prisma.Users.findUnique({
    where: {
      id: userId,
    },
    select: {
      password: true,
    },
  });
  const storedPassword = userData.password;

  const check = CheckPasswords({ currentPassword, storedPassword });
  if (!check) {
    return { status: false, cause: 'password', response: 'Passwrods do not match' };
  } else {
    await prisma.Users.update({
      where: {
        id: userId,
      },
      data: {
        password: HashPassword({ password: newPassword }),
      },
    });
    return { status: true, response: 'Passwrod updated successfully' };
  }
};

module.exports = { UpdatePassword };
