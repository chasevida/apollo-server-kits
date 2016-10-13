# Apollo Server - Express, Connect, Hapi, Koa

A very basic example application using **Apollo Server** for the [Express](http://expressjs.com/), [Connect](), [Hapi]() and [Koa]() frameworks as based on the [Apollo Server docs](https://github.com/apollostack/apollo-server).

The below covers the following:

* GraphQL Tools `makeExecutableScehma`
* Basic Resolvers
* Basic Mocking
* GraphiQL

The `server` files can be found for the respective frameworks in the following:

* [server.express.js](server.express.js)
* [server.connect.js](server.connect.js)
* [server.hapi.js](server.hapi.js)
* [server.koa.js](server.koa.js)

You can run each seperately using the following scripts:

* `npm run server:express`
* `npm run server:connect`
* `npm run server:hapi`
* `npm run server:koa`


## Gotcha's

The following are gotcha's I ran into that aren't clear when working with *Apollo Server*:

* **Koa** - must be version 2 or higher, use `npm i --save koa@2`
* **Koa Router** - must be version 7 or higher, use `npm i --save koa-router@7`
* **Koa Body Parser** - must be version 3 or higher, use `npm i --save koa-bodyparser@3`
* **Hapi** - currently GraphiQL is experiencing issues. It seems to be due to the deep copying of plugin options by Hapi. See this thread for more - [https://github.com/apollostack/apollo-server/issues/158#issuecomment-253649546](https://github.com/apollostack/apollo-server/issues/158#issuecomment-253649546). A temporary workaround is provided in that thread and detailed below.


### Hapi GraphiQL workaround

Passing the `apolloOptions` in as a function instead of plain object will workaroud the GraphiQL issues. See [server.hapi.js](server.hapi.js) for an example.

```
apolloOptions: () => ({
  schema: executableSchema,
  context: {},
}),
```

Follow [apollo-server issue #158](https://github.com/apollostack/apollo-server/issues/158) for more information on this issue and its resolution.




