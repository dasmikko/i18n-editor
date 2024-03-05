<template>
  <button
    tabindex="-1"
    @click="dialogVisible = true"
  >
    <i-ic-round-data-object /> Add Object
  </button>
  <Dialog
    v-model="dialogVisible"
    title="Add Object"
  >
    <Grid>
      <GridColumn column="1">
        <input
          v-model="inputValue"
          type="text"
          @keypress.enter="onClickAddObject"
        >
      </GridColumn>
      <GridColumn
        column="1"
        justify="end"
      >
        <button
          class="outline mr-2"
          @click="dialogVisible = false"
        >
          Cancel
        </button>
        <button @click="onClickAddObject">
          Add Object
        </button>
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
export default {
  name: 'AddObjectDialog',
  components: {GridColumn, Grid, Dialog},
  props: {
    obj: Object
  },
  setup (props) {
    const dialogVisible = ref(false)
    const inputValue = ref('')

    const onClickAddObject = () => {
      if (!inputValue.value) return
      dialogVisible.value = false
      props.obj[inputValue.value] = {}
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
      onClickAddObject
    }
  }
}
</script>

<style scoped>

</style>