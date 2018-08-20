import { ApolloServer, gql } from 'apollo-server-express';
import { getUser } from 'meteor/apollo'
import merge from 'lodash/merge';

import ResolutionsSchema from '../../api/resolutions/Resolutions.graphql';
import ResolutionsResolvers from '../../api/resolutions/resolvers';

const testSchema = 	gql`
  type Query {
    hi: String
    resolutions: [Resolution]
  }
`;

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = [
	testSchema,
	ResolutionsSchema
];

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const testResolvers = {
  Query: {
    hi() {
      return 'Hello Level Up';
    }
  }
}

const resolvers = merge(
	testResolvers,
	ResolutionsResolvers
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => ({
    user: await getUser(req.headers.authorization)
  })
})

server.applyMiddleware({
  app: WebApp.connectHandlers,
  path: '/graphql'
})

// We are doing this work-around because Playground sets headers and WebApp also sets headers
// Resulting into a conflict and a server side exception of "Headers already sent"
WebApp.connectHandlers.use('/graphql', (req, res) => {
  if (req.method === 'GET') {
    res.end()
  }
});

