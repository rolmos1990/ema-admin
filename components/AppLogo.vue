<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps(['size'])

const width = computed(() => props.size === 'small' ? 80 : 120)
</script>

<template>
  <figure class="is-flex is-justify-content-center is-align-items-center">
    <img src="../assets/logo.png" :width="width" alt="logo">
  </figure>
</template>