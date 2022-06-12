<template>
  <div class="modal" style="" @click.self="$emit('changeModalMode')">
    <iframe
      v-if="source && !noTrailer"
      width="560"
      height="315"
      :src="source"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
    <p v-if="noTrailer">
      Sorry. There is no Trailer available for this video ! <br /><br />
      <span> click backdrop to close</span>
    </p>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'

const emits = defineEmits(['changeModalMode'])
const props = defineProps({
  modalMovie: Object,
})

const source = ref({})
const noTrailer = ref(false)

onBeforeMount(() => {
  let reqVid = props.modalMovie.videos.results.find((vid) => {
    return vid.type == 'Trailer'
  })

  if (!reqVid) {
    if (props.modalMovie.videos.results.length > 0) {
      reqVid = props.modalMovie.videos.results[0]
    } else {
      noTrailer.value = true
      return
    }
  }
  const link = 'https://www.youtube.com/embed/' + reqVid.key
  source.value = link
})
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 30;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    color: white;
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    span {
      color: red;
    }
  }
}
iframe {
  height: 60%;
  width: 80%;
}
@media only screen and (max-width: 800px) {
  iframe {
    width: 560px;
    height: 315px;
  }
  p {
    width: 90%;
  }
}
</style>
