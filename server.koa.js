import koa from 'koa';
import koaRouter from 'koa-router';
import koaBody from 'koa-bodyparser';
import { apolloKoa, graphiqlKoa } from 'apollo-server';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import Schema from './data/schema';
import Mocks from './data/mocks';
import Resolvers from './data/resolvers';


const PORT = 8080;
const app = new koa();
const router = new koaRouter();

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
});

/*addMockFunctionsToSchema({
  schema: executableSchema,
  mocks: Mocks,
  preserveResolvers: false,
});*/

app.use(koaBody());

router.get('/graphiql', graphiqlKoa({
  endpointURL: '/graphql',
}));

router.post('/graphql', apolloKoa({
  schema: executableSchema,
  context: {},
}));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => console.log(
  `GraphQL Server is now running on http://localhost:${PORT}/graphql`
));
