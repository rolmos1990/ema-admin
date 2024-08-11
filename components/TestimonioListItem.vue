<script setup lang="ts">
import { ref } from 'vue'

const {product} = defineProps({
  product: {
    required: true,
    type: Object as PropType<{id: number, nombre: string; video: boolean, audio: boolean, foto: boolean}>
  }
});
const emit = defineEmits(['videoDeleted'])
const deletingVideo = ref(false);
const play = ref(false);
const playAudio = ref(false);
const notifications = useNotifications();
const url_testimonios = "https://www.emamodas.com/video/";

async function deleteVideo(){
  deletingVideo.value = true;
  await $fetch(`/api/testimonios/${product.id}`, {
    method: 'delete',
    onResponse({response}){
      if(response.status !== 200){
        notifications.push(response._data.message, 'danger');
      }else{
        emit('videoDeleted');
      }
      deletingVideo.value = false;
    }
  });
}
</script>

<template>
  <li class="column is-half-mobile is-one-third-tablet is-one-quarter-desktop is-one-fifth-widescreen">
    <div class="card m-2">
      <header class="card-header is-flex is-align-items-center pl-4 pr-2 py-2">
        <p class="card-header-title p-0">
          {{ product.nombre }}
        </p>
        <button class="button is-white"
                v-if="product.video"
                aria-label="more options"
                @click="play = !play">
            <span class="icon is-medium">
              <i class="mdi mdi-24px mdi-play" aria-hidden="true" v-if="!play"></i>
              <i class="mdi mdi-24px mdi-stop" aria-hidden="true" v-else></i>
            </span>
        </button>
        <button v-if="product.audio" class="button is-primary is-outlined" aria-label="Play/Pause Audio" @click="playAudio = !playAudio">
        <span class="icon is-medium">
          <i class="mdi mdi-24px" :class="playAudio ? 'mdi-stop-circle' : 'mdi-play-circle'" aria-hidden="true"></i>
        </span>
        </button>
        <button class="button is-white"
                aria-label="more options"
                @click="deleteVideo()"
                :class="{'is-loading': deletingVideo}">
            <span class="icon is-medium">
              <i class="mdi mdi-24px mdi-trash-can" aria-hidden="true"></i>
            </span>
        </button>
      </header>
      <div class="card-image">
        <img style="width:286px;height:382px;" :src="`${url_testimonios}/${product.id}_foto.mp4`"
             :alt="product.id"
             v-if="!play" />
        <video autoplay @ended="play = false" v-else>
          <source type="video/mp4"
                  :src="`${url_testimonios}/${product.id}_video.mp4`" />
        </video>
        <audio
            v-if="playAudio"
            controls
            autoplay
            @ended="playAudio = false"
        >
          <source
              type="audio/mp4"
              :src="`${url_testimonios}/${product.id}_audio.mp4`"
          />
          Your browser does not support the audio element.
        </audio>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item has-text-centered">
          <p class="comment-text">
            {{ product.comentario || 'No comment available' }}
          </p>
        </div>
      </footer>
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
.comment-text {
  font-size: 0.875rem; /* Tamaño de letra más pequeño */
  color: #4a4a4a; /* Color gris oscuro */
  text-overflow: ellipsis; /* Muestra los puntos suspensivos */
  overflow: hidden; /* Oculta el texto que desborda */
  white-space: nowrap; /* No permite el salto de línea */
  max-width: 200px; /* Asegura que el texto no se expanda fuera del contenedor */
}
</style>
