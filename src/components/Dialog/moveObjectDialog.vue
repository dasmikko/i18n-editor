<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Move object"
          :style="{ width: '25rem' }">

    <div class="flex flex-col gap-2 mb-4">
      <label for="key">Select where to move the object</label>

      <Tree
        v-model:expanded-keys="expandedKeys"
        v-model:selection-keys="selectedNodeKey"
        selectionMode="single"
        :value="tree"
        class="border border-surface rounded-md overflow-hidden w-full">
      </Tree>
    </div>

    <template v-if="selectedNodeKey === null || !Object.keys(selectedNodeKey).length">
      <Message class="mb-4">Moving to the root of the language json</Message>
    </template>
    
    <div class="flex gap-2 justify-end">
      <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
      <Button label="Move" @click="onClickMove"/>
    </div>
  </Dialog>
</template>

<script setup>
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import {ref, toRaw, watch} from 'vue';
import {useLangs} from '../../composables/useLangs';
import _set from 'lodash/set';
import _get from 'lodash/get';
import _unset from 'lodash/unset';
import Tree from 'primevue/tree';
import Message from 'primevue/message';

const props = defineProps({
  selectedNode: Object,
  tree: Object,
})

const visible = ref(false);
const langComp = useLangs();
const inputValue = ref(null);
const selectedNodeKey = ref(null)
const expandedKeys = ref([])

const onClickMove = () => {
  const oldPath = props.selectedNode.key
  const keyName = oldPath.split('.')[oldPath.split('.').length - 1]

  let newPath = ''
  if (Object.keys(selectedNodeKey.value).length === 0) {
    newPath = keyName
  } else {
    newPath = Object.keys(selectedNodeKey.value)[0] + '.' + keyName
  }

  // Create the new language object
  const oldObj = _get(langComp.langObj.value, oldPath)
  _set(langComp.langObj.value, newPath, toRaw(oldObj))

  // Delete the old language object
  _unset(langComp.langObj.value, oldPath)

  visible.value = false;
}

const show = () => {
  visible.value = true
}

watch(
  visible,
  (newVal) => {
    if (newVal) {
      selectedNodeKey.value = {}
      expandedKeys.value = {}
    }
  }
)

watch(
  selectedNodeKey,
  (newVal, oldValue) => {
    let newValKey = Object.keys(newVal)[0]
    let oldValKey = Object.keys(oldValue ?? {})[0]

    // Skip if the new value is empty
    if (!Object.keys(newVal).length) {
      return
    }

    expandedKeys.value = {}

    let keyPath = newValKey?.split('.')
    keyPath?.forEach((key, index) => {
      let path = keyPath.slice(0, index + 1).join('.')
      expandedKeys.value[path] = true
    })


  }
)

defineExpose({
  show
})

</script>

<style scoped lang="scss">

</style>