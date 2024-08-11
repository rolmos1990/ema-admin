import { PrismaClient } from '@prisma/client';
import fs from 'fs';
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
    const user = getCookie(event, 'ema_user');
    console.log(user);
    if(!user) throw createError({
        statusCode: 401,
        message: 'Inicie sesión',
    });

    const body = await readBody(event);
    const comentario = body.comentario;
    const nombre = body.nombre;

    const video = body.video.split('base64,')[1];
    const audio = body.audio.split('base64,')[1];
    const foto = body.foto.split('base64,')[1];

    const createdTestimonio = await prisma.testimonios.create({
        data: {
            nombre: nombre,
            comentario: comentario,
            video: !!video,
            audio: !!audio,
            foto: !!foto,
        }
    });

    const { id } = createdTestimonio;

    if (!!video) {
        fs.writeFileSync(`${process.env.TESTIMONIOS_DIR}/${id}_video.mp4`, video, {
            encoding: 'base64'
        });
    }

    if (!!audio) {
        fs.writeFileSync(`${process.env.TESTIMONIOS_DIR}/${id}_audio.ogg`, audio, {
            encoding: 'base64'
        });
    }

    if (!!foto) {
        fs.writeFileSync(`${process.env.TESTIMONIOS_DIR}/${id}_foto.mp4`, foto, {
            encoding: 'base64'
        });
    }

    return createdTestimonio;
});
