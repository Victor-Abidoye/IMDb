<template>
  <div>
    <p v-if="networkErr">
      There is a problem with your network connection. <br> <br> Please check your
      internet connection and Retry
    </p>
    <p v-else>
      There is no movie with the name <span>"{{ search }}"</span>
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  search: String,
  networkErr: Boolean,
})
</script>

<style lang="scss" scoped>
p {
  color: red;
  text-align: center;
  padding: 20px 0px;
  span {
    color: gray;
  }
}
</style>
