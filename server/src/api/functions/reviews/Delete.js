const DeleteReview = async (props) => {
  const { prisma, reviewId } = props;
  try {
    await prisma.Reviews.delete({
      where: {
        id: reviewId,
      },
    });
    return { status: true, response: 'Review successfully deleted' };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { DeleteReview };
