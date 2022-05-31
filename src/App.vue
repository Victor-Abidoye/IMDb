<template>
  <div>
    <SearchMovie
      :modelValue="searchMovieName"
      @update:modelValue="searching"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import SearchMovie from './components/SearchMovie.vue'

//DEFINING VARIABLES
const searchMovieName = ref('')

const searching = (searchText) => {
  searchMovieName.value = searchText
}
</script>

<style lang="scss" scoped>
div {
  --black: #121212;
  --black-fade: #252525;
  padding: 10px 30px;
  background-color: var(--black);
}
</style>
