<template>
  <GridColumn column="1" :style="rowStyle">
    <div class="fold-button" v-if="isGroupObject" @click="isCollapsed = !isCollapsed" >
      <template v-if="!isCollapsed">
        <i-ic-outline-arrow-drop-down style="width: 1rem;"/>
      </template>
      <template v-else>
        <i-ic-outline-arrow-right style="width: 1rem;"/>
      </template>
    </div>

    <span class="mr-4">
      {{currentPath.join('.')}}
    </span>

    <div class="mr-1"><AddObjectDialog v-if="isGroupObject" :obj="obj" /></div>
    <AddKeyDialog v-if="isGroupObject" :obj="obj"/>
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
      console.log(langsComposable.tabDownColumn.value)
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

    return {
      rowStyle,
      isCollapsed,
      isGroupObject,
      currentPath,
      tabByColumn
    }
  }
}
</script>

<style lang="scss" scoped>
.fold-button {
  @apply inline-block cursor-pointer;
}

</style>