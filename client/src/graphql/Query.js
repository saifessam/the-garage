import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      id
      name
      email
      password
      image
      phone
      location
      isAdmin
    }
  }
`;

export const GET_SINGLE_USER = gql`
  query ($userId: ID!) {
    getSingleUser(userId: $userId) {
      id
      name
      email
      image
      password
      phone
      location
      isAdmin
    }
  }
`;

export const GET_ALL_SERVICE_PROVIDERS = gql`
  query {
    getAllServiceProviders {
      id
      name
      email
      type
      images
      branches {
        phone
        location
      }
      workTime {
        open
        close
      }
      offDays
      description
      approved
    }
  }
`;

export const GET_APPROVED_SERVICE_PROVIDERS = gql`
  query {
    getApprovedServiceProviders {
      id
      name
      email
      type
      images
      branches {
        phone
        location
      }
      workTime {
        open
        close
      }
      offDays
      description
      approved
      reviews {
        id
        title
        message
        rate
        user {
          id
          name
          image
        }
      }
    }
  }
`;

export const GET_SINGLE_SERVICE_PROVIDER = gql`
  query ($serviceProviderId: ID!) {
    getSingleServiceProvider(serviceProviderId: $serviceProviderId) {
      id
      name
      email
      branches {
        phone
        location
      }
      images
      type
      workTime {
        open
        close
      }
      offDays
      description
      reviews {
        id
        title
        message
        rate
        user {
          id
          name
          image
        }
        serviceProviderId
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_ALL_ADS = gql`
  query {
    getAllAds {
      id
      title
      images
      price
      avilability
      description
      approved
      adType
      make
      model
      year
      color
      transmission
      condition
      carType
      features
      location
      ownerId
      createdAt
      updatedAt
    }
  }
`;

export const GET_SINGLE_AD = gql`
  query ($adId: ID!) {
    getSingleAd(adId: $adId) {
      id
      title
      images
      price
      avilability
      description
      approved
      adType
      make
      model
      year
      color
      transmission
      condition
      carType
      features
      location
      ownerId
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_ADS = gql`
  query ($userId: ID!) {
    getUserAds(userId: $userId) {
      id
      title
      images
      price
      avilability
      description
      approved
      adType
      make
      model
      year
      color
      transmission
      condition
      carType
      features
      location
      ownerId
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_APPROVED_CARS = gql`
  query {
    getAllApprovedCars {
      id
      title
      images
      price
      adType
      condition
      year
      transmission
      avilability
    }
  }
`;

export const GET_ALL_APPROVED_RENTALS = gql`
  query {
    getAllApprovedRentals {
      id
      title
      images
      price
      adType
      condition
      year
      transmission
      avilability
    }
  }
`;

export const GET_SINGLE_CAR = gql`
  query ($carId: ID!) {
    getSingleCar(carId: $carId) {
      id
      title
      images
      price
      avilability
      description
      adType
      year
      color
      transmission
      condition
      carType
      features
      location
      ownerId
    }
  }
`;

export const GET_ALL_APPROVED_SPARES = gql`
  query {
    getAllApprovedSpares {
      id
      title
      images
      price
      adType
      condition
      make
      model
      avilability
    }
  }
`;

export const GET_SINGLE_SPARE = gql`
  query ($spareId: ID!) {
    getSingleSpare(spareId: $spareId) {
      id
      title
      images
      price
      avilability
      description
      adType
      make
      model
      ownerId
    }
  }
`;

export const GET_CART_ITEMS = gql`
  query ($getCartItemsId: ID!) {
    getCartItems(id: $getCartItemsId) {
      id
      itemId
      image
      title
      price
      quantity
      userId
      serviceProviderId
    }
  }
`;

export const GET_OWNER_DETAILS = gql`
  query ($getOwnerDetailsId: ID!) {
    getOwnerDetails(id: $getOwnerDetailsId) {
      name
      email
      phone
      location
      branches {
        phone
        location
      }
      image
      images
    }
  }
`;

export const GET_ORDERS = gql`
  query ($getOrdersId: ID!) {
    getOrders(id: $getOrdersId) {
      id
      itemId
      image
      title
      quantity
      price
      status
      userId
      serviceProviderId
    }
  }
`;

export const SEARCH = gql`
  query ($searchData: SearchData) {
    search(searchData: $searchData) {
      id
      title
      name
      email
      images
      branches {
        location
        phone
      }
      type
      workTime {
        open
        close
      }
      offDays
      price
      avilability
      description
      approved
      adType
      make
      model
      year
      color
      transmission
      condition
      carType
      features
      location
      ownerId
      createdAt
      updatedAt
    }
  }
`;
