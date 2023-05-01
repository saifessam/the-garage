const DeleteAd = async (props) => {
  const { prisma, adId } = props;
  try {
    await prisma.Ads.delete({
      where: {
        id: adId,
      },
    });
    return { status: true, response: 'Ad successfully deleted' };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { DeleteAd };
