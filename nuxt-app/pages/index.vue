<template>
  <Splitter
      class="main-splitter"
      style="min-height: 300px; max-height: calc(100vh - 180px);"
      :pt="{
        root: {
          class: 'bg-surface-800'
        }
      }"
  >
    <SplitterPanel
      :size="30"
      class=""
    >
      <LangTreeView/>
    </SplitterPanel>
    <SplitterPanel
      :size="70"
      class="p-4 mb-0 overflow-y-auto"
    >
      <ObjectKeysViewer />
    </SplitterPanel>
  </Splitter>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import InputText from 'primevue/inputtext';
import Divider from 'primevue/divider';

const langsComposable = useLangs()
const router = useRouter()



</script>

<style>
.options {
  @apply mb-8;
  & > * {
    @apply mr-4;
  }
}

.main-splitter {
  [data-pc-section="gutter"] {
    @apply bg-surface-900;
  }

  [data-pc-section="gutterhandler"] {
    @apply h-64;
  }
}
</style>