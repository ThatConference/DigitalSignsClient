import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloProvider } from 'react-apollo';
import React from 'react';
import { render } from 'react-dom';
import { WebSocketLink } from 'apollo-link-ws';

import Router from './components/Router';
import registerServiceWorker from './registerServiceWorker';

import './normalize.css';
import './index.css';

// Create an http link:
const httpLink = new HttpLink({
  uri: 'https://that-server-demo.now.sh/graphql',
  // uri: 'http://localhost:8000/graphql',
});

const wsLink = new WebSocketLink({
  uri: 'wss://that-server-demo.now.sh/subscriptions',
  // uri: 'wss://bigredbutton-165918.appspot.com/subscriptions',
  // uri: 'ws://localhost:8000/subscriptions',
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
    <Router />
  </ApolloProvider>
);

render(<Root />, document.getElementById('root'));
