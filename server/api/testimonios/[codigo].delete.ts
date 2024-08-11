import { PrismaClient } from '@prisma/client';
import fs from "fs";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
    if(!getCookie(event, 'ema_user')) throw createError({
        statusCode: 401,
        message: 'Inicie sesión',
    });
    const codigo = (await getRouterParam(event, 'codigo'));
    if(!codigo) throw createError({
        statusCode: 400,
        message: 'Codigo Inválido',
    });
    try {
        fs.unlinkSync(`${process.env.TESTIMONIOS_DIR}/${codigo}_foto.mp4`);
        fs.unlinkSync(`${process.env.TESTIMONIOS_DIR}/${codigo}_video.mp4`);
        fs.unlinkSync(`${process.env.TESTIMONIOS_DIR}/${codigo}_audio.mp4`);
    } catch (e) {
        console.log(`${codigo} not found`);
    }
    return prisma.testimonios.delete({
        where: {
            id: Number(codigo)
        }
    });
});
