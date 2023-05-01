const CreateReview = async (props) => {
  const { prisma, title, message, rate, userId, serviceProviderId } = props;

  try {
    await prisma.Reviews.create({
      data: {
        title,
        rate,
        message,
        userId,
        serviceProviderId,
      },
      include: {
        user: true,
      },
    });
    return { status: true, response: 'Review is created successfully' };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { CreateReview };
