<template>
  <ContextMenu ref="cm" :model="contextMenuItems"/>
  <RenameObjectDialog ref="renameDialog" :selectedNode="selectedNode"/>
  <MoveObjectDialog ref="moveDialog" :tree="langsTree" :selectedNode="selectedNode"/>
  <CopyObjectDialog ref="copyDialog" :tree="langsTree" :selectedNode="selectedNode"/>
  <AddObjectDialog ref="addObjectDialog" :selectedNode="selectedNode"/>

  <Tree
    v-model:selection-keys="selectedNodeKey"
    v-model:expanded-keys="expandedKeys"
    selectionMode="single"
    :value="langsComposable.langsTree.value"
    class="rounded-md overflow-hidden w-full">
    <template #default="slotProps">
      <span class="block w-full" @contextmenu="(e) => onRowContextMenu(e, slotProps.node)">
      {{ slotProps.node.label }}
        </span>
    </template>
  </Tree>

  <div class="px-4 pb-4">
    <NewObjectField/>
  </div>
</template>

<script setup>
import {computed, ref, watch} from 'vue';
import Tree from 'primevue/tree';
import {useLangs} from '../composables/useLangs';
import ContextMenu from 'primevue/contextmenu';
import _unset from 'lodash/unset';
import _set from 'lodash/set';
import RenameObjectDialog from './Dialog/renameObjectDialog.vue';
import { useConfirm } from "primevue/useconfirm";
import MoveObjectDialog from './Dialog/moveObjectDialog.vue';
import CopyObjectDialog from './Dialog/copyObjectDialog.vue';
import NewObjectField from './newObjectField.vue';
import AddObjectDialog from './Dialog/AddObjectDialog.vue';

const confirm = useConfirm()
const renameDialog = ref(null)
const moveDialog = ref(null)
const copyDialog = ref(null)
const addObjectDialog = ref(null)
const langsComposable = useLangs()
const { selectedNodeKey } = useLangs()

const expandedKeys = ref([])


// Build a tree structure from an array of dot-separated paths // Thanks chatgpt
const buildTree = (arr) => {
  const result = [];

  // Helper function to find or create a node
  function findOrCreateNode(pathParts, currentLevel, fullPath) {
    const currentKey = pathParts[0];
    const currentFullPath = fullPath ? `${fullPath}.${currentKey}` : currentKey;

    let node = currentLevel.find((item) => item.key === currentFullPath);

    if (!node) {
      node = {
        key: currentFullPath,
        label: currentKey

      };
      currentLevel.push(node);
    }

    if (pathParts.length > 1) {
      if (!node.children) {
        node.children = [];
      }
      findOrCreateNode(pathParts.slice(1), node.children, currentFullPath);
    }
  }

  // Process each item in the array
  arr.forEach((item) => {
    const pathParts = item.split('.');
    findOrCreateNode(pathParts, result, '');
  });

  return result;
}

// This is a goddamn mess
const langsTree = computed(() => {
  let paths = []

  function traverseObject(obj, currentPath = []) {
    for (let key in obj) {
      // Create the new path including the current key
      const newPath = [...currentPath, key];

      if (typeof obj[key] === 'object') {
        // If it's an object, recurse deeper
        if (langsComposable.langs.value.includes(Object.keys(obj[key])[0])) {
          // Is a language object
          let path = currentPath.join('.')
          if (!paths.includes(path) && path !== '') {
            paths.push(path)
          } else if (!paths.includes(key) && path === '') {
            paths.push(key)
          }
        } else {
          // Is not language object
          let path = newPath.join('.')
          if (!paths.includes(path) && path !== '') {
            paths.push(path)
          } else if (!paths.includes(key) && path === '') {
            paths.push(key)
          }
          traverseObject(obj[key], newPath);
        }
      }
    }
  }
  traverseObject(langsComposable.langObj.value)
  return buildTree(paths)
})

const cm = ref(null);
const selectedNode = ref();
const contextMenuItems = [
  { label: 'New object', icon: 'pi pi-fw pi-copy', command: () => addObjectDialog.value.show() },
  { label: 'Copy object', icon: 'pi pi-fw pi-copy', command: () => copyDialog.value.show() },
  { label: 'Rename object', icon: 'pi pi-fw pi-pencil', command: () => renameDialog.value.show() },
  { label: 'Move object', icon: 'pi pi-fw pi-arrows-h', command: () => moveDialog.value.show() },
  { label: 'Delete object', icon: 'pi pi-fw pi-trash', command: () => deleteKey() }
]


const onRowContextMenu = (event, node) => {
  cm.value.show(event);
  selectedNode.value = node;
};


const deleteKey = () => {
  confirm.require({
    icon: 'pi pi-exclamation-triangle',
    header: 'Are you sure?',
    message: 'Are you sure you want to delete this object?',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    accept: () => {
      _unset(langsComposable.langObj.value, selectedNode.value.key)
      selectedNodeKey.value = {}
    }
  })
}

watch(
  selectedNodeKey,
  (newVal, oldValue) => {
    let newValKey = Object.keys(newVal)[0]
    let oldValKey = Object.keys(oldValue)[0]

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
</script>

<style scoped lang="scss">

</style>