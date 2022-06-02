<template>
  <div class="card">
    <div>
      <!-- <img src="../assets/girl-curl.svg" alt="" /> -->
    </div>
    <p class="title"></p>
    <p class="genre"></p>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.card {
  height: 400px;
  //   border: 1px solid red;
  div {
    height: 85%;
    border-radius: 10px;
    background-color: var(--black-fade);
  }
  .title {
    background-color: var(--black-fade);
    margin: 10px 0px;
    width: 70%;
    border-radius: 5px;
    height: 16px;
  }
  .genre {
    background-color: var(--black-fade);
    color: #8d8d8d;
    font-size: small;
    height: 10px;
    width: 60%;
    border-radius: 10px;
  }
}
</style>
