import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
    if(!getCookie(event, 'ema_user')) throw createError({
        statusCode: 401,
        message: 'Inicie sesión',
    });
    return prisma.testimonios.findMany({
        where: {
        }
    });
});
