<template>
  <button @click="dialogVisible = true" tabindex="-1">
    <i-ic-round-data-object/> Add Object
  </button>
  <Dialog title="Add Object" v-model="dialogVisible">
    <Grid>
      <GridColumn column="1">
        <input type="text" v-model="inputValue" @keypress.enter="onClickAddObject">
      </GridColumn>
      <GridColumn column="1" justify="end">
        <button @click="onClickAddObject">Add Object</button>
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