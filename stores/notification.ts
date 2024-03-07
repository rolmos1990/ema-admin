export const useNotifications = defineStore('notifications', () => {
    const stack = ref<{id: number, message: string; level?: string}[]>([]);
    function push(message: string, level?: string){
        const id = (new Date()).getTime();
        stack.value.push({id, message, level});
        setTimeout(() => remove(id), 5000);
    }
    function remove(id: number){
        const i = stack.value.findIndex(n => n.id === id);
        stack.value.splice(i, 1);
    }

    return {stack, push, remove};
})