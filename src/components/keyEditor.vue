<template>
  <ContextMenu ref="cm" :model="contextMenuItems"/>
  <DataTable
    ref="tableRef"
    class="mb-4 w-full"
    :value="objectToView"
    editMode="cell"
    contextMenu
    metaKeySelection
    v-model:contextMenuSelection="selectedRow"
    @rowContextmenu="onRowContextMenu"
    @cell-edit-complete="onCellEditComplete"
    :pt="{
      bodyRow: (context) => ({
        class: [
          { ['row-' + context.props.rowData.key]: true },
        ]
      }),
      column: {

          bodycell: (context) => ({
              class: [
                { '!py-0': context.state['d_editing'] },
              ]
          })
      }
    }">
    <Column field="key" header="Key" style="width: 25%">
      <template v-if="!disableKeyField" #editor="{ data, field }">
        <InputText v-model="data[field]" autofocus fluid/>
      </template>
    </Column>
    <Column
      v-for="language in langsComposable.langs.value"
      :field="language"
      :header="language"
      style="width: 25%">
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" autofocus fluid/>
      </template>
    </Column>

    <template #empty>
      <div class="text-center">
        <p class="text-lg text-surface-500 mb-2">No keys found in this object</p>
      </div>

    </template>
  </DataTable>

  <NewKeyField :tableRef="tableRef"/>
</template>

<script setup>

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import NewKeyField from './newKeyField.vue';
import InputText from 'primevue/inputtext';
import ContextMenu from 'primevue/contextmenu';
import _set from 'lodash/set';
import {computed, onMounted, ref} from 'vue';
import _unset from 'lodash/unset';
import {useLangs} from '../composables/useLangs';
import _get from 'lodash/get';
import {useConfirm} from 'primevue/useconfirm';

const langsComposable = useLangs()
const {selectedNodeKey, disableKeyField} = useLangs()
const confirm = useConfirm();
const tableRef = ref(null)

const objectToView = computed(() => {
  if (!selectedNodeKey.value) {
    return []
  }

  let obj = _get(langsComposable.langObj.value, Object.keys(selectedNodeKey.value)[0])

  let lines = []

  for (let key in obj) {
    // Check if the property is an object with language keys
    if (langsComposable.langs.value.includes(Object.keys(obj[key])[0])) {

      lines.push({
        key: key,
        ...obj[key]
      })
    }
  }

  return lines.sort((a, b) => a.key.localeCompare(b.key))

})


const renameKey = (e) => {
  // Skip if key actually didn't change
  if (e.data.key === e.newData.key) {
    return
  }

  let currentPath = Object.keys(selectedNodeKey.value)[0]
  let oldPath = `${currentPath}.${e.data.key}`
  let newPath = `${currentPath}.${e.newData.key}`

  let newObj = {...e.newData}
  delete newObj.key

  // Create the new language object
  _set(langsComposable.langObj.value, newPath, newObj)

  // Delete the old language object
  _unset(langsComposable.langObj.value, oldPath)
}


const onCellEditComplete = (e) => {
  if (e.field === 'key') {
    renameKey(e)
    return
  }


  let currentPath = Object.keys(selectedNodeKey.value)[0]
  let currentKey = `${e.data.key}.${e.field}`
  let fullPath = `${currentPath}.${e.data.key}.${e.field}`
  let newValue = e.newValue

  _set(langsComposable.langObj.value, fullPath, newValue)
}

const cm = ref(null);
const selectedRow = ref();
const contextMenuItems = [
  {label: 'Delete key', icon: 'pi pi-fw pi-trash', command: () => deleteKey()}
]


const onRowContextMenu = (event) => {
  cm.value.show(event.originalEvent);
};


const deleteKey = () => {
  confirm.require({
    icon: 'pi pi-exclamation-triangle',
    header: 'Are you sure?',
    message: 'Are you sure you want to delete this key?',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    accept: () => {
      let currentPath = Object.keys(selectedNodeKey.value)[0]
      let currentKey = selectedRow.value.key
      let fullPath = `${currentPath}.${currentKey}`

      _unset(langsComposable.langObj.value, fullPath)
    }
  })
}


const editingRows = ref([])
</script>

<style scoped lang="scss">

</style>