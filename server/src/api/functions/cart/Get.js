const GetCartItmes = async (props) => {
  const { prisma, id } = props;

  try {
    const items = await prisma.Cart.findMany({ where: { OR: [{ userId: id }, { serviceProviderId: id }] } });
    if (items) {
      return items;
    } else {
      return { status: false, response: 'No items found' };
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = GetCartItmes;
