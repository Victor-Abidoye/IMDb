<template>
  <div id="hero">
    <!-- MAIN POSTER AND TRAILER HERO CONTENT -->
    <div class="main" @click="showModal" tabindex="0" @keyup.enter="showModal">
      <img
        :src="'https://image.tmdb.org/t/p/w500' + movie.backdrop_path"
        alt=""
        v-if="!modalMovie"
      />
      <iframe
        v-if="modalMovie"
        width="560"
        height="315"
        :src="source"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div ref="blurrer">
        <p><i class="icofont-play" style="color: white"></i></p>
        <p>Watch Trailer</p>
      </div>
    </div>

    <!-- DETAILS ON HERO CONTENT TRAILER -->
    <div class="details">
      <div class="headers">
        <img
          :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
          alt=""
        />
        <div>
          <p>
            {{ movie.original_title }}
            <span>({{ movie.release_date.slice(0, 4) }})</span>
          </p>
          <p>{{ genreStore.join(', ') }}</p>
        </div>
      </div>
      <div class="overview">
        <p>#Triller 1</p>
        <p>{{ movie['overview'] }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'

import { ref, onBeforeMount } from 'vue'

const props = defineProps({
  movie: Object,
})

const blurrer = ref(null)
const source = ref('')
const genresList = ref(null)
const genreStore = ref([])
const modalMovie = ref(null)

//FETCH GENRE NAMES WITH CORRESPONDING IDS
const fetchGenre = async () => {
  const { data } = await axios.get(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=31289f83960f7c207e2f791440bf0796&language=en-US'
  )
  genresList.value = data
  getGenre()
}

//UPDATES AN ARRAY WITH THE LIST OF GENRE CORRESPONDING TO THE MOVIE
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

//UPDATE modalMovie WITH THE FULL DETAILS OF THE HERO MOVIE
const playVid = async () => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${props.movie.id}?api_key=31289f83960f7c207e2f791440bf0796&append_to_response=videos`
  )
  return data
}

//ON CLICK OF THE HERO IMAGE REPLACE IMAGE ELEMENT WITH VIEDEO AND AUTOPLAY
const showModal = async () => {
  blurrer.value.remove()
  modalMovie.value = await playVid()
  const reqVid = modalMovie.value.videos.results.find((vid) => {
    return vid.type == 'Trailer'
  })
  source.value = 'https://www.youtube.com/embed/' + reqVid.key + '?autoplay=1'
}

onBeforeMount(() => {
  fetchGenre()
})
</script>

<style lang="scss" scoped>
#hero {
  height: 400px;
  width: 100%;
  display: flex;
  margin: 30px 0px;
  .main {
    width: 60%;
    position: relative;
    &:hover div {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      gap: 10px;
    }
    iframe {
      width: 100%;
      height: 100%;
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
    // border: 1px solid red;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .details {
    padding: 5%;
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
          padding: 8px 0;
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
    // border: 1px solid blue;
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
