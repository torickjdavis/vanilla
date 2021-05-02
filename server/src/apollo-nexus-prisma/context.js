import prisma from '@prisma/client';
const { PrismaClient } = prisma;

export default {
  context: {
    prisma: new PrismaClient(),
  },
};
