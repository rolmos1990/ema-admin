<script setup lang="ts">
import {useNotifications} from "~/stores/notification";

const notifications = useNotifications();
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <ul class="notifications p-2">
    <li v-for="(n, index) in notifications.stack" :key="index">
      <div class="notification is-light m-2" :class="`is-${n.level}`">
        <button class="delete" @click="notifications.remove(n.id)"></button>
        {{ n.message }}
      </div>
    </li>
  </ul>
</template>

<style>
.notifications{
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9999;
}
</style>