<template>
  <NuxtPage />
</template>

<script setup lang="ts">
</script>

<style>
.preview {
  @apply relative  mt-4 rounded;


  .copy-to-clipboard {
    @apply absolute right-0 top-0 p-4 bg-gray-300 rounded cursor-pointer transition select-none;

    &:hover {
      @apply bg-gray-400;
    }
  }

  pre {
    max-height: 200px;
    @apply p-4 bg-gray-200 overflow-auto rounded;
  }
}
</style>