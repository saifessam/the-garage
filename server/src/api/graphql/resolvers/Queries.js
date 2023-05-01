const { GetAllUsers, GetSingleUser } = require('../../functions/users/Get');
const {
  GetAllServiceProviders,
  GetSingleServiceProvider,
  GetApprovedServiceProviders,
} = require('../../functions/service_providers/Get');
const {
  GetAllAds,
  GetAllApprovedCars,
  GetAllApprovedRentals,
  GetSingleCar,
  GetAllApprovedSpares,
  GetSingleSpare,
  GetSingleAd,
  GetUserAds,
} = require('../../functions/ads/Get');
const { GetAllReviews } = require('../../functions/reviews/Get');
const { Search } = require('../../functions/globals/Search');
const GetCartItmes = require('../../functions/cart/Get');
const GetOwnerDetails = require('../../functions/globals/GetOwnerDetails');
const GetOrders = require('../../functions/orders/Get');

const Query = {
  getAllUsers: async (parent, args, { prisma }) => {
    return GetAllUsers({ prisma });
  },
  getSingleUser: async (parent, args, { prisma }) => {
    return GetSingleUser({ prisma, ...args });
  },
  getAllServiceProviders: async (parent, args, { prisma }) => {
    return GetAllServiceProviders({ prisma });
  },
  getApprovedServiceProviders: async (parent, args, { prisma }) => {
    return GetApprovedServiceProviders({ prisma });
  },
  getSingleServiceProvider: async (parent, args, { prisma }) => {
    return GetSingleServiceProvider({ prisma, ...args });
  },
  getAllAds: async (parent, args, { prisma }) => {
    return GetAllAds({ prisma });
  },
  getSingleAd: async (parent, args, { prisma }) => {
    return GetSingleAd({ prisma, ...args });
  },
  getUserAds: async (parent, args, { prisma }) => {
    return GetUserAds({ prisma, ...args });
  },
  getAllApprovedCars: async (parent, args, { prisma }) => {
    return GetAllApprovedCars({ prisma });
  },
  getAllApprovedRentals: async (parent, args, { prisma }) => {
    return GetAllApprovedRentals({ prisma });
  },
  getSingleCar: async (parent, args, { prisma }) => {
    return GetSingleCar({ prisma, ...args });
  },
  getAllApprovedSpares: async (parent, args, { prisma }) => {
    return GetAllApprovedSpares({ prisma });
  },
  getSingleSpare: async (parent, args, { prisma }) => {
    return GetSingleSpare({ prisma, ...args });
  },
  getAllReviews: async (parent, args, { prisma }) => {
    return GetAllReviews({ prisma });
  },
  search: async (parent, args, { prisma }) => {
    return Search({ prisma, ...args.searchData });
  },
  getCartItems: async (parent, args, { prisma }) => {
    return GetCartItmes({ prisma, ...args });
  },
  getOwnerDetails: async (parent, args, { prisma }) => {
    return GetOwnerDetails({ prisma, ...args });
  },
  getOrders: async (parent, args, { prisma }) => {
    return GetOrders({ prisma, ...args });
  },
};

module.exports = { Query };
