const { CreateUser } = require('./../../functions/users/Create');
const { DeleteUser } = require('./../../functions/users/Delete');
const { CreateServiceProvider } = require('./../../functions/service_providers/Create');
const { DeleteServiceProvider } = require('./../../functions/service_providers/Delete');
const { CreateAd } = require('./../../functions/ads/Create');
const { DeleteAd } = require('./../../functions/ads/Delete');
const { UpdatePassword } = require('./../../functions/globals/UpdatePassword');
const { Login } = require('./../../functions/globals/Login');
const { CreateReview } = require('./../../functions/reviews/Create');
const { DeleteReview } = require('./../../functions/reviews/Delete');
const { UpdateUser } = require('./../../functions/users/Update');
const { UpdateServiceProvider } = require('./../../functions/service_providers/Update');
const { UpdateAd } = require('./../../functions/ads/Update');
const { UpdateReview } = require('./../../functions/reviews/Update');
const { ServiceProvidersApproval, AdsApproval } = require('./../../functions/globals/Approval');
const AddToCart = require('../../functions/cart/create');
const { DeleteCartItem, ClearCart } = require('../../functions/cart/Delete');
const PlaceOrder = require('../../functions/orders/Create');

const Mutation = {
  // Users mutations
  createUser: async (parent, args, { prisma }) => {
    return CreateUser({ prisma, ...args.userData });
  },
  updateUser: async (parent, args, { prisma }) => {
    return UpdateUser({ prisma, ...args.userUpdateData });
  },
  deleteUser: async (parent, args, { prisma }) => {
    return DeleteUser({ prisma, ...args });
  },

  // Service providers mutations
  createServiceProvider: async (parent, args, { prisma }) => {
    return CreateServiceProvider({ prisma, ...args.serviceProviderData });
  },
  updateServiceProvider: async (parent, args, { prisma }) => {
    return UpdateServiceProvider({ prisma, ...args });
  },
  deleteServiceProvider: async (parent, args, { prisma }) => {
    return DeleteServiceProvider({ prisma, ...args });
  },

  // Ads mutations
  createAd: async (parent, args, { prisma }) => {
    return CreateAd({ prisma, ...args.adData });
  },
  updateAd: async (parent, args, { prisma }) => {
    return UpdateAd({ prisma, ...args });
  },
  deleteAd: async (parent, args, { prisma }) => {
    return DeleteAd({ prisma, ...args });
  },

  // Reviews mutations
  createReview: async (parent, args, { prisma }) => {
    return CreateReview({ prisma, ...args.reviewData });
  },
  updateReview: async (parent, args, { prisma }) => {
    return UpdateReview({ prisma, ...args });
  },
  deleteReview: async (parent, args, { prisma }) => {
    return DeleteReview({ prisma, ...args });
  },

  // Global mutations
  updatePassword: async (parent, args, { prisma }) => {
    return UpdatePassword({ prisma, ...args.userPasswordData });
  },
  login: async (parent, args, { prisma }) => {
    return Login({ prisma, ...args.loginData });
  },
  serviceProvidersApproval: async (parent, args, { prisma }) => {
    return ServiceProvidersApproval({ prisma, ...args });
  },
  adsApproval: async (parent, args, { prisma }) => {
    return AdsApproval({ prisma, ...args });
  },
  addToCart: async (parent, args, { prisma }) => {
    return AddToCart({ prisma, ...args.cartData });
  },
  deleteCartItem: async (parent, args, { prisma }) => {
    return DeleteCartItem({ prisma, ...args });
  },
  clearCart: async (parent, args, { prisma }) => {
    return ClearCart({ prisma, ...args });
  },
  placeOrders: async (parent, args, { prisma }) => {
    return PlaceOrder({ prisma, ...args.orderData });
  },
};

module.exports = { Mutation };
