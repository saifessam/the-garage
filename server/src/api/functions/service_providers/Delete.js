const DeleteServiceProvider = async (props) => {
  const { prisma, serviceProviderId } = props;
  try {
    await prisma.ServiceProviders.delete({
      where: {
        id: serviceProviderId,
      },
    });
    return { status: true, response: 'Service Provider successfully deleted' };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { DeleteServiceProvider };
