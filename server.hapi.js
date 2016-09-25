import hapi from 'hapi';
import { apolloHapi, graphiqlHapi } from 'apollo-server'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import Schema from './data/schema';
import Mocks from './data/mocks';
import Resolvers from './data/resolvers';


const server = new hapi.Server();

const HOST = 'localhost';
const PORT = 8080;

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
});

/*addMockFunctionsToSchema({
  schema: executableSchema,
  mocks: Mocks,
  preserveResolvers: false,
});*/

server.connection({
  host: HOST,
  port: PORT,
});

server.register({
  register: apolloHapi,
  options: {
    path: '/graphql',
    apolloOptions: {
      schema: executableSchema,
      context: {},
    }
  },
});

server.register({
  register: graphiqlHapi,
  options: {
    path: '/graphiql',
    graphiqlOptions: {
      endpointURL: '/graphql',
    },
  },
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
