<template>
  <!-- HERO MOVIE -->
  <Hero v-if="movies.length && isSearching" :movie="movies[0]" />

  <!-- SHOW MOVIES OR SKELETON DEPENDING ON SEARCH STATE -->
  <section class="container">
    <Movie
      v-for="movie in isSearching ? movies.slice(1) : movies"
      :key="movie.id"
      :movie="movie"
      v-if="movies.length"
      @show-modal="showModal"
    />
    <MovieSkeleton v-else v-for="i in 20" :key="i" />
    <TrailerModal
      v-if="isModal && modalMovie"
      :modalMovie="modalMovie"
      @changeModalMode="changeModal"
    />
  </section>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

import Movie from './Movie.vue'
import MovieSkeleton from './MovieSkeleton.vue'
import Hero from './Hero.vue'
import TrailerModal from './TrailerModal.vue'

const props = defineProps({
  movies: Array,
  isSearching: Boolean,
})

const isModal = ref(false)
const modalMovie = ref(null)

// HIDES MODAL VIDEO PLAYER ON CLICK OD MODAL BACKGROUND
const changeModal = () => {
  isModal.value = false
  modalMovie.value = null
}

//FETCH FULL DETAILS FOR THE MOVIES WITH PROVIDED ID
const fetchModalMovie = async (id) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=31289f83960f7c207e2f791440bf0796&append_to_response=videos`
  )
  return data
}

// SHOWS THE CORRESPONDING MODAL FOR THE SELECTED MOIVIE CARD
const showModal = async (id) => {
  isModal.value = true
  modalMovie.value = await fetchModalMovie(id)
}
</script>

<style lang="scss" scoped>
#hero {
  height: 400px;
  width: 100%;
  display: flex;
  margin: 30px 0px;
  .main {
    width: 60%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .details {
    padding: 2%;
    width: 40%;
    background-color: var(--black-fade);
    .headers {
      display: flex;
      gap: 10px;
      img {
        width: 80px;
      }
      div {
        p:first-child {
          color: white;
          font-weight: bold;
        }
        p:nth-child(2) {
          color: grey;
          font-size: small;
        }
      }
    }
    .overview {
      p:first-child {
        color: gray;
        padding: 5px 0px;
      }
      p:nth-child(2) {
        color: white;
        font-size: small;
        line-height: 20px;
      }
    }
  }
}

@media only screen and (max-width: 800px) {
  #hero {
    flex-direction: column;
    height: 500px;
    .main {
      height: 40%;
      width: 100%;
    }
    .details {
      height: 60%;
      width: 100%;
      img {
        width: 75px;
      }
    }
  }
}
</style>
