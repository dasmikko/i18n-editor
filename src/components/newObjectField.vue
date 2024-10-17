<template>
  <InputGroup>

    <InputText v-model="inputValue"  placeholder="Enter object name" @keyup.enter="onClickAddKey" />
    <Button outlined icon="pi pi-key" label="Add object" @click="onClickAddKey" />
  </InputGroup>
</template>

<script setup>
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import {useLangs} from '../composables/useLangs';
import {ref} from 'vue';
import _set from 'lodash/set';

const langComp = useLangs();
const inputValue = ref(null);

const onClickAddKey = () => {
  const currentPath = Object.keys(langComp.selectedNodeKey.value)[0]
  const newKey = inputValue.value

  console.log(`${currentPath}.${newKey}`)

  if (!currentPath) {
    _set(langComp.langObj.value, `${newKey}`, {})
    langComp.selectedNodeKey.value = {[newKey]: true}
  } else {
    _set(langComp.langObj.value, `${currentPath}.${newKey}`, {})
    langComp.selectedNodeKey.value = {[`${currentPath}.${newKey}`]: true}
  }

  inputValue.value = null
}
</script>

<style scoped lang="scss">

</style>