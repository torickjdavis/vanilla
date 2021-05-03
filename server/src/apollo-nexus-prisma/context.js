import prisma from '@prisma/client';
const { PrismaClient } = prisma;

const context = { prisma: new PrismaClient() };

export default context;
