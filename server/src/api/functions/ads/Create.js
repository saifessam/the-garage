const CreateAd = async (props) => {
  const {
    prisma,
    title,
    images,
    price,
    avilability,
    description,
    approved,
    adType,
    make,
    model,
    year,
    color,
    transmission,
    condition,
    carType,
    features,
    location,
    ownerId,
  } = props;
  try {
    await prisma.Ads.create({
      data: {
        title,
        images,
        price,
        avilability,
        description,
        approved,
        adType,
        make,
        model,
        year,
        color,
        transmission,
        condition,
        carType,
        features,
        location,
        ownerId,
      },
    });
    return { status: true, response: 'Ad is successfully submitted for revision' };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { CreateAd };
