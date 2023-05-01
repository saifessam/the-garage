const AddToCart = async (props) => {
  const { prisma, itemId, image, title, price, quantity, userId, serviceProviderId } = props;
  try {
    await prisma.Cart.create({
      data: {
        itemId,
        image,
        title,
        price,
        quantity,
        userId,
        serviceProviderId,
      },
    });
    return { status: true, response: 'Item added to cart successfully' };
  } catch (error) {
    console.error(error);
  }
};

module.exports = AddToCart;
