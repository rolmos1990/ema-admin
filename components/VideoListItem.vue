<script setup lang="ts">
import { ref } from 'vue'

const {product} = defineProps(['product']);
const emit = defineEmits(['videoDeleted'])
const deletingVideo = ref(false);
const play = ref(false);
const notifications = useNotifications();

async function deleteVideo(codigo: string){
  try {
    deletingVideo.value = true;
    await $fetch(`/api/videos/${product.codigo}`, {
      method: 'delete'
    });
    emit('videoDeleted');
  } catch (e: any) {
    console.log(e);
    notifications.push(e.statusMessage, 'danger');
  } finally {
    deletingVideo.value = false;
  }
}
</script>

<template>
  <li class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen">
    <div class="card m-2">
      <header class="card-header is-flex is-align-items-center pl-4 pr-2 py-2">
        <p class="card-header-title p-0">
          {{ product.codigo }}
        </p>
        <button class="button is-white"
                aria-label="more options"
                @click="play = !play">
            <span class="icon is-medium">
              <i class="mdi mdi-24px mdi-play" aria-hidden="true" v-if="!play"></i>
              <i class="mdi mdi-24px mdi-stop" aria-hidden="true" v-else></i>
            </span>
        </button>
        <button class="button is-white"
                aria-label="more options"
                @click="deleteVideo(product.codigo)"
                :class="{'is-loading': deletingVideo}">
            <span class="icon is-medium">
              <i class="mdi mdi-24px mdi-trash-can" aria-hidden="true"></i>
            </span>
        </button>
      </header>
      <div class="card-image">
        <img :src="`https://www.emamodas.com/catalogo/${product.id_categoria}/${product.codigo}_2_800.jpg`"
             :alt="product.codigo"
             v-if="!play" />
        <video autoplay @ended="play = false" v-else>
          <source type="video/mp4"
                  :src="`https://www.emamodas.com/video/${product.codigo}.mp4`" />
        </video>
      </div>
    </div>
  </li>
</template>

<style scoped>
.card-image{
  aspect-ratio: 3 / 4;
  overflow: hidden;
  display: flex;
  justify-content: center;
  background-color: black;

  img{
    width: 100%;
  }
  video{
    height: 100%;
  }
}
</style>