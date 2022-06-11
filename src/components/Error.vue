<template>
  <div>
    <p>
      There is no movie with the name <span>"{{ search }}"</span>
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  search: String,
})
</script>

<style lang="scss" scoped>
p {
  color: red;
  span {
    color: gray;
  }
}
</style>
