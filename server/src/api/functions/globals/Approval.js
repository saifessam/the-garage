const ServiceProvidersApproval = async (props) => {
  const { prisma, serviceProviderId } = props;
  const record = await prisma.ServiceProviders.findUnique({
    where: {
      id: serviceProviderId,
    },
  });

  const isApproved = record.approved;

  try {
    await prisma.ServiceProviders.update({
      where: {
        id: serviceProviderId,
      },
      data: {
        approved: !isApproved,
      },
    });
    return { status: true, response: `Approval is now set to ${!isApproved}` };
  } catch (error) {
    console.log(error);
  }
};

const AdsApproval = async (props) => {
  const { prisma, adId } = props;
  const record = await prisma.Ads.findUnique({
    where: {
      id: adId,
    },
  });

  const isApproved = record.approved;

  try {
    await prisma.Ads.update({
      where: {
        id: adId,
      },
      data: {
        approved: !isApproved,
      },
    });
    return { status: true, response: `Approval is now set to ${!isApproved}` };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { ServiceProvidersApproval, AdsApproval };
