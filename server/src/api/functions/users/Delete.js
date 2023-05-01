const DeleteUser = async (props) => {
  const { prisma, userId } = props;
  try {
    await prisma.Users.delete({
      where: {
        id: userId,
      },
    });
    return { status: true, response: 'User successfully deleted' };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { DeleteUser };
