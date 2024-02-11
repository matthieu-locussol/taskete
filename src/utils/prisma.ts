// See: https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices

import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { isDevelopment } from './getEnvironment';

const makePrismaClientSingleton = () => new PrismaClient().$extends(withAccelerate());

type PrismaClientSingleton = ReturnType<typeof makePrismaClientSingleton>;

const extendedGlobalThis = globalThis as unknown as {
   prisma: PrismaClientSingleton | undefined;
};

export const prisma = extendedGlobalThis.prisma ?? makePrismaClientSingleton();

if (isDevelopment()) {
   extendedGlobalThis.prisma = prisma;
}
