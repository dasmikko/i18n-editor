<template>
  <div id="primevue" class="p-2">
    <Toolbar class="mb-4">
      <template #start>
        <Button severity="secondary"  @click="onLoadJsonClick" class="mr-2" label="Load i18n JSON" icon="pi pi-file-import"/>
        <AddLangDialog>
          <Button severity="secondary" class="mr-2" label="Add Language"  icon="pi pi-globe"/>
        </AddLangDialog>
        <Button severity="secondary" class="mr-2" @click="saveLanguageFile" label="Save (CTRL+S)" icon="pi pi-save"/>
      </template>

      <template #end>
        <ToggleButton v-model="disableKeyField" onLabel="Key field edit disabled" offLabel="Key field edit enabled" />
      </template>
    </Toolbar>

    <div class="flex gap-4">
      <div class="bg-surface-900 rounded-md">
        <div class="sticky top-0">
          <SidebarTree />

          <div class="px-4 pb-4">
            <NewObjectField/>
          </div>
        </div>
      </div>
      <div class="flex-1 p-4 bg-surface-900 rounded-md flex items-center justify-center flex-col">
        <template v-if="!Object.keys(selectedNodeKey).length">
          <div class="text-surface-500 text-xl">
            Please select an object in the sidebar
          </div>
        </template>

        <template v-else>
          <KeyEditor/>
        </template>


      </div>
    </div>

    <div class="preview">
      <div class="copy-to-clipboard" @click="copyToClipboard">
        <i-ic-baseline-content-copy/>
      </div>
      <pre>{{langs}}</pre>
    </div>


  </div>
</template>


<script setup>
import {useLangs} from '../composables/useLangs.js'
import {onBeforeUnmount, onMounted, ref, computed, watch} from 'vue'
import AddLangDialog from '../components/Dialog/new/AddLangDialog.vue'
import Treeview from '../TreeView/Treeview.vue'
import {useRouter} from 'vue-router'
import saveAs from 'file-saver'
import Button from 'primevue/button'
import Toolbar from 'primevue/toolbar';
import ToggleButton from 'primevue/togglebutton';
import NewObjectField from '../components/newObjectField.vue';
import SidebarTree from '../components/SidebarTree.vue';
import KeyEditor from '../components/keyEditor.vue';
import {useToast} from 'primevue/usetoast';




const langsComposable = useLangs()
const { selectedNodeKey, disableKeyField } = useLangs()
const tabByColumn = ref(false)
const router = useRouter()
const toast = useToast();


onMounted(() => {
  if (Object.keys(langsComposable.langObj.value).length === 0) {
    router.replace('/')
    return
  }

  // Auto select the first node
  langsComposable.selectedNodeKey.value = { [Object.keys(langsComposable.langObj.value)[0]]: true }

  document.addEventListener("keydown", onSave);
  langsComposable.findExistingLangs()
})

onBeforeUnmount(() => {
  document.removeEventListener("keydown", onSave);
})

const copyToClipboard = async () => {
  await navigator.clipboard.writeText(JSON.stringify(langsComposable.langObj.value))
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
    {type: "application/json"});

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

  toast.add({ severity: 'success', summary: 'Info', detail: 'JSON file saved!', life: 3000 });
}

const langs = computed(() => {
  return langsComposable.langObj.value
})


watch(
  tabByColumn,
  () => {
    langsComposable.tabDownColumn.value = tabByColumn.value
  }
)




</script>


<style lang="scss">
 .options {
   @apply mb-8;
   & > * {
     @apply mr-4;
   }
 }
</style>