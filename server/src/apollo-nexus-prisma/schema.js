import {
  arg,
  asNexusMethod,
  enumType,
  inputObjectType,
  intArg,
  interfaceType,
  list,
  makeSchema,
  nonNull,
  objectType,
  queryType,
  stringArg,
} from 'nexus';

import { GraphQLDateTime } from 'graphql-iso-date';

import path from 'path';

const DateTime = asNexusMethod(GraphQLDateTime, 'date');

const schema = makeSchema({
  types: [
    // Query,
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
