import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation ($userData: UserData) {
    createUser(userData: $userData) {
      status
      response
    }
  }
`;

export const UPDATE_USER = gql`
  mutation ($userUpdateData: UserUpdateData) {
    updateUser(userUpdateData: $userUpdateData) {
      status
      response
    }
  }
`;

export const DELETE_USER = gql`
  mutation ($userId: ID!) {
    deleteUser(userId: $userId) {
      status
      response
    }
  }
`;

export const LOGIN_USER = gql`
  mutation ($loginData: LoginData) {
    login(loginData: $loginData) {
      status
      response
      token
    }
  }
`;

export const REGISTER_SERVICES_PROVIDER = gql`
  mutation ($serviceProviderData: ServiceProviderData) {
    createServiceProvider(serviceProviderData: $serviceProviderData) {
      status
      response
    }
  }
`;

export const DELETE_SERVICES_PROVIDER = gql`
  mutation ($serviceProviderId: ID!) {
    deleteServiceProvider(serviceProviderId: $serviceProviderId) {
      status
      response
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation ($reviewData: ReviewData) {
    createReview(reviewData: $reviewData) {
      status
      response
    }
  }
`;

export const SERVICES_PROVIDERS_APPROVAL = gql`
  mutation ($serviceProviderId: ID!) {
    serviceProvidersApproval(serviceProviderId: $serviceProviderId) {
      status
      response
    }
  }
`;

export const ADS_APPROVAL = gql`
  mutation ($adId: ID!) {
    adsApproval(adId: $adId) {
      status
      response
    }
  }
`;

export const CREATE_AD = gql`
  mutation ($adData: AdData) {
    createAd(adData: $adData) {
      status
      response
    }
  }
`;

export const DELETE_AD = gql`
  mutation ($adId: ID!) {
    deleteAd(adId: $adId) {
      status
      response
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation ($cartData: CartData) {
    addToCart(cartData: $cartData) {
      status
      response
    }
  }
`;

export const DELETE_CART_ITEM = gql`
  mutation ($deleteCartItemId: ID!) {
    deleteCartItem(id: $deleteCartItemId) {
      status
      response
    }
  }
`;

export const CLEAR_CART = gql`
  mutation ($clearCartId: ID!) {
    clearCart(id: $clearCartId) {
      status
      response
    }
  }
`;

export const PLACE_ORDERS = gql`
  mutation ($orderData: OrderData) {
    placeOrders(orderData: $orderData) {
      status
      response
    }
  }
`;
