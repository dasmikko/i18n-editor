<template>
  <div @click="visible = true">
    <slot></slot>
  </div>

  <Dialog
    v-model:visible="visible"
    modal
    header="New object"
          :style="{ width: '25rem' }">

    <div class="flex flex-col gap-2 mb-4">
      <label for="key">Object key</label>
      <InputText v-model="inputValue" id="key" autofocus fluid @keyup.enter="onClickAddKey"></InputText>
    </div>

    <div class="flex gap-2 justify-end">
      <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
      <Button label="Add object" @click="onClickAddKey"/>
    </div>
  </Dialog>
</template>

<script setup>
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import {ref} from 'vue';
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

const onClickAddKey = () => {
  if (inputValue.value === '') return

  let newPath = props.selectedNode.key.split('.')
  newPath.push(inputValue.value)
  newPath = newPath.join('.')
  _set(langComp.langObj.value, newPath, {})

  langComp.selectedNodeKey.value = { [newPath]: true }

  visible.value = false
}

const show = () => {
  visible.value = true
  inputValue.value = ''
}

defineExpose({
  show
})

</script>

<style scoped lang="scss">

</style>