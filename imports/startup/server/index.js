import { ApolloServer } from 'apollo-server-express';

// import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';

// createApolloServer({});
const server = new ApolloServer({});