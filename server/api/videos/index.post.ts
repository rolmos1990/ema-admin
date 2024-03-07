import { PrismaClient } from '@prisma/client';
import fs from 'fs';
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const codigo = body.codigo.toUpperCase();
    const video = body.video.split('base64,')[1];
    const producto = await prisma.producto.findFirst({
        where: {codigo}
    });
    if(!producto) throw createError({
        statusCode: 404,
        statusMessage: `${codigo} no encontrado`,
    });
    fs.writeFileSync(`${process.env.VIDEO_DIR}/${codigo}.mp4`, video, {
        encoding: 'base64'
    });
    return prisma.producto.update({
        where: {codigo},
        data: {
            video: true
        }
    });
});