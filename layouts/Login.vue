<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue'
</script>

<template>
  <main>
    <div class="login-box">
      <AppLogo></AppLogo>
      <slot />
    </div>
  </main>

</template>

<style scoped>
main{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-box{
    width: 300px;
    height: fit-content;
    border: var(--color-border) 1px solid;
    border-radius: 5px;
  }
}
</style>