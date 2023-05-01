const DeleteCartItem = async (props) => {
  const { prisma, id } = props;
  try {
    await prisma.Cart.delete({ where: { id } });
    return { status: true, response: 'Item successfully deleted' };
  } catch (error) {
    console.log(error);
  }
};

const ClearCart = async (props) => {
  const { prisma, id } = props;
  try {
    await prisma.Cart.deleteMany({ where: { OR: [{ userId: id }, { serviceProviderId: id }] } });
    return { status: true, response: 'Cart cleared successfully' };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { DeleteCartItem, ClearCart };
