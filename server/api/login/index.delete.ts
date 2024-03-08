export default defineEventHandler(async (event) => {
    deleteCookie(event, 'ema_user');
    return;
});