<template>
  <GridColumn column="1" :style="rowStyle">
    <button v-if="isGroupObject" @click="isCollapsed = !isCollapsed">
      <template v-if="!isCollapsed">
        V
      </template>
      <template v-else>
        >
      </template>
    </button>
    {{currentPath.join('.')}}
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
      <input v-model="obj[key]">
    </GridColumn>
  </template>

</template>

<script>
import GridColumn from '../components/Grid/GridColumn.vue'
import {computed, ref} from 'vue'
export default {
  name: 'TreeviewRow',
  components: {GridColumn},
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

    const rowStyle = computed(() => {
      return {
        'margin-left': (currentPath.value.length - 1) + 'rem'
      }
    })

    const currentPath = computed(() => {
      return [...props.parentPath, props.objectKey]
    })

    const isGroupObject = computed(() => {
      console.log(props.obj)
      console.log(typeof Object.keys(props.obj)[0] )

      let firstSubObj = props.obj[Object.keys(props.obj)[0]]
      console.log(firstSubObj)

      if (typeof firstSubObj !== 'string') {
        return true
      }
      return false
    })

    return {
      rowStyle,
      isCollapsed,
      isGroupObject,
      currentPath
    }
  }
}
</script>

<style scoped>

</style>