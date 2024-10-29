<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Rename object"
          :style="{ width: '25rem' }">

    <div class="flex flex-col gap-2 mb-4">
      <label for="key">New object key</label>
      <InputText autofocus v-model="inputValue" id="key" @keyup.enter="onClickRename" fluid></InputText>
    </div>

    <div class="flex gap-2 justify-end">
      <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
      <Button label="Rename" :disabled="!inputValue" @click="onClickRename"/>
    </div>
  </Dialog>
</template>

<script setup>
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import {ref, toRaw} from 'vue';
import {useLangs} from '../../composables/useLangs';
import _set from 'lodash/set';
import _get from 'lodash/get';
import _unset from 'lodash/unset';

const props = defineProps({
  selectedNode: Object
})

const visible = ref(false);
const langComp = useLangs();
const inputValue = ref(null);

const onClickRename = () => {
  if (inputValue.value === '') return

  const oldPath = props.selectedNode.key

  let newPath = oldPath.split('.').slice(0, -1)
  newPath.push(inputValue.value)
  newPath = newPath.join('.')

  // Create the new language object
  const oldObj = _get(langComp.langObj.value, oldPath)
  _set(langComp.langObj.value, newPath, toRaw(oldObj))

  // Delete the old language object
  _unset(langComp.langObj.value, oldPath)

  visible.value = false;
}

const show = () => {
  visible.value = true
  const keysLength = props.selectedNode.key.split('.').length
  inputValue.value = props.selectedNode.key.split('.')[keysLength-1]
}

defineExpose({
  show
})

</script>

<style scoped lang="scss">

</style>