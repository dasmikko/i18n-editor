<template>
  <InputGroup>

    <InputText v-model="inputValue"  placeholder="Enter key name" @keyup.enter="onClickAdd" />
    <Button outlined icon="pi pi-key" label="Add key" @click="onClickAdd" />
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

const onClickAdd = () => {
  const currentPath = Object.keys(langComp.selectedNodeKey.value)[0]
  const newKey = inputValue.value

  let langObj = {}

  langComp.langs.value.forEach(lang => {
    langObj[lang] = ''
  })

  _set(langComp.langObj.value, `${currentPath}.${newKey}`, langObj)

  inputValue.value = null
}
</script>

<style scoped lang="scss">

</style>