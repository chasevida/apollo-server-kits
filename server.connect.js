import connect from 'connect';
import { apolloConnect, graphiqlConnect } from 'apollo-server';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import bodyParser from 'body-parser';
import Schema from './data/schema';
import Mocks from './data/mocks';
import Resolvers from './data/resolvers';


const PORT = 8080;
const app = connect();

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
});

/*addMockFunctionsToSchema({
  schema: executableSchema,
  mocks: Mocks,
  preserveResolvers: false,
});*/

app.use('/graphql', bodyParser.json());

app.use('/graphql', apolloConnect({
  schema: executableSchema,
  context: {},
}));

app.use('/graphiql', graphiqlConnect({
  endpointURL: '/graphql',
}));

app.listen(PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${PORT}/graphql`
));
