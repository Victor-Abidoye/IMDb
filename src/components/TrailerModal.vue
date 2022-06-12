<template>
  <div class="modal" style="" @click.self="$emit('changeModalMode')">
    <iframe
      v-if="source"
      width="560"
      height="315"
      :src="source"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'

const emits = defineEmits(['changeModalMode'])
const props = defineProps({
  modalMovie: Object,
})

const source = ref({})

onBeforeMount(() => {
  let reqVid = props.modalMovie.videos.results.find((vid) => {
    return vid.type == 'Trailer'
  })

  if (!reqVid) {
    if (props.modalMovie.videos.results.length > 0) {
      console.log(props.modalMovie.videos.results[0])
      reqVid = props.modalMovie.videos.results[0]
    } else {
      emits('changeModalMode')
      return
    }
  }
  console.log(reqVid)

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
}
</style>
