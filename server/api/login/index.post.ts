export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    if(body.password !== process.env.ADMIN_PASSWORD){
        throw createError({
            statusCode: 401,
            message: 'Contraseña inválida',
        });
    }
    setCookie(event, 'ema_user', 'admin');
    return;
});