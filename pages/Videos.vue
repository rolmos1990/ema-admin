<script setup lang="ts">
import {VideoModalData} from "~/utils/VideoModalData";

const router = useRouter();
const videoModalData = ref<VideoModalData | null>(null);
const fileLoader = useFileLoader();
const notifications = useNotifications();
const uploading = ref(false);
const {data: videos, refresh: getVideos, error} = useFetch('/api/videos');

watch(error, async (n) => {
  if(n?.statusCode === 401) await router.push('/login');
})
function showModal(){
  videoModalData.value = new VideoModalData();
}

async function loadVideo(event: any){
  if(videoModalData.value) videoModalData.value.video = '';
  const data = await fileLoader.getDataURL(event.target.files[0]);
  if(videoModalData.value !== null) videoModalData.value.video = data;
}

async function uploadVideo(){
  try {
    uploading.value = true;
    await $fetch('/api/videos', {
      method: 'post',
      body: {
        codigo: videoModalData.value?.codigo,
        video: videoModalData.value?.video
      }
    });
    videoModalData.value = null;
    await getVideos();
  } catch (e: any) {
    notifications.push(e.message, 'danger');
  } finally {
    uploading.value = false;
  }
}

function removeDeletedVideo(codigo: string){
  console.log('remove', codigo);
  if(videos.value) videos.value = videos.value.filter(v => v.codigo !== codigo);
}
</script>

<template>
  <PageTitle title="Videos">
    <button class="button is-light" aria-label="more options" @click="showModal">
        <span class="icon is-medium">
          <i class="mdi mdi-24px mdi-plus" aria-hidden="true"></i>
        </span>
    </button>
  </PageTitle>
  <ul class="columns is-mobile is-multiline">
    <VideoListItem v-for="v in videos" :key="v" :product="v" @videoDeleted="removeDeletedVideo(v.codigo)"></VideoListItem>
  </ul>
  <div class="modal is-active" v-if="!!videoModalData">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Subir video</p>
        <button class="delete" aria-label="close" @click="videoModalData = null"></button>
      </header>
      <section class="modal-card-body">
        <form class="columns">
          <div class="field column is-half">
            <label class="label">Código</label>
            <div class="control">
              <input class="input" type="text" v-model="videoModalData!.codigo">
            </div>
          </div>
          <div class="file column is-half">
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
        </form>
        <div class="video-preview">
          <video controls v-if="videoModalData.video">
            <source type="video/mp4" :src="videoModalData.video">
          </video>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success"
                :disabled="!videoModalData.codigo || !videoModalData.video"
                :class="{'is-loading': uploading}"
                @click="uploadVideo">Subir</button>
        <button class="button" @click="videoModalData = null">Cancelar</button>
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
