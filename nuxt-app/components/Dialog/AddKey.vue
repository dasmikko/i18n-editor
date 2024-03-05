<template>
  <button
    tabindex="-1"
    @click="dialogVisible = true"
  >
    <i-ic-round-key /> Add Key
  </button>
  <Dialog
    v-model="dialogVisible"
    title="Add Key"
  >
    <Grid>
      <GridColumn column="1">
        <input
          v-model="inputValue"
          type="text"
          @keypress.enter="onClickAddKey"
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
        <button @click="onClickAddKey">
          Add key
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
  name: 'AddKeyDialog',
  components: {GridColumn, Grid, Dialog},
  props: {
    obj: Object
  },
  setup (props) {
    const dialogVisible = ref(false)
    const inputValue = ref('')
    const langsComposable = useLangs()


    const onClickAddKey = () => {
      if (!inputValue.value) return
      dialogVisible.value = false

      props.obj[inputValue.value] = {}
      langsComposable.langs.value.forEach(key => {
        props.obj[inputValue.value][key] = ''
      })

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
      onClickAddKey
    }
  }
}
</script>

<style scoped>

</style>