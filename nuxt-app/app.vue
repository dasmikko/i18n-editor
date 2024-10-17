<template>
  <div class="container mx-auto pt-4">
    <Toolbar class="mb-4 py-2">
      <template #start>
        <img
          src="assets/logo.svg"
          class="mr-2 aspect-square w-10"
        >
        <Button
          icon="pi pi-globe"
          class="mr-2"
          label="Load files"
          link
          outlined
          severity="secondary"
          @click="langsComposable.selectFiles"
        />
        <Button
          icon="pi pi-save"
          class="mr-2"
          label="Save (CTRL+S)"
          link
          outlined
          severity="secondary"
        />
        <Button
          icon="pi pi-wrench"
          class="mr-2"
          label="Settings"
          link
          outlined
          severity="secondary"
        />
        <Button
          icon="pi pi-info-circle"
          class="mr-2"
          label="About"
          link
          outlined
          severity="secondary"
        />
      </template>
    </Toolbar>

    <NuxtPage />
  </div>
</template>

<script setup>
import 'primeicons/primeicons.css'
import Toolbar from "primevue/toolbar";

const langsComposable = useLangs()

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
