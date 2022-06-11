<template>
  <div id="my-app">
    <!-- SEARCH BAR COMPONENT -->
    <SearchMovie :modelValue="searchMovieName" @update:modelValue="searching" />

    <!-- SEARCH TEXT INDICATOR -->
    <p v-if="searchMovieName && !noMovie">
      Search results for <span>"{{ searchMovieName }}"</span>
    </p>

    <!-- SHOW SKELETON WHILE SEARCHING -->
    <div v-if="showSkeleton" class="container">
      <MovieSkeleton v-for="i in 20" />
    </div>
    <div v-else>
      <Error v-if="noMovie" :search="searchMovieName" />
      <Movies v-else :movies="movies" :isSearching="!searchMovieName.length" />
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, watchEffect, watch } from 'vue'

import SearchMovie from './components/SearchMovie.vue'
import Movies from './components/Movies.vue'
import Error from './components/Error.vue'
import MovieSkeleton from './components/MovieSkeleton.vue'

//DEFINING VARIABLES
const searchMovieName = ref('')
const noMovie = ref(false)
const showSkeleton = ref(false)

//UPDATING SEACH MOVIE ON INPUT
const searching = (searchText) => {
  searchMovieName.value = searchText
}

// COMPONENT STORAGE FOR MOVIES IN (movies) COMPONENT
const movies = ref([])

//ENVIRONMENT VARIABLES
const API_key = ref('?api_key=31289f83960f7c207e2f791440bf0796')
const base_URL = ref('https://api.themoviedb.org/3')
const url = ref(
  base_URL.value +
    '/discover/movie' +
    API_key.value +
    '&language=en-US&region=NG&release_date.gte=2018-06-01&release_date.lte=2022-05-05&with_release_type=2|3'
)

let timeout
// UPDATING URL PATH ON INPUT IN SEARCH
watch(searchMovieName, () => {
  //WHEN SEARCH BAR IS EMPTY
  clearTimeout(timeout)
  if (!searchMovieName.value) {
    url.value =
      base_URL.value +
      '/discover/movie' +
      API_key.value +
      '&language=en-US&region=NG&release_date.gte=2018-06-01&release_date.lte=2022-05-05&with_release_type=2|3'
    return
  }

  // DEBOUNCE REQUEST FOR 2 SECONDS
  showSkeleton.value = true
  timeout = setTimeout(() => {
    url.value =
      base_URL.value +
      '/search/movie' +
      API_key.value +
      '&query=' +
      searchMovieName.value.split(' ').join('+')
  }, 1000)
})

// UPDATING MOVIES STORE VARIABLE ON CHANGE OR URL VALUE
watchEffect(() => {
  axios.get(url.value).then((response) => {
    movies.value = response.data.results.filter(
      (vid) => vid.backdrop_path !== null
    )
    console.log(movies.value)
    showSkeleton.value = false
    if (movies.value.length == 0) {
      noMovie.value = true
      return
    }
    noMovie.value = false
  })
})
</script>

<style lang="scss" scoped>
#my-app {
  --black: #121212;
  --black-fade: #252525;
  padding: 30px;
  background-color: var(--black);
  height: 100%;
  p {
    color: white;
    padding-bottom: 10px;
    span {
      color: gray;
    }
  }
}
</style>
