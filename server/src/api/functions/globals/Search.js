const Search = async (props) => {
  const { prisma, criteria, query } = props;

  try {
    if (criteria === 'service-providers') {
      const response = await prisma.ServiceProviders.findMany({
        where: {
          OR: [{ name: { startsWith: query } }, { name: { endsWith: query } }],
        },
        orderBy: [{ name: 'asc' }],
        take: 10,
      });
      if (response) {
        return response;
      } else {
        return { status: false, response: 'No matches' };
      }
    } else {
      const response = await prisma.Ads.findMany({
        where: {
          OR: [{ title: { startsWith: query } }, { title: { endsWith: query } }],
        },
        orderBy: [{ title: 'asc' }],
        take: 10,
      });
      if (response) {
        return response;
      } else {
        return { status: false, response: 'No matches' };
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { Search };
