const GetSingleItem = async (props) => {
  const { prisma, id } = props;

  const serviceProvider = await prisma.ServiceProviders.findMany({ where: { id } });
  if (serviceProvider !== null) {
    return serviceProvider;
  } else {
    const item = await prisma.Ads.findMany({ where: { id } });
    if (item !== null) {
      return item;
    } else {
      return { status: false, response: 'No ads found' };
    }
  }
};

module.exports = GetSingleItem;
