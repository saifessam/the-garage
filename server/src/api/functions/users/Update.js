const UpdateUser = async (props) => {
  const { prisma, id, name, email, phone, location } = props;

  try {
    await prisma.Users.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        phone,
        location,
      },
    });
    return { status: true, response: `User is updated successfully` };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { UpdateUser };
