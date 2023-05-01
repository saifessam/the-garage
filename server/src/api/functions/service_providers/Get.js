const GetAllServiceProviders = async (props) => {
  const { prisma } = props;

  try {
    const response = await prisma.ServiceProviders.findMany();
    if (response) {
      return response;
    } else {
      return { status: false, response: 'No services providers found' };
    }
  } catch (error) {
    console.log(error);
  }
};

const GetApprovedServiceProviders = async (props) => {
  const { prisma } = props;

  try {
    const response = await prisma.ServiceProviders.findMany({
      where: {
        approved: true,
      },
      include: {
        reviews: {
          select: {
            id: true,
            title: true,
            message: true,
            rate: true,
            user: true,
          },
        },
      },
    });
    if (response) {
      return response;
    } else {
      return { status: false, response: 'No services providers found' };
    }
  } catch (error) {
    console.log(error);
  }
};

const GetSingleServiceProvider = async (props) => {
  const { prisma, serviceProviderId } = props;

  try {
    const response = await prisma.ServiceProviders.findUnique({
      where: {
        id: serviceProviderId,
      },
      include: {
        reviews: {
          select: {
            id: true,
            title: true,
            message: true,
            rate: true,
            user: true,
          },
        },
      },
    });
    if (response) {
      return response;
    } else {
      return { status: false, response: 'No data found' };
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { GetAllServiceProviders, GetApprovedServiceProviders, GetSingleServiceProvider };
