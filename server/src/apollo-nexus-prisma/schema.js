import {
  arg,
  asNexusMethod,
  // enumType,
  // extendType,
  inputObjectType,
  intArg,
  // interfaceType,
  // list,
  makeSchema,
  nonNull,
  objectType,
  queryType,
  stringArg,
} from 'nexus';

import { GraphQLDateTime } from 'graphql-iso-date';

import path from 'path';

const DateTime = asNexusMethod(GraphQLDateTime, 'date');

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.string('helloWorld', {
      type: 'String',
      args: {
        name: stringArg({
          default: 'World',
          description: 'The name of who to greet.',
        }),
      },
      description: `The Programmers' Greeting`,
      resolve(_parent, args, context, _info) {
        return `Hello, ${args.name}!`;
      },
    });
  },
});

const schema = makeSchema({
  types: [
    Query,
    // Mutation,
    // RecipeBookmarks,
    // RecipeBookmarksCreateInput,
    DateTime,
  ],
  outputs: {
    schema: path.resolve(path.join('..', 'schema.graphql')),
    typegen: path.resolve(path.join('.', 'generated', 'nexus-types.d.ts')),
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
});

export default schema;
