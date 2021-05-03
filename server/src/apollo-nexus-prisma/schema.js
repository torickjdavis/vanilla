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
  // queryType,
  stringArg,
} from 'nexus';

import GraphQLISODateTime from 'graphql-iso-date';
const { GraphQLDateTime } = GraphQLISODateTime;

import path from 'path';

const DateTime = asNexusMethod(GraphQLDateTime, 'date');

const RecipeBookmarks = objectType({
  name: 'RecipeBookmarks',
  definition(t) {
    t.nonNull.int('id', {
      description: 'Unique resource identifier.',
    });
    t.nonNull.string('creator', {
      description: 'MongoDB User ID who created the resource.',
    });
    t.nonNull.field('createdAt', {
      type: DateTime,
      description: 'ISO DateTime the resource was originally created.',
    });
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
      description: 'ISO DateTime the resource was last updated.',
    });
    t.nonNull.string('name', {
      description: '',
    });
    t.nonNull.list.nonNull.field('urls', {
      type: 'String',
      description: '',
      async resolve(parent, _args, context, _info) {
        return parent.urls;
      },
    });
  },
});

const PaginatedMetadata = objectType({
  name: 'PaginatedMetadata',
  definition(t) {
    t.int('page');
    t.int('pages');
    t.int('limit');
    t.int('count');
  },
});

const PaginatedRecipeBookmarks = objectType({
  name: 'PaginatedRecipeBookmarks',
  definition(t) {
    t.nonNull.list.field('recipeBookmarks', { type: RecipeBookmarks });
    t.field('meta', { type: PaginatedMetadata });
  },
});

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
      resolve(_parent, args, _context, _info) {
        return `Hello, ${args.name}!`;
      },
    });

    t.nonNull.list.nonNull.field('listRecipeBookmarks', {
      type: RecipeBookmarks,
      async resolve(_parent, _args, context, _info) {
        return await context.prisma.recipeBookmarks.findMany();
      },
    });

    t.nonNull.list.nonNull.field('listRecipeBookmarksByCreator', {
      type: RecipeBookmarks,
      args: {
        creator: nonNull(stringArg()),
      },
      async resolve(_parent, args, context, _info) {
        return await context.prisma.recipeBookmarks.findMany({
          where: { creator: args.creator },
        });
      },
    });

    t.nonNull.field('paginateRecipeBookmarks', {
      type: PaginatedRecipeBookmarks,
      args: {
        page: nonNull(intArg({ default: 1 })),
        limit: nonNull(intArg({ default: 10 })),
      },
      async resolve(_parent, args, context, _info) {
        const { page, limit } = args;
        const count = await context.prisma.recipeBookmarks.count();
        return {
          recipeBookmarks: await context.prisma.recipeBookmarks.findMany({
            skip: limit * Math.max(page - 1, 0), // no lower than the first page (0)
            take: limit,
          }),
          meta: {
            page,
            pages: Math.ceil(count / limit),
            limit,
            count,
          },
        };
      },
    });

    t.nonNull.field('recipeBookmarksById', {
      type: RecipeBookmarks,
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_parent, args, context, _info) {
        return await context.prisma.recipeBookmarks.findUnique({
          where: { id: args.id },
        });
      },
    });
  },
});

const RecipeBookmarksDataInput = inputObjectType({
  name: 'RecipeBookmarksDataInput',
  definition(t) {
    t.nonNull.string('creator');
    t.nonNull.string('name');
    t.nonNull.string('creator');
    t.nonNull.list.nonNull.field('urls', { type: 'String' });
  },
});

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.field('createRecipeBookmarks', {
      type: RecipeBookmarks,
      args: {
        data: nonNull(
          arg({
            type: RecipeBookmarksDataInput,
          })
        ),
      },
      async resolve(_parent, args, context, _info) {
        return await context.prisma.recipeBookmarks.create({
          data: args.data,
        });
      },
    });

    t.field('updateRecipeBookmarks', {
      type: RecipeBookmarks,
      args: {
        id: nonNull(intArg()),
        data: nonNull(
          arg({
            type: RecipeBookmarksDataInput,
          })
        ),
      },
      async resolve(_parent, args, context, _info) {
        return await context.prisma.recipeBookmarks.update({
          where: { id: args.id },
          data: args.data,
        });
      },
    });

    t.field('removeRecipeBookmarksById', {
      type: RecipeBookmarks,
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_parent, args, context, _info) {
        return await context.prisma.recipeBookmarks.delete({
          where: { id: args.id },
        });
      },
    });
  },
});

const schema = makeSchema({
  types: [
    Query,
    Mutation,
    RecipeBookmarks,
    PaginatedRecipeBookmarks,
    RecipeBookmarksDataInput,
    PaginatedMetadata,
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
