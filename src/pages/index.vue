<template>
  <div class="w-screen h-screen flex items-center align-center justify-center">
    <div class="text-center">
      <p class="font-bold mb-4" style="font-size: 2rem;">i18n Editor</p>

      <div class="option-card">
        <label for="newFormatFile">Load language file in new format</label>
        <p><a target="_blank" href="https://github.com/dasmikko/i18n-editor#what-is-this">Read more about the format</a></p>
        <button @click="selectFile">Select file</button>
      </div>

      <p class="mt-6 mb-6 text-gray-400 font-bold">OR</p>

      <div class="option-card">
        <label for="mergeFiles">Merge language files</label>
        <p>It expects that the filename is the key for the language, like: da.json, en.json</p>
        <button @click="selectFilesToMerge">Select files</button>
      </div>
    </div>
  </div>
</template>

<script>
import mergeWith from 'lodash/mergeWith'
import _set from 'lodash/set'
import _get from 'lodash/get'
import __ from 'lodash'
import { useLangs } from '../composables/useLangs.js'
import {useRouter} from 'vue-router'

export default {
  name: 'indexPage',
  setup () {
    const langsComposable = useLangs()
    const router = useRouter()

    const readFile = (file) => {
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = function(evt) {
          resolve(evt.target.result)
        };
        reader.readAsText(file)
      })
    }

    const selectFile = async () => {
      const pickerOpts = {
        types: [
          {
            description: 'i18n json file',
            accept: {
              'application/json': ['.json']
            }
          },
        ],
        excludeAcceptAllOption: true,
        multiple: false
      };

      langsComposable.fileHandler.value = await window.showOpenFilePicker(pickerOpts);
      // get file contents

      const fileData = await langsComposable.fileHandler.value[0].getFile();
      const json = JSON.parse(await readFile(fileData))
      langsComposable.langObj.value = json
      langsComposable.isMergingFiles.value = false
      await router.push({ name: 'i18n-editor-editor' })
    }

    const selectFilesToMerge = async () => {
      const pickerOpts = {
        types: [
          {
            description: 'i18n json files to merge',
            accept: {
              'application/json': ['.json']
            }
          },
        ],
        excludeAcceptAllOption: true,
        multiple: true
      };

      langsComposable.fileHandler.value = await window.showOpenFilePicker(pickerOpts);
      const files = langsComposable.fileHandler.value
      // get file contents

      let langs = {}
      for (const file of files) {
        const fileData = await file.getFile();
        const jsonAsString = await readFile(fileData)
        const json = JSON.parse(jsonAsString)
        langs[file.name.split('.')[0]] = json
      }

      const mergedObj = langsComposable.generateLangFileInNewFormat(langs)
      langsComposable.langObj.value = mergedObj
      langsComposable.filename.value = "i18n.json"
      langsComposable.isMergingFiles.value = true
      router.push('/editor')
    }


    return {
      selectFile,
      selectFilesToMerge
    }
  }
}
</script>

<style lang="scss" scoped>
  .option-card {
    @apply text-left p-5 bg-gray-100 border-2 rounded-md transition;
    max-width: 400px;

    &:hover {
      @apply shadow-md;
    }

    label {
      @apply block mb-2 font-bold;
    }
  }
</style>