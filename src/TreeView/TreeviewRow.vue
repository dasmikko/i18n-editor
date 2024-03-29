<template>
  <template v-if="isGroupObject">
    <div
        class="w-full rounded bg-gray-200 mb-4 shadow border border-gray-400"
        @drop="onDrop"
        @dragover.prevent
        @dragenter.prevent>
      <div class="header flex bg-gray-300 rounded p-2 items-center">
        <div class="fold-button" v-if="isGroupObject" @click="isCollapsed = !isCollapsed" >
          <template v-if="!isCollapsed">
            <i-ic-outline-arrow-drop-down style="width: 1rem;"/>
          </template>
          <template v-else>
            <i-ic-outline-arrow-right style="width: 1rem;"/>
          </template>
        </div>

        <span
            class="mr-2 flex-1 "
            draggable="true"
            @dragstart="onDrag">
          {{currentPath.join('.')}}
        </span>

        <div class="mr-1"><AddObjectDialog :obj="obj" /></div>
        <div class="mr-1"><AddKeyDialog :obj="obj"/></div>
        <i-ic-delete @click="onClickDelete" class="delete-button"/>
        <div class="mr-1"><RenameDialog :obj="obj" :currentPath="currentPath"/></div>
      </div>

      <div class="rows p-2">
        <template v-if="!isCollapsed">
          <Grid shrink style="grid-template-columns: 100fr 1fr 1fr;">
            <TreeviewRow
                v-for="key in Object.keys(sortedObjRowsOnly)"
                :parent-path="currentPath"
                :objectKey="key"
                :obj="obj[key]"
                @drop="onDrop"
                @dragover.prevent
                @dragenter.prevent
            />
          </Grid>

          <TreeviewRow
              v-for="key in Object.keys(sortedObjObjectsOnly)"
              :parent-path="currentPath"
              :objectKey="key"
              :obj="obj[key]"
          />
        </template>
      </div>

    </div>
  </template>

  <!-- Actual row -->
  <template  v-if="!isGroupObject">
    <GridColumn class="w-full" column="1">
      <span class="mr-2">{{currentPath.join('.')}}</span>
      <i-ic-delete @click="onClickDelete" class="delete-button"/>
      <div class="mr-1"><RenameDialog :obj="obj" :currentPath="currentPath"/></div>
    </GridColumn>
    <GridColumn class="row"
        v-for="(key, index) in Object.keys(sortedObj)"
        :column="index + 2"
        >
      <input type="text" class="input input-bordered w-64" v-model="obj[key]" :tabindex="tabByColumn ? index + 1 : null">
    </GridColumn>
  </template>
</template>

<script>
import Grid from '../components/Grid/Grid.vue'
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
  components: {Grid, AddObjectDialog, AddKeyDialog, Dialog, GridColumn, RenameDialog},
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
      if (isGroupObject.value) {
        return {
          'margin-left': (currentPath.value.length - 1) + 'rem'
        }
      } else {
        return {
          'margin-left': (currentPath.value.length - 2) + 'rem'
        }
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

    const sortedObjRowsOnly = computed(() => {
      return __(props.obj).toPairs().filter((obj) => {
        let firstSubObj = obj[1][Object.keys(obj[1])[0]]
        if (typeof firstSubObj === 'string') {
          return obj
        }
      }).sortBy(0).fromPairs().value()
    })

    const sortedObjObjectsOnly = computed(() => {
      return __(props.obj).toPairs().filter((obj) => {
        let firstSubObj = obj[1][Object.keys(obj[1])[0]]
        if (typeof firstSubObj !== 'string') {
          return obj
        }
      }).sortBy(0).fromPairs().value()
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
      sortedObj,
      sortedObjRowsOnly,
      sortedObjObjectsOnly
    }
  }
}
</script>

<style lang="scss" scoped>

.groupRow {
  @apply bg-gray-300 rounded mt-4 py-2;
}

.groupLine {
  @apply relative z-10 border-l-4 border-zinc-300;
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