<template>
  <router-view>
  </router-view>
</template>

<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import Grid from './components/Grid/Grid.vue'
import GridColumn from './components/Grid/GridColumn.vue'
import Treeview from "./TreeView/Treeview.vue";
import {computed, customRef, onMounted, ref, watch} from 'vue'
import {useLangs} from './composables/useLangs.js'
import AddLangDialog from './components/Dialog/AddLangDialog.vue'
import LoadJsonDialog from './components/Dialog/LoadJsonDialog.vue'

export default {
  name: 'App',
  components: {
    LoadJsonDialog,
    AddLangDialog,
    Treeview,
    HelloWorld,
    Grid,
    GridColumn
  },
  setup () {
    const langsComposable = useLangs()
    const tabByColumn = ref(false)

    onMounted(() => {
      langsComposable.findExistingLangs()
    })

    const copyToClipboard = async () => {

      await navigator.clipboard.writeText(JSON.stringify(langsComposable.langObj.value))
      console.log(await navigator.clipboard.readText())
    }

    watch(
        tabByColumn,
        () => {
          langsComposable.tabDownColumn.value = tabByColumn.value
        }
    )

    return {
      langs: langsComposable.langObj,
      tabByColumn,
      copyToClipboard
    }
  }
}

</script>



<style lang="scss">

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
