import { ApolloServer } from 'apollo-server-express';
import schema from './apollo-nexus-prisma/schema.js';
import context from './apollo-nexus-prisma/context.js';

const server = new ApolloServer({ schema, context });
await server.start();

export default function applyMiddleware(app) {
  server.applyMiddleware({ app });
}
