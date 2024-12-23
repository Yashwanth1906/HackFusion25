import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () =>{
    return new PrismaClient();
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalPrisma = globalThis as unknown as {
    prisma : PrismaClientSingleton | undefined;
}

const prisma = globalPrisma.prisma ?? prismaClientSingleton();

export {prisma};
