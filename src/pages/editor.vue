<template>
  <div class="p-2" v-if="Object.keys(langs).length">
    <div class="options flex">
      <button class="btn gap-2" @click="onLoadJsonClick" tabindex="-1">
        <i-ic-sharp-upload/> Load i18n JSON
      </button>

      <label for="tabbycolumn" class="btn gap-2">
        <input class="btn" type="checkbox" id="tabbycolumn" v-model="tabByColumn"> Tab by column
      </label>

      <AddLangDialog />

      <button class="btn gap-2" @click="saveLanguageFile" tabindex="-1">
        <i-ic-save/> Save (CTRL+S)
      </button>
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
import {onBeforeUnmount, onMounted, ref, watch} from 'vue'
import LoadJsonDialog from '../components/Dialog/LoadJsonDialog.vue'
import AddLangDialog from '../components/Dialog/AddLangDialog.vue'
import Treeview from '../TreeView/Treeview.vue'
import HelloWorld from '../components/HelloWorld.vue'
import Grid from '../components/Grid/Grid.vue'
import GridColumn from '../components/Grid/GridColumn.vue'
import {useRouter} from 'vue-router'
import saveAs from 'file-saver'

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
      if (Object.keys(langsComposable.langObj.value).length === 0) {
        router.replace('/')
        return
      }

      document.addEventListener("keydown", onSave);
      langsComposable.findExistingLangs()
    })

    onBeforeUnmount(() => {
      document.removeEventListener("keydown", onSave);
    })

    const copyToClipboard = async () => {

      await navigator.clipboard.writeText(JSON.stringify(langsComposable.langObj.value))
      console.log(await navigator.clipboard.readText())
    }

    const onLoadJsonClick = () => {
      router.replace('/')
    }

    const onSave = (e) => {
      if (!(e.keyCode === 83 && e.ctrlKey)) {
        return;
      }
      e.preventDefault();

      saveLanguageFile()
    }

    const saveLanguageFile = async () => {
      let blob = new Blob([JSON.stringify(langsComposable.langObj.value)],
          { type: "application/json" });

      let fileHandler = null

      if (langsComposable.isMergingFiles.value) {
        // create a new handle
        const pickerOpts = {
          name: langsComposable.filename,
          types: [
            {
              description: 'i18n json file',
              accept: {
                'application/json': ['.json']
              }
            },
          ],
        };

        langsComposable.fileHandler.value = [await window.showSaveFilePicker(pickerOpts)];
        langsComposable.isMergingFiles.value = false
      }

      // create a FileSystemWritableFileStream to write to
      const writableStream = await langsComposable.fileHandler.value[0].createWritable();

      // write our file
      await writableStream.write(blob);

      // close the file and write the contents to disk.
      await writableStream.close();
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
      onLoadJsonClick,
      onSave,
      saveLanguageFile
    }
  }
}
</script>

<style lang="scss">
 .options {
   @apply mb-8;
   & > * {
     @apply mr-4;
   }
 }
</style>