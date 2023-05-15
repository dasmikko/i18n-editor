<template>
  <GridColumn
      :column="isGroupObject ? 1 + '/' + (langs.length + 2) : 1"
      :class="isGroupObject ? 'groupRow' : 'groupLine'"
      :style="rowStyle"
      @drop="onDrop"
      @dragover.prevent
      @dragenter.prevent>
    <div class="fold-button" v-if="isGroupObject" @click="isCollapsed = !isCollapsed" >
      <template v-if="!isCollapsed">
        <i-ic-outline-arrow-drop-down style="width: 1rem;"/>
      </template>
      <template v-else>
        <i-ic-outline-arrow-right style="width: 1rem;"/>
      </template>
    </div>

    <span
        class="mr-2"
        draggable="true"
        @dragstart="onDrag">
      {{objectKey}}
    </span>

    <div class="mr-1" v-if="isGroupObject"><AddObjectDialog :obj="obj" /></div>
    <div class="mr-1" v-if="isGroupObject"><AddKeyDialog :obj="obj"/></div>
    <i-ic-delete @click="onClickDelete" class="delete-button"/>
    <div class="mr-1"><RenameDialog :obj="obj" :currentPath="currentPath"/></div>
  </GridColumn>
  <template v-if="isGroupObject && !isCollapsed">
    <TreeviewRow
        v-for="key in Object.keys(sortedObj)"
        :parent-path="currentPath"
        :objectKey="key"
        :obj="obj[key]"
        />
  </template>
  <template v-if="!isGroupObject">
    <GridColumn
        v-for="(key, index) in Object.keys(sortedObj)"
        :column="index + 2"
        @drop="onDrop"
        @dragover.prevent
        @dragenter.prevent>
      <input type="text" class="input input-bordered w-full" v-model="obj[key]" :tabindex="tabByColumn ? index + 1 : null">
    </GridColumn>
  </template>
</template>

<script>
import GridColumn from '../components/Grid/GridColumn.vue'
import {computed, ref} from 'vue'
import Dialog from '../components/Dialog/Dialog.vue'
import AddKeyDialog from '../components/Dialog/AddKeyDialog.vue'
import RenameDialog from '../components/Dialog/RenameDialog.vue'
import AddObjectDialog from '../components/Dialog/AddObjectDialog.vue'
import {useLangs} from '../composables/useLangs.js'
import _unset from 'lodash/unset'
import _set from 'lodash/set'
import __ from 'lodash'

export default {
  name: 'TreeviewRow',
  components: {AddObjectDialog, AddKeyDialog, Dialog, GridColumn, RenameDialog},
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

    const onDrag = (ev) => {
      ev.dataTransfer.dropEffect = 'move'
      ev.dataTransfer.effectAllowed = 'move'
      ev.dataTransfer.setData('objData', JSON.stringify({
        path: currentPath.value,
        key: props.objectKey,
        obj: props.obj
      }))
    }

    const onDrop = (ev) => {
      const droppedObjData = JSON.parse(ev.dataTransfer.getData('objData'))

      // Add dropped object to new path. Use parent path if not a group object
      if (isGroupObject.value) {
        _set(langsComposable.langObj.value, [...currentPath.value, droppedObjData.key].join('.'), droppedObjData.obj)
      } else {
        let parentPath = [...currentPath.value]
        parentPath.pop()
        _set(langsComposable.langObj.value, [...parentPath, droppedObjData.key].join('.'), droppedObjData.obj)
      }

      // Remove old object
      _unset(langsComposable.langObj.value, droppedObjData.path.join('.'))
    }

    const sortedObj = computed(() => {
      return __(props.obj).toPairs().sortBy(0).fromPairs().value()
    })

    return {
      rowStyle,
      isCollapsed,
      isGroupObject,
      currentPath,
      tabByColumn,
      onClickDelete,
      onDrag,
      onDrop,
      langs: langsComposable.langs,
      sortedObj
    }
  }
}
</script>

<style lang="scss" scoped>

.groupRow {
  @apply bg-gray-200 rounded mt-4 py-2;
}

.groupLine {
  @apply relative;
  &:before {
    content: '';
    height: 200%;
    @apply absolute -left-4 bg-gray-200 w-1 rounded;
  }
}

.fold-button {
  @apply inline-block cursor-pointer;
}

.delete-button, .rename-button {
  @apply mr-1 inline-block text-gray-400 cursor-pointer transition;

  &:hover {
    @apply text-gray-500;
  }
}

</style>