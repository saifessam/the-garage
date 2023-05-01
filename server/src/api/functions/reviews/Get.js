const GetAllReviews = async (props) => {
  const { prisma } = props;

  try {
    const reviews = await prisma.Reviews.findMany({
      include: {
        user: true,
      },
    });
    if (reviews) {
      return reviews;
    } else {
      return { status: false, response: 'No reviews found' };
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { GetAllReviews };
