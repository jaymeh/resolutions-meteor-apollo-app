import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {ApolloClient } from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from '../../ui/app';

const httpLink = new HttpLink({
  uri: Meteor.absoluteUrl('graphql')
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
  mutate: {
    errorPolicy: 'all'
  }
}

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
  defaultOptions,
});

const ApolloApp = () => {
  return <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
};

Meteor.startup(() => {
  render(<ApolloApp />, document.getElementById('app'));
});
