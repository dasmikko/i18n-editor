<template>
  <Toolbar class="mb-4">
    <template #start>
      <img src="assets/logo.svg" class="mr-4 aspect-square w-10" />
      <Button icon="pi pi-globe" class="mr-2" label="Load files" link outlined severity="secondary" />
      <Button icon="pi pi-save" class="mr-2" label="Save (CTRL+S)" link outlined severity="secondary" />
      <Button icon="pi pi-wrench" class="mr-2" label="Settings" link outlined severity="secondary" />
      <Button icon="pi pi-info-circle" class="mr-2" label="About" link outlined severity="secondary" />
    </template>
  </Toolbar>

  <Splitter style="min-height: 300px" class="mb-5">
    <SplitterPanel size="20" class="">
      <Tree v-model:selection-keys="selectedNodeKey" selection-mode="single" :value="treeNodes" class="w-full"></Tree>
    </SplitterPanel>
    <SplitterPanel size="80" class="p-4">
      <div v-for="num in 8" class="mb-8 last-child:mb-0">
        <p><strong>the.key.of.the</strong></p>
        <div class="flex items-center gap-4 mb-8">
          <span>da</span>
          <InputText class="w-full" />
        </div>
        <div class="flex items-center gap-4 mb-8">
          <span>en</span>
          <InputText class="w-full" />
        </div>
        <Divider />
      </div>
    </SplitterPanel>
  </Splitter>

  <div
      class="p-4"
  >
    <div class="options">
      <button
        tabindex="-1"
        @click="onLoadJsonClick"
      >
        <i-ic-sharp-upload /> Load i18n JSON
      </button>

      <label for="tabbycolumn">
        <input
          id="tabbycolumn"
          v-model="tabByColumn"
          type="checkbox"
        > Tab by column
      </label>

      <DialogAddLang />

      <button
        tabindex="-1"
        @click="saveLanguageFile"
      >
        <i-ic-save /> Save (CTRL+S)
      </button>
    </div>

    <template v-if="false">
      <TreeView :obj="langsComposable?.langObj" />
    </template>


    <p class="font-bold text-xl">
      JSON
    </p>
    <div class="preview">
      <div
        class="copy-to-clipboard"
        @click="copyToClipboard"
      >
        <i-ic-baseline-content-copy />
      </div>
      <pre>{{ langsComposable?.langObj }}</pre>
    </div>
  </div>
</template>

<script setup>
import {useLangs} from '../composables/useLangs.js'
import {onBeforeUnmount, onMounted, ref, watch} from 'vue'
import {useRouter} from 'vue-router'
import saveAs from 'file-saver'
import Toolbar from 'primevue/toolbar';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import InputText from 'primevue/inputtext';
import Divider from 'primevue/divider';

import Tree from 'primevue/tree';


const langsComposable = useLangs()
const tabByColumn = ref(false)
const router = useRouter()

const selectedNodeKey = ref(null)
const treeNodes = ref([
  {
    key: '0',
    label: 'Documents',
    data: 'Documents Folder',
    icon: 'pi pi-fw pi-inbox',
    children: [
      {
        key: '0-0',
        label: 'Work',
        data: 'Work Folder',
        icon: 'pi pi-fw pi-cog',
        children: [
          {key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document'},
          {key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document'}
        ]
      },
      {
        key: '0-1',
        label: 'Home',
        data: 'Home Folder',
        icon: 'pi pi-fw pi-home',
        children: [{key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month'}]
      }
    ]
  }
])



onMounted(() => {
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




const items = ref([
  {
    label: 'Load files',
    icon: 'pi pi-globe',
    command: () => {
      onLoadJsonClick()
    }
  },
  {
    label: 'Save',
    icon: 'pi pi-save'
  },
  {
    label: 'Settings',
    icon: 'pi pi-gear',
  },
  {
    label: 'About',
    icon: 'pi pi-info-circle',
  }
]);

</script>

<style scoped>
.options {
  @apply mb-8;
  & > * {
    @apply mr-4;
  }
}
</style>