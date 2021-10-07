<template>
  <div class="w-screen h-screen flex items-center align-center justify-center">
    <div class="text-center">
      <p class="font-bold mb-4" style="font-size: 2rem;">i18n Editor</p>

      <div class="option-card">
        <label for="newFormatFile">Load language file in new format</label>
        <p><a target="_blank" href="https://github.com/dasmikko/i18n-editor#what-is-this">Read more about the format</a></p>
        <input id="newFormatFile" type="file" @change="newFormatFileChange" accept="application/json">
      </div>

      <p class="mt-6 mb-6 text-gray-400 font-bold">OR</p>

      <div class="option-card">
        <label for="mergeFiles">Merge language files</label>
        <p>It expects that the filename is the key for the language, like: da.json, en.json</p>
        <input id="mergeFiles" type="file" @change="mergeFilesChange" multiple accept="application/json">
      </div>
    </div>
  </div>
</template>

<script>
import mergeWith from 'lodash/mergeWith'
import _set from 'lodash/set'
import _get from 'lodash/get'
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

    const newFormatFileChange = async (event) => {
      const jsonAsString = await readFile(event.target.files[0])
      const json = JSON.parse(jsonAsString)
      langsComposable.langObj.value = json
      router.push('/editor')
    }


    const mergeFilesChange = async (event) => {
      let langs = {}
      const files = event.target.files

      for (const file of files) {
        const jsonAsString = await readFile(file)
        const json = JSON.parse(jsonAsString)
        langs[file.name.split('.')[0]] = json
      }

      const mergedObj = langsComposable.generateLangFileInNewFormat(langs)
      langsComposable.langObj.value = mergedObj
      router.push('/editor')
    }

    return {
      mergeFilesChange,
      newFormatFileChange
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