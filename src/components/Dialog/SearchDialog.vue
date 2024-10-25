<template>
  <div @click="visible = true">
    <slot></slot>
  </div>

  <Dialog
    v-model:visible="visible"
    modal
    :draggable="false"
    :dismissableMask="true"
    header="Search"
    :style="{ width: '60rem' }">

    <div class="flex flex-col gap-2 mb-4">
      <InputText v-model="inputValue" autofocus id="key" placeholder="Type minimum 3 characters here..." fluid/>
    </div>

    <p class="font-bold">Results</p>
    <Divider/>

    <DataView :value="searchResult">
      <template #list="slotProps">
        <div class="flex flex-col">
          <div
            class="p-2 hover:bg-surface-800 transition cursor-pointer rounded"
            v-for="(item, index) in slotProps.items"
            :key="index"
            @click="() => onClick(item)"
           >
            <Tag class="mb-2" :value="item.path"></Tag>
            <div class="flex gap-2">
              <Panel
                class="flex-1 mb-2" :header="key" v-for="(lang, key) in item.value">
                {{ lang }}
              </Panel>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </Dialog>
</template>

<script setup>

import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';
import {computed, ref, watch} from 'vue';
import {useLangs} from '../../composables/useLangs';
import DataView from 'primevue/dataview';
import Tag from 'primevue/tag'
import Panel from 'primevue/panel'

const visible = ref(false);
const inputValue = ref('')
const langComp = useLangs()


function searchTranslations(obj, searchTerm) {
  const result = [];

  function recursiveSearch(subObj, currentPath) {
    // If the object contains both 'da' and 'en' keys and their values include the search term
    if (langComp.langs.value.includes(Object.keys(subObj)[0])) {
      let found = false

      for (const [key, value] of Object.entries(subObj)) {
        if (subObj[key].toLowerCase().includes(searchTerm.toLowerCase())) {
          found = true
        }
      }
      if (found) result.push({path: currentPath, value: subObj});
    }

    // Iterate through the keys of the current object
    for (const key in subObj) {
      if (typeof subObj[key] === 'object' && subObj[key] !== null) {
        // Recursively search deeper, updating the current path
        const newPath = currentPath ? `${currentPath}.${key}` : key;
        recursiveSearch(subObj[key], newPath);
      }
    }
  }

  // Start the search from the root of the object
  recursiveSearch(obj, '');

  return result
}

const searchResult = computed(() => {
  if (!inputValue.value || inputValue.value.length < 3) return []
  return searchTranslations(langComp.langObj.value, inputValue.value);
})


const onClick = (item) => {
  const parentPath = item.path.split('.').slice(0, -1).join('.')
  langComp.selectedNodeKey.value = { [parentPath]: true}
  visible.value = false
}


watch(
  visible,
  () => {
    inputValue.value = ''
  }
)

</script>

<style scoped lang="scss">

</style>