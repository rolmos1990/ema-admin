export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    if(body.password !== 'qwe'){
        throw createError({
            statusCode: 401,
            statusMessage: 'Contraseña inválida',
        })
    }
    return;
});