const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const { typeDefs } = require('./api/graphql/schema');
const { Query } = require('./api/graphql/resolvers/Queries');
const { Mutation } = require('./api/graphql/resolvers/Mutations');

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
