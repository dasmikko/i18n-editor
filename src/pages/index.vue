<template>
  <div class="w-screen h-screen flex items-center align-center justify-center">
    <div class="max-w-[450px]">
      <p class="font-bold mb-4" style="font-size: 2rem;">i18n Editor</p>

      <Message v-if="isUnsupportedBrowser" class="mb-2" severity="error">
        This browser is unsupported.<br>
        Try Google Chrome, or any Chrome based browser.
      </Message>

      <Card>
        <template #title>
          Load language file in new format
        </template>

        <template #content class="card-body">
            <p class="mb-2">If you already are using the new file format, just select it.</p>
            <p><a target="_blank" class="underline" href="https://github.com/dasmikko/i18n-editor#what-is-this">Read more about the format</a></p>
        </template>
        <template #footer>
          <div class="flex gap-4 mt-1">
            <Button label="Select file" class="w-full" severity="success" outlined  @click="selectFile"/>
          </div>
        </template>
      </Card>

      <Divider type="dashed" class="py-8"><b>OR</b></Divider>


      <Card>
        <template #title>
          Merge language files
        </template>

        <template #content class="card-body">
          <p class="mb-2">If you already are using the new file format, just select it.</p>
          <p><a target="_blank" class="link link-primary" href="https://github.com/dasmikko/i18n-editor#what-is-this">Read more about the format</a></p>

        </template>
        <template #footer>
          <div class="flex gap-4 mt-1">
            <Button label="Select files" class="w-full" outlined  @click="selectFilesToMerge"/>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import Message from 'primevue/message'
import { useLangs } from '../composables/useLangs.js'
import {useRouter} from 'vue-router'
import {computed} from 'vue';

const langsComposable = useLangs()
const router = useRouter()

const isUnsupportedBrowser = computed(() => {
  if (!window.hasOwnProperty('showOpenFilePicker')) return true
  return false
})

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
  await router.push('/editor')
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