<script setup lang="ts">
import {useNotifications} from "~/stores/notification";

definePageMeta({
  layout: 'login'
});
const router = useRouter();
const password = ref('');
const notifications = useNotifications();
const loggingIn = ref(false);
useFetch('/api/login', {
  method: 'delete'
});

async function login(){
  loggingIn.value = true;
  await $fetch('/api/login', {
    method: 'post',
    body: { password: password.value },
    async onResponse({response}){
      if(response.status === 204) await router.push({path: '/videos'});
      if(response.status === 401) notifications.push(response._data.message, 'danger');
      loggingIn.value = false;
    }
  });
}
</script>

<template>
  <form class="p-2" @submit.prevent="login">
    <div class="field">
      <div class="control">
        <input class="input" type="password" placeholder="Password" v-model="password">
      </div>
    </div>
    <div class="field">
      <p class="control has-text-centered">
        <button type="submit" class="button is-success" :class="{'is-loading': loggingIn}">
          Login
        </button>
      </p>
    </div>
  </form>
</template>

<style>

</style>
