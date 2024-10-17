<template>
  <div @click="visible = true">
    <slot></slot>
  </div>

  <Dialog
    v-model:visible="visible"
    modal
    header="Add key"
          :style="{ width: '25rem' }">

    <div class="flex flex-col gap-2 mb-4">
      <label for="key">Key</label>
      <InputText v-model="inputValue" id="key" fluid></InputText>
    </div>

    <div class="flex gap-2 justify-end">
      <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
      <Button label="Add key" @click="onClickAddKey"/>
    </div>
  </Dialog>
</template>

<script setup>
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import {ref} from 'vue';
import {useLangs} from '../../../composables/useLangs';
import _set from 'lodash/set';

const visible = ref(false);
const langComp = useLangs();
const inputValue = ref(null);

const onClickAddKey = () => {
  const currentPath = Object.keys(langComp.selectedNodeKey.value)[0]
  const newKey = inputValue.value

  let langObj = {}

  langComp.langs.value.forEach(lang => {
    langObj[lang] = ''
  })

  _set(langComp.langObj.value, `${currentPath}.${newKey}`, langObj)

  visible.value = false;
}

</script>

<style scoped lang="scss">

</style>