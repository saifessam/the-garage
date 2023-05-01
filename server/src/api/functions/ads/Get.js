const GetAllAds = async (props) => {
  const { prisma } = props;

  try {
    const ads = await prisma.Ads.findMany();
    if (ads) {
      return ads;
    } else {
      return { status: false, response: 'No ads found' };
    }
  } catch (error) {
    console.log(error);
  }
};

const GetSingleAd = async (props) => {
  const { prisma, adId: id } = props;

  try {
    const ad = await prisma.Ads.findUnique({ where: { id } });
    if (ad) {
      return ad;
    } else {
      return { status: false, response: 'No ads data found' };
    }
  } catch (error) {
    console.log(error);
  }
};

const GetUserAds = async (props) => {
  const { prisma, userId } = props;

  try {
    const ads = await prisma.Ads.findMany({ where: { ownerId: userId } });
    if (ads) {
      return ads;
    } else {
      return { status: false, response: 'No ads found' };
    }
  } catch (error) {
    console.log(error);
  }
};

const GetAllApprovedCars = async (props) => {
  const { prisma } = props;

  try {
    const ads = await prisma.Ads.findMany({
      where: {
        adType: 'vehicle',
        AND: [{ OR: [{ condition: 'new' }, { condition: 'used' }] }, { approved: true }],
      },
    });
    if (ads) {
      return ads;
    } else {
      return { status: false, response: 'No ads found' };
    }
  } catch (error) {
    console.log(error);
  }
};

const GetSingleCar = async (props) => {
  const { prisma, carId } = props;

  try {
    const car = await prisma.Ads.findUnique({
      where: {
        id: carId,
      },
    });
    if (car) {
      return car;
    } else {
      return { status: false, response: 'No data found' };
    }
  } catch (error) {
    console.log(error);
  }
};

const GetAllApprovedRentals = async (props) => {
  const { prisma } = props;

  try {
    const ads = await prisma.Ads.findMany({
      where: {
        adType: 'vehicle',
        AND: [{ condition: 'rentable' }, { approved: true }],
      },
    });
    if (ads) {
      return ads;
    } else {
      return { status: false, response: 'No ads found' };
    }
  } catch (error) {
    console.log(error);
  }
};

const GetAllApprovedSpares = async (props) => {
  const { prisma } = props;

  try {
    const ads = await prisma.Ads.findMany({
      where: {
        adType: 'spare',
        AND: [{ OR: [{ condition: 'new' }, { condition: 'used' }] }, { approved: true }],
      },
    });
    if (ads) {
      return ads;
    } else {
      return { status: false, response: 'No ads found' };
    }
  } catch (error) {
    console.log(error);
  }
};

const GetSingleSpare = async (props) => {
  const { prisma, spareId } = props;

  try {
    const spare = await prisma.Ads.findUnique({
      where: {
        id: spareId,
      },
    });
    if (spare) {
      return spare;
    } else {
      return { status: false, response: 'No data found' };
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  GetAllAds,
  GetSingleAd,
  GetUserAds,
  GetAllApprovedCars,
  GetAllApprovedRentals,
  GetAllApprovedSpares,
  GetSingleCar,
  GetSingleSpare,
};
