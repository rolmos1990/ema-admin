<script setup lang="ts">
import {TestimonioModalData} from "~/utils/TestimonioModalData";
import TestimonioListItem from "~/components/TestimonioListItem.vue";

const testimonioModalData = ref<TestimonioModalData | null>(null);
const fileLoader = useFileLoader();
const notifications = useNotifications();
const uploading = ref(false);
const videos = ref([]);

async function getVideos(){
  await $fetch('/api/testimonios', {
    async onResponse({response}){
      if(response.status === 200) {
        videos.value = response._data;
      }
      if(response.status === 401) {
        notifications.push(response._data.message, 'danger');
        await navigateTo('/login');
      }
    }
  });
}

function showModal(){
  testimonioModalData.value = new TestimonioModalData();
}

async function loadVideo(event: any){
  if(testimonioModalData.value) testimonioModalData.value.video = '';
  const data = await fileLoader.getDataURL(event.target.files[0]);
  if(testimonioModalData.value !== null) testimonioModalData.value.video = data;
}

async function loadAudio(event: any){
  if(testimonioModalData.value) testimonioModalData.value.audio = '';
  const data = await fileLoader.getDataURL(event.target.files[0]);
  if(testimonioModalData.value !== null) testimonioModalData.value.audio = data;
}

async function loadFoto(event: any){
  if(testimonioModalData.value) testimonioModalData.value.foto = '';
  const data = await fileLoader.getDataURL(event.target.files[0]);
  if(testimonioModalData.value !== null) testimonioModalData.value.foto = data;
}

async function uploadVideo(){
  uploading.value = true;
  await $fetch('/api/testimonios', {
    method: 'post',
    body: {
      nombre: testimonioModalData.value?.nombre,
      video: testimonioModalData.value?.video,
      audio: testimonioModalData.value?.audio,
      foto: testimonioModalData.value?.foto,
      comentario: testimonioModalData.value?.comentario,
    },
    async onResponse({response}){
      if(response.status !== 200){
        notifications.push(response._data.message, 'danger');
      }else{
        testimonioModalData.value = null;
        await getVideos();
      }
      uploading.value = false;
    }
  });
}

function removeDeletedVideo(codigo: string){
  console.log('remove', codigo);
  if(videos.value) videos.value = videos.value.filter(v => v.id !== codigo);
}

onMounted(async () => {
  await getVideos();
});
</script>

<template>
  <PageTitle title="Testimonios">
    <button class="button is-light" aria-label="more options" @click="showModal">
        <span class="icon is-medium">
          <i class="mdi mdi-24px mdi-plus" aria-hidden="true"></i>
        </span>
    </button>
  </PageTitle>
  <ul class="columns is-mobile is-multiline">
    <TestimonioListItem v-for="v in videos" :key="v" :product="v" @videoDeleted="removeDeletedVideo(v.id)"></TestimonioListItem>
  </ul>
  <div class="modal is-active" v-if="!!testimonioModalData">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Subir Testimonio</p>
        <button class="delete" aria-label="close" @click="testimonioModalData = null"></button>
      </header>
      <section class="modal-card-body">
        <form class="">

          <div class="field column is-full">
            <label class="label">Nombre</label>
            <div class="control">
              <input class="input" type="text" v-model="testimonioModalData!.nombre">
            </div>
          </div>
          <div class="file column">
            <label class="label">Archivo</label>
            <label class="file-label">
              <input class="file-input" type="file" name="resume" accept=".mp4" @change="loadVideo">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="mdi mdi-24px mdi-file-video-outline"></i>
                </span>
                <span class="file-label">
                  Archivo (mp4)
                </span>
              </span>
            </label>
          </div>


          <div class="file column">
            <label class="label">Archivo de Audio</label>
            <label class="file-label">
              <input class="file-input" type="file" name="audio" accept=".ogg" @change="loadAudio">
              <span class="file-cta">
              <span class="file-icon">
                <i class="mdi mdi-24px mdi-file-music-outline"></i>
              </span>
              <span class="file-label">
                Archivo (ogg)
              </span>
            </span>
            </label>
          </div>

          <div class="file column">
            <label class="label">Archivo de Foto</label>
            <label class="file-label">
              <input class="file-input" type="file" name="audio" accept=".jpg" @change="loadFoto">
              <span class="file-cta">
              <span class="file-icon">
                <i class="mdi mdi-24px mdi-file-music-outline"></i>
              </span>
              <span class="file-label">
                Archivo (jpg)
              </span>
            </span>
            </label>
          </div>

          <div class="field column is-full">
            <label class="label">Testimonio</label>
            <div class="control">
              <textarea class="textarea" v-model="testimonioModalData.comentario"></textarea>
            </div>
          </div>


        </form>

        <hr />
        <h3>Video Preview </h3>
        <div class="video-preview" v-if="testimonioModalData.video">
          <video controls>
            <source type="video/mp4" :src="testimonioModalData.video">
            Your browser does not support the video tag.
          </video>
        </div>
        <hr />
        <h2>Foto Preview </h2>
        <div class="foto-preview" v-if="testimonioModalData.foto">
          <img :src="testimonioModalData.foto" alt="Foto Preview" />
        </div>
        <hr />
        <h2>Audio Preview </h2>
        <div class="audio-preview" v-if="testimonioModalData.audio">
          <audio controls>
            <source type="audio/ogg" :src="testimonioModalData.audio">
            Your browser does not support the audio element.
          </audio>
        </div>


      </section>
      <footer class="modal-card-foot">
        <button class="button is-success"
                :disabled="!testimonioModalData.nombre && !testimonioModalData.video && !testimonioModalData.audio && !testimonioModalData.foto && !testimonioModalData.comentario"
                :class="{'is-loading': uploading}"
                @click="uploadVideo">Subir</button>
        <button class="button" @click="testimonioModalData = null">Cancelar</button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.video-preview{
  display: flex;
  justify-content: center;
  height: 500px;
}
</style>
