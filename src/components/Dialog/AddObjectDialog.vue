<template>
  <button class="btn btn-xs gap-2" @click="dialogVisible = true" tabindex="-1">
    <i-ic-round-data-object/> Add Object
  </button>
  <Dialog title="Add Object" v-model="dialogVisible">
    <Grid>
      <GridColumn column="1">
        <input type="text" class="input input-bordered w-full" v-model="inputValue" @keypress.enter="onClickAddObject">
      </GridColumn>
    </Grid>

    <template v-slot:actions>
      <button class="btn btn-outline" @click="dialogVisible = false">Cancel</button>
      <button class="btn btn-primary" @click="onClickAddObject">Add Object</button>
    </template>
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