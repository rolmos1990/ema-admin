import { PrismaClient } from '@prisma/client';
import fs from "fs";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
    if(!getCookie(event, 'ema_user')) throw createError({
        statusCode: 401,
        message: 'Inicie sesión',
    });
    const codigo = (await getRouterParam(event, 'codigo'))?.toUpperCase();
    if(!codigo) throw createError({
        statusCode: 400,
        message: 'Codigo Inválido',
    });
    try {
        fs.unlinkSync(`${process.env.VIDEO_DIR}/${codigo}.mp4`);
    } catch (e) {
        console.log(`${codigo} not found`);
    }
    return prisma.producto.update({
        where: {
            codigo: codigo.toUpperCase()
        },
        data: {
            video: false
        }
    });
});