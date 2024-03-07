<script setup lang="ts">
const props = defineProps(['title']);
</script>

<template>
  <div class="is-flex is-justify-content-space-between is-align-items-center p-2">
    <h2 class="is-size-2">{{ props.title }}</h2>
    <div class="options">
      <slot />
    </div>
  </div>
</template>

<style scoped>
</style>