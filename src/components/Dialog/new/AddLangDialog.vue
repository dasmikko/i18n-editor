<template>
  <div @click="visible = true">
    <slot></slot>
  </div>

  <Dialog
    v-model:visible="visible"
    modal
    header="Add language"
          :style="{ width: '25rem' }">

    <div class="flex flex-col gap-2 mb-4">
      <label for="key">Language</label>
      <InputText autofocus v-model="inputValue" id="key" fluid></InputText>
    </div>

    <div class="flex gap-2 justify-end">
      <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
      <Button label="Add language" :disabled="!inputValue.length" @click="onClickAddKey"/>
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
const inputValue = ref('');

const onClickAddKey = () => {
  langComp.addNewLang(inputValue.value)

  visible.value = false;
}

</script>

<style scoped lang="scss">

</style>