<template>
  <div class="card">
    <div class="movieImg" @click="$emit('show-modal', movie.id)">
      <img :src="img_path + movie.poster_path" alt="" />
      <div>
        <p><i class="icofont-play" style="color: white"></i></p>
        <p>Watch Trailer</p>
      </div>
    </div>
    <p class="title">
      {{ movie.title }} <span> ({{ movie.release_date.slice(0, 4) }})</span>
    </p>
    <p class="genre">{{ genreStore.join(', ') }}</p>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onBeforeMount } from 'vue'
const emits = defineEmits(['show-modal'])

const props = defineProps({
  movie: Object,
})

const img_path = ref('https://image.tmdb.org/t/p/w500')
const genresList = ref(null)
const genreStore = ref([])
// const noTrailer = ref(true)

// FETCH LIST OF GENRE API AND THE CORRESPONDING CODE
const fetchGenre = async () => {
  const { data } = await axios.get(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=31289f83960f7c207e2f791440bf0796&language=en-US'
  )
  genresList.value = data
  getGenre()
}

//UPDATE THE GENRE STORE ARRAY WITH THE LIST OF THE CORRESPONDING MOVIE GENRE
const getGenre = () => {
  const newStore = []
  for (let i = 0; i < props.movie.genre_ids.length; i++) {
    const store = genresList.value.genres.find((genre) => {
      return genre.id == props.movie.genre_ids[i]
    })
    newStore.push(store.name)
  }
  genreStore.value = newStore
}

onBeforeMount(() => {
  fetchGenre()
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
