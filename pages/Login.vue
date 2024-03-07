<script setup lang="ts">
import {useNotifications} from "~/stores/notification";

definePageMeta({
  layout: 'login'
});
const router = useRouter();
const password = ref('');
const notifications = useNotifications();
const {data, status, error, refresh} = await useFetch('/api/login', {
  method: 'POST',
  body: {password},
  immediate: false,
  watch: false,
  onResponse({response}){
    if(response.status === 204)
      router.push({path: '/videos'});
  },
  onResponseError({response}){
    notifications.push(response._data.statusMessage, 'danger');
  }
});
function login(){
  refresh();
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
        <button type="submit" class="button is-success" :class="{'is-loading': status === 'pending'}">
          Login
        </button>
      </p>
    </div>
  </form>
</template>

<style>

</style>
