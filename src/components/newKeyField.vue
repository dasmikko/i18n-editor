<template>
  <InputGroup>

    <InputText v-model="inputValue" ref="inputRef"  placeholder="Enter key name" @keyup.enter="onClickAdd" />
    <Button outlined icon="pi pi-key" label="Add key" @click="onClickAdd" />
  </InputGroup>
</template>

<script setup>
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import {useLangs} from '../composables/useLangs';
import {nextTick, ref, watch} from 'vue';
import _set from 'lodash/set';
import { useMagicKeys } from '@vueuse/core'

const magickeys = useMagicKeys()
const newLineFocus = magickeys['Ctrl+Alt+N']



const props = defineProps({
  tableRef: {
    type: Object,
  }
})

const langComp = useLangs();
const inputValue = ref(null);
const inputRef = ref(null)

const onClickAdd = async () => {
  const currentPath = Object.keys(langComp.selectedNodeKey.value)[0]
  const newKey = inputValue.value

  let langObj = {}

  langComp.langs.value.forEach(lang => {
    langObj[lang] = ''
  })






  _set(langComp.langObj.value, `${currentPath}.${newKey}`, langObj)

  inputValue.value = null

  await nextTick()

  // Focus the new row
  const cellEl = props.tableRef.$el.querySelector(`.row-${newKey} > td:nth-child(2)`)
  cellEl.click()
}


watch(
  newLineFocus,
  (pressed) => {
    if (pressed) {
      inputRef.value.$el.focus()
    }
  }
)
</script>

<style scoped lang="scss">

</style>