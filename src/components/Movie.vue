<template>
  <div class="card">
    <div
      class="movieImg"
      @click="$emit('show-modal', movie.id)"
      @keyup.enter="$emit('show-modal', movie.id)"
      tabindex="0"
    >
      <img
        :src="img_path + movie.poster_path"
        :alt="movie.title + ' movie poster'"
      />
      <div>
        <p><i class="icofont-play" style="color: white"></i></p>
        <p>Watch Trailer</p>
      </div>
    </div>
    <p class="title">
      {{ movie.title }}
      <span v-if="movie.release_date">
        ({{ movie.release_date.slice(0, 4) }})</span
      >
    </p>
    <p class="genre" v-if="genreStore">{{ genreStore.join(', ') }}</p>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onBeforeMount } from 'vue'
const emits = defineEmits(['show-modal'])

const props = defineProps({
  movie: Object,
  genresList: Object,
})

const img_path = ref('https://image.tmdb.org/t/p/w500')
const genreStore = ref([])

// //UPDATE THE GENRE STORE ARRAY WITH THE LIST OF THE CORRESPONDING MOVIE GENRE
const getGenre = () => {
  console.log(props.genresList, props.movie)
  const newStore = []
  for (let i = 0; i < props.movie.genre_ids.length; i++) {
    const store = props.genresList.genres.find((genre) => {
      return genre.id == props.movie.genre_ids[i]
    })
    newStore.push(store.name)
  }
  genreStore.value = newStore
}

onBeforeMount(() => {
  getGenre()
})
</script>

<style lang="scss" scoped>
.card {
  height: 400px;
  .movieImg {
    height: 85%;
    position: relative;
    &:hover div {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 10px;
    }
    div {
      display: none;
      p:first-child {
        font-size: 45px;
      }
      p:nth-child(2) {
        color: white;
        font-size: 16px;
      }
    }
    img {
      border-radius: 10px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .title {
    font-weight: 700;
    font-size: medium;
    color: #c9c9c9;
    margin: 10px 0px;
    span {
      color: gray;
      font-size: initial;
    }
  }
  .genre {
    color: #8d8d8d;
    font-size: small;
  }
}
</style>
