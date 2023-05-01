const GetOwnerDetails = async (props) => {
  const { prisma, id } = props;
  const user = await prisma.Users.findUnique({ where: { id } });
  if (user) {
    return user;
  } else {
    const serviceProvider = await prisma.ServiceProviders.findUnique({ where: { id } });
    if (serviceProvider) {
      return serviceProvider;
    } else {
      return { status: false, response: 'User does not exist' };
    }
  }
};

module.exports = GetOwnerDetails;
