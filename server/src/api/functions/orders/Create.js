const PlaceOrder = async (props) => {
  const { prisma, itemId, image, title, price, quantity, status, userId, serviceProviderId } = props;
  try {
    await prisma.Order.create({
      data: {
        itemId,
        image,
        title,
        price,
        quantity,
        status,
        userId,
        serviceProviderId,
      },
    });
    return { status: true, response: 'Order placed successfully' };
  } catch (error) {
    console.error(error);
  }
};

module.exports = PlaceOrder;
