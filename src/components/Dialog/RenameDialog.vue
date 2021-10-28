<template>
  <i-ic-round-drive-file-rename-outline @click="dialogVisible = true" class="rename-button" tabindex="-1"/>
  <Dialog title="Rename" v-model="dialogVisible">
    <Grid>
      <GridColumn column="1">
        <input type="text" v-model="inputValue" @keypress.enter="onClickAddKey">
      </GridColumn>
      <GridColumn column="1" justify="end">
        <button @click="onClickRename">Rename</button>
      </GridColumn>
    </Grid>
  </Dialog>
</template>

<script>
import Dialog from './Dialog.vue'
import {ref, watch} from 'vue'
import Grid from '../Grid/Grid.vue'
import GridColumn from '../Grid/GridColumn.vue'
import {useLangs} from '../../composables/useLangs.js'
import _get from 'lodash/get.js'
import _set from 'lodash/set.js'
import _unset from 'lodash/unset.js'

export default {
  name: 'RenameDialog',
  components: {GridColumn, Grid, Dialog},
  props: {
    obj: Object,
    currentPath: Array
  },
  setup (props) {
    const dialogVisible = ref(false)
    const inputValue = ref(props.currentPath[props.currentPath.length - 1])
    const langsComposable = useLangs()
    const oldKey = props.currentPath[props.currentPath.length - 1]

    const onClickRename = () => {
      if (!inputValue.value) return
      dialogVisible.value = false

      let newPath = [...props.currentPath]
      newPath.pop()
      newPath.push(inputValue.value)

      // Inset new key with same data
      _set(langsComposable.langObj.value, newPath, props.obj)

      // Remove old
      _unset(langsComposable.langObj.value, props.currentPath)
      inputValue.value = ''
    }

    watch(
        dialogVisible,
        (val) => {
          if (!val) inputValue.value = ''
        }
    )

    return {
      dialogVisible,
      inputValue,
      onClickRename,
    }
  }
}
</script>

<style lang="scss" scoped>

.delete-button, .rename-button {
  @apply mr-1 inline-block text-gray-400 cursor-pointer transition;

  &:hover {
    @apply text-gray-500;
  }
}

</style>