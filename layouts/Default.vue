<script setup lang="ts">

</script>

<template>
  <header>
    <nav class="navbar has-background-white-ter" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <AppLogo size="small" class="px-2"></AppLogo>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <NuxtLink to="/videos" class="navbar-item">
            Videos
          </NuxtLink>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <NuxtLink to="/login" class="button is-light">
                Cerrar sesión
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <main class="p-2">
    <slot />
  </main>
</template>

<style scoped>

</style>