<template>
  <div class="text-center empty d-flex flex-column w-75 m-auto">
      <h4 class="m-5">{{ title ? title : 'No data found' }}</h4>
      <img src="/images/system/undraw_file_searching_duff.svg"/>
      <slot/>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ title: string; }>()
</script>

<style lang="scss" scoped>
  .empty {
      img {
          width: 35%;
          margin: auto;
          margin-bottom: 3rem;
      }
  }
</style>
