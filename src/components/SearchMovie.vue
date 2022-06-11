<template>
  <div>
    <input
      tabindex="0"
      type="search"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Search"
    />
  </div>
</template>

<script setup>
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: String,
})
</script>

<style lang="scss" scoped>
div {
  display: grid;
  grid-template-columns: minmax(300px, 6fr) 4fr;
  margin: 20px 0px;
  input {
    background-color: var(--black-fade);
    border-radius: 5px;
    height: 40px;
    color: white;
    padding: 3px 10px;
    outline: none;
    border: none;
    letter-spacing: 0.1em;
  }
}

@media only screen and (max-width: 800px) {
  input {
    grid-column: 1 / -1;
  }
}
</style>
