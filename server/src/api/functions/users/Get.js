const GetAllUsers = async (props) => {
  const { prisma } = props;

  try {
    const users = await prisma.Users.findMany();
    if (users) {
      return users;
    } else {
      return { status: false, response: 'No users found' };
    }
  } catch (error) {
    console.log(error);
  }
};

const GetSingleUser = async (props) => {
  const { prisma, userId } = props;

  try {
    const user = await prisma.Users.findUnique({
      where: {
        id: userId,
      },
    });
    if (user) {
      return user;
    } else {
      return { status: false, response: 'No data found' };
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { GetAllUsers, GetSingleUser };
