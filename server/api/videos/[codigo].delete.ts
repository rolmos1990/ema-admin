import { PrismaClient } from '@prisma/client';
import fs from "fs";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
    const codigo = (await getRouterParam(event, 'codigo'))?.toUpperCase();
    if(!codigo) throw createError({
        statusCode: 400,
        statusMessage: 'Codigo Inválido',
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