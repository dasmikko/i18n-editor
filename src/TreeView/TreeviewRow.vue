<template>
  <GridColumn :column="isGroupObject ? 1 + '/' + (langs.length + 2) : 1" :class="isGroupObject ? 'groupRow' : null" :style="rowStyle">
    <div class="fold-button" v-if="isGroupObject" @click="isCollapsed = !isCollapsed" >
      <template v-if="!isCollapsed">
        <i-ic-outline-arrow-drop-down style="width: 1rem;"/>
      </template>
      <template v-else>
        <i-ic-outline-arrow-right style="width: 1rem;"/>
      </template>
    </div>

    <span class="mr-2">
      {{currentPath.join('.')}}
    </span>

    <div class="mr-1" v-if="isGroupObject"><AddObjectDialog :obj="obj" /></div>
    <div class="mr-1" v-if="isGroupObject"><AddKeyDialog :obj="obj"/></div>
    <i-ic-delete @click="onClickDelete" class="delete-button"/>
  </GridColumn>
  <template v-if="isGroupObject && !isCollapsed">
    <TreeviewRow
        v-for="key in Object.keys(obj)"
        :parent-path="currentPath"
        :objectKey="key"
        :obj="obj[key]" />
  </template>
  <template v-if="!isGroupObject">
    <GridColumn
        v-for="(key, index) in Object.keys(obj)"
        :column="index + 2">
      <input type="text" v-model="obj[key]" :tabindex="tabByColumn ? index + 1 : null">
    </GridColumn>
  </template>

</template>

<script>
import GridColumn from '../components/Grid/GridColumn.vue'
import {computed, ref} from 'vue'
import Dialog from '../components/Dialog/Dialog.vue'
import AddKeyDialog from '../components/Dialog/AddKeyDialog.vue'
import AddObjectDialog from '../components/Dialog/AddObjectDialog.vue'
import {useLangs} from '../composables/useLangs.js'
import _unset from 'lodash/unset'

export default {
  name: 'TreeviewRow',
  components: {AddObjectDialog, AddKeyDialog, Dialog, GridColumn},
  props: {
    objectKey: String,
    obj: Object,
    parentPath: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const isCollapsed = ref(false)
    const langsComposable = useLangs()

    const tabByColumn = computed(() => {
      return langsComposable.tabDownColumn.value
    })

    const rowStyle = computed(() => {
      return {
        'margin-left': (currentPath.value.length - 1) + 'rem'
      }
    })

    const currentPath = computed(() => {
      return [...props.parentPath, props.objectKey]
    })

    const isGroupObject = computed(() => {
      let firstSubObj = props.obj[Object.keys(props.obj)[0]]
      if (typeof firstSubObj !== 'string') {
        return true
      }
      return false
    })

    const onClickDelete = () => {
      if (confirm('Are you sure?')) _unset(langsComposable.langObj.value, currentPath.value.join('.'))
    }

    return {
      rowStyle,
      isCollapsed,
      isGroupObject,
      currentPath,
      tabByColumn,
      onClickDelete,
      langs: langsComposable.langs
    }
  }
}
</script>

<style lang="scss" scoped>

.groupRow {
  @apply bg-gray-100 rounded py-2;
}

.fold-button {
  @apply inline-block cursor-pointer;
}

.delete-button {
  @apply inline-block text-gray-400 cursor-pointer transition;

  &:hover {
    @apply text-gray-500;
  }
}

</style>