<template>
  <Tree
      v-model:selection-keys="treeModelValue"
      selection-mode="single"
      :value="langsComposable.treeData.value"
      class="w-full border-0 outline-none object-tree"
  />
  {{langsComposable.selectedTreeNode}}
</template>
<script setup>
import {ref} from 'vue';

const langsComposable = useLangs()

const treeModelValue = computed({
  get: () => langsComposable.selectedTreeNode.value,
  set: (value) => langsComposable.selectedTreeNode.value = value
})


</script>

<style>
.object-tree {
  @apply p-0;
}
</style>