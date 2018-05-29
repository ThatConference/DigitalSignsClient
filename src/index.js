import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider } from 'react-apollo';
import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { WebSocketLink } from 'apollo-link-ws';
import { createNetworkStatusNotifier } from 'react-apollo-network-status';

import Router from './Router';
import registerServiceWorker from './registerServiceWorker';

import './normalize.css';
import './index.css';

const { NetworkStatusNotifier } = createNetworkStatusNotifier();

// Create an http link:
const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_GRAPHQL_HOST}/graphql`,
});

const wsLink = new WebSocketLink({
  uri: `${process.env.REACT_APP_GRAPHQL_WSS_HOST}/subscriptions`,
  options: {
    reconnect: true,
  },
});

const link = ApolloLink.split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

registerServiceWorker();

const Root = () => (
  <ApolloProvider client={client}>
    <Fragment>
      <NetworkStatusNotifier render={({ loading, error }) => {
        if (loading) {
          document.body.style.borderTop = '4px solid yellow';
          return null;
        }

        if (error) {
          document.body.style.borderTop = '4px solid red';
          return null;
        }

        document.body.style.borderTop = '0px';
        return null;
      }} />
      <Router />
    </Fragment>
  </ApolloProvider>
);

render(<Root />, document.getElementById('root'));
