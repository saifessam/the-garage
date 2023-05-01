const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # MAIN TYPES
  type Query {
    getAllUsers: [Users!]
    getSingleUser(userId: ID!): Users
    getAllServiceProviders: [ServiceProviders!]
    getApprovedServiceProviders: [ServiceProviders!]
    getSingleServiceProvider(serviceProviderId: ID!): ServiceProviders
    getAllAds: [Ads!]
    getSingleAd(adId: ID!): Ads
    getUserAds(userId: ID!): [Ads!]
    getAllApprovedCars: [Ads!]
    getAllApprovedRentals: [Ads!]
    getSingleCar(carId: ID!): Ads
    getAllApprovedSpares: [Ads!]
    getSingleSpare(spareId: ID!): Ads
    getAllReviews: [Reviews!]
    search(searchData: SearchData): [SearchDetails!]
    getCartItems(id: ID!): [Cart!]
    getOwnerDetails(id: ID!): OwnerDetails
    getOrders(id: ID!): [Order!]
  }

  type Mutation {
    createUser(userData: UserData): Result
    updateUser(userUpdateData: UserUpdateData): Result
    deleteUser(userId: ID!): Result
    createServiceProvider(serviceProviderData: ServiceProviderData): Result
    updateServiceProvider: Result
    deleteServiceProvider(serviceProviderId: ID!): Result
    createAd(adData: AdData): Result
    updateAd: Result
    deleteAd(adId: ID!): Result
    createReview(reviewData: ReviewData): Result
    updateReview: Result
    deleteReview(reviewId: ID!): Result
    updatePassword(userPasswordData: UserPasswordData): Result
    login(loginData: LoginData): Result
    serviceProvidersApproval(serviceProviderId: ID!): Result
    adsApproval(adId: ID!): Result
    addToCart(cartData: CartData): Result
    deleteCartItem(id: ID!): Result
    clearCart(id: ID!): Result
    placeOrders(orderData: OrderData): Result
  }

  # MAJOR TYPES
  type Users {
    id: ID!
    name: String!
    email: String!
    password: String!
    image: String
    phone: String
    location: String
    isAdmin: Boolean
    reviews: [Reviews]
    ads: [Ads]
    createdAt: String!
    updatedAt: String!
  }

  type ServiceProviders {
    id: ID!
    name: String!
    email: String!
    password: String!
    branches: Branch!
    images: [String!]
    type: ServiceProviderType!
    workTime: WorkTime!
    offDays: [String!]
    description: String!
    approved: Boolean!
    reviews: [Reviews]
    ads: [Ads]
    createdAt: String!
    updatedAt: String!
  }

  type OwnerDetails {
    name: String!
    email: String!
    password: String!
    phone: String
    location: String
    branches: Branch
    image: String
    images: [String!]
  }

  type Branch {
    location: String!
    phone: String!
  }

  type WorkTime {
    open: String!
    close: String!
  }

  type Ads {
    id: ID!
    title: String!
    images: [String!]
    price: Float!
    avilability: Boolean!
    description: String!
    approved: Boolean!
    adType: AdType!
    make: String
    model: String
    year: Int
    color: String
    transmission: Transmission
    condition: Condition
    carType: CarType
    features: [String!]
    location: String
    ownerId: String!
    createdAt: String!
    updatedAt: String!
  }

  type SearchDetails {
    id: ID!
    title: String
    name: String
    email: String
    images: [String!]
    branches: Branch
    type: ServiceProviderType
    workTime: WorkTime
    offDays: [String!]
    price: Float
    avilability: Boolean
    description: String!
    approved: Boolean!
    adType: AdType
    make: String
    model: String
    year: Int
    color: String
    transmission: Transmission
    condition: Condition
    carType: CarType
    features: [String!]
    location: String
    ownerId: String
    createdAt: String!
    updatedAt: String!
  }

  type Reviews {
    id: ID!
    title: String!
    message: String!
    rate: Int!
    user: Users
    serviceProviderId: ID
    createdAt: String
    updatedAt: String
  }

  type Cart {
    id: ID!
    itemId: ID
    image: String!
    title: String!
    price: Int!
    quantity: Int!
    userId: ID
    serviceProviderId: ID
    createdAt: String
    updatedAt: String
  }

  type Order {
    id: ID!
    itemId: ID
    image: String!
    title: String!
    price: Int!
    quantity: Int!
    status: String!
    userId: ID
    serviceProviderId: ID
    createdAt: String
    updatedAt: String
  }

  type Result {
    status: Boolean!
    response: String
    token: String
  }

  # ENUMS
  enum ServiceProviderType {
    showroom
    center
  }

  enum Transmission {
    manual
    automatic
  }

  enum Condition {
    new
    used
    rentable
  }

  enum CarType {
    sedan
    suv
    hatchback
    other
  }

  enum AdType {
    vehicle
    spare
  }

  # INUPTS
  input UserData {
    name: String!
    email: String!
    phone: String!
    location: String!
    image: String!
    password: String!
    isAdmin: Boolean!
  }

  input UserUpdateData {
    id: ID!
    name: String!
    email: String!
    phone: String!
    location: String!
  }

  input ServiceProviderData {
    name: String!
    email: String!
    password: String!
    branch: BranchInput
    images: [String!]
    type: ServiceProviderType!
    workTime: WorkTimeInput
    offDays: [String!]
    description: String!
    approved: Boolean!
  }

  input BranchInput {
    location: String!
    phone: String!
  }

  input WorkTimeInput {
    open: String!
    close: String!
  }

  input UserPasswordData {
    userId: ID!
    currentPassword: String!
    newPassword: String!
  }

  input AdData {
    title: String!
    images: [String!]
    price: Float!
    avilability: Boolean!
    description: String!
    approved: Boolean!
    adType: AdType!
    make: String
    model: String
    year: Int
    color: String
    transmission: Transmission
    condition: Condition
    carType: CarType
    features: [String!]
    location: String
    ownerId: String!
  }

  input ReviewData {
    title: String!
    rate: Int!
    message: String!
    userId: ID!
    serviceProviderId: ID!
  }

  input LoginData {
    email: String!
    password: String!
  }

  input SearchData {
    criteria: String!
    query: String!
  }

  input CartData {
    itemId: ID
    image: String!
    title: String!
    price: Int!
    quantity: Int!
    userId: ID
    serviceProviderId: ID
  }

  input OrderData {
    itemId: ID
    image: String!
    title: String!
    price: Int!
    quantity: Int!
    status: String!
    userId: ID
    serviceProviderId: ID
  }
`;

module.exports = { typeDefs };
