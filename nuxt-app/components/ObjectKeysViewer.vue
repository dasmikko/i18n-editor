<template>
  {{Object.keys(langsComposable.selectedTreeNode.value)[0]}}
  <div
      v-for="(value, key) in keysAtPath"
      class="mb-8 last-child:mb-0"
  >
    <p><strong>{{key}}</strong></p>
    <div class="flex items-center gap-4 mb-8">
      <span>da</span>
      <InputText class="w-full" />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <span>en</span>
      <InputText class="w-full" />
    </div>
    <Divider />
  </div>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Divider from "primevue/divider";
import _get from "lodash/get";

const langsComposable = useLangs();

function filterNonObjectValues(inputObject) {
  const result = {};
  // Iterate over each entry in the object
  Object.entries(inputObject).forEach(([key, value]) => {
    // Check if the value is not an object or is null
    if (typeof value !== 'object' || value === null) {
      result[key] = value;
    }
  });
  return result;
}

const keysAtPath = computed(() => {
  let key = Object.keys(langsComposable.selectedTreeNode.value)[0];

  let keysAtPath = {}

  if (key === 'Root') {
    keysAtPath = langsComposable.mergedObjects.value
  } else {
    keysAtPath = _get(langsComposable.mergedObjects.value, key)
  }

  if (typeof keysAtPath !== 'object') {
    return {}
  }

  return filterNonObjectValues(keysAtPath)
});
</script>

<style scoped lang="scss">

</style>