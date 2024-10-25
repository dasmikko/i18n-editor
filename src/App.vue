<template>
  <div class="main-wrapper">
    <ConfirmDialog/>
    <Toast position="bottom-right" />
    <router-view></router-view>
  </div>
</template>

<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import {onMounted, ref, watch} from 'vue'
import {useLangs} from './composables/useLangs.js'
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';


export default {
  name: 'App',
  components: {
    ConfirmDialog,
    Toast,
  },
  setup () {
    const langsComposable = useLangs()
    const tabByColumn = ref(false)

    onMounted(() => {
      langsComposable.findExistingLangs()
    })

    const copyToClipboard = async () => {

      await navigator.clipboard.writeText(JSON.stringify(langsComposable.langObj.value))
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
      @apply absolute right-0 top-0 p-4 bg-surface-800 rounded cursor-pointer transition select-none;

      &:hover {
        @apply bg-gray-400;
      }
    }

    pre {
      max-height: 200px;
      @apply p-4 bg-surface-900 overflow-auto rounded;
    }
  }


</style>
