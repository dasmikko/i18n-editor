<template>
  <div class="p-4" v-if="Object.keys(langs).length">
    <div class="options">
      <button @click="onLoadJsonClick" tabindex="-1">
        <i-ic-sharp-upload/> Load i18n JSON
      </button>

      <label for="tabbycolumn">
        <input type="checkbox" id="tabbycolumn" v-model="tabByColumn"> Tab by column
      </label>

      <AddLangDialog />
    </div>

    <Treeview :obj="langs"/>


    <p class="font-bold text-xl">JSON</p>
    <div class="preview">
      <div class="copy-to-clipboard" @click="copyToClipboard">
        <i-ic-baseline-content-copy/>
      </div>
      <pre>{{langs}}</pre>
    </div>
  </div>
</template>

<script>
import {useLangs} from '../composables/useLangs.js'
import {onMounted, ref, watch} from 'vue'
import LoadJsonDialog from '../components/Dialog/LoadJsonDialog.vue'
import AddLangDialog from '../components/Dialog/AddLangDialog.vue'
import Treeview from '../TreeView/Treeview.vue'
import HelloWorld from '../components/HelloWorld.vue'
import Grid from '../components/Grid/Grid.vue'
import GridColumn from '../components/Grid/GridColumn.vue'
import {useRouter} from 'vue-router'

export default {
  name: 'editor',
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
    const router = useRouter()

    onMounted(() => {
      langsComposable.findExistingLangs()
    })

    const copyToClipboard = async () => {

      await navigator.clipboard.writeText(JSON.stringify(langsComposable.langObj.value))
      console.log(await navigator.clipboard.readText())
    }

    const onLoadJsonClick = () => {
      router.replace('/')
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
      copyToClipboard,
      onLoadJsonClick
    }
  }
}
</script>

<style scoped>

</style>