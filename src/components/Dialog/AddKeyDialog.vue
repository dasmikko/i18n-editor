<template>
  <button class="btn btn-xs gap-2" @click="dialogVisible = true" tabindex="-1">
    <i-ic-round-key/> Add Key
  </button>
  <Dialog title="Add Key" v-model="dialogVisible">
    <Grid>
      <GridColumn column="1">
        <input type="text" v-model="inputValue" @keypress.enter="onClickAddKey">
      </GridColumn>
      <GridColumn column="1" justify="end">
        <button class="outline mr-2" @click="dialogVisible = false">Cancel</button>
        <button @click="onClickAddKey">Add key</button>
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