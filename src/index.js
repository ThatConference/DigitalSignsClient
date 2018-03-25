import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import React from 'react';
import { render } from 'react-dom';

import Router from './components/Router';
import registerServiceWorker from './registerServiceWorker';

import './normalize.css';
import './index.css';

const client = new ApolloClient({
  uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql',
});

registerServiceWorker();

const Root = () => (
  <ApolloProvider client={client}>
    <Router />
  </ApolloProvider>
);

render(<Root />, document.getElementById('root'));
