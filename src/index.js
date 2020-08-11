import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SchemaLink } from 'apollo-link-schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import gql from 'graphql-tag';

const typeDefs = `
  type Query {
    ping: String!
  }
`;

const resolvers = {
  Query: {
    ping: () => 'pong',
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

const client = new ApolloClient({
  link: new SchemaLink({ schema }),
  cache: new InMemoryCache(),
});

(async function () {
  const { loading, error, data } = await client.query({
    query: gql`
      query {
        ping
      }
    `,
  });

  console.log('loading:', loading);
  console.log('error:', error);
  console.log('data:', data);
})();
