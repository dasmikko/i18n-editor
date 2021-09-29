<template>
  <button @click="dialogVisible = true" tabindex="-1">
    <i-ic-round-language/> Add language
  </button>
  <Dialog title="Add Language" v-model="dialogVisible">
    <Grid>
      <GridColumn column="1">
        <input type="text" v-model="inputValue" @keypress.enter="onClickAddKey">
      </GridColumn>
      <GridColumn column="1" justify="end">
        <button @click="onClickAddKey">Add lang</button>
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
  name: 'AddLangDialog',
  components: {GridColumn, Grid, Dialog},
  setup (props) {
    const dialogVisible = ref(false)
    const inputValue = ref('')
    const langsComposable = useLangs()


    const onClickAddKey = () => {
      if (!inputValue.value) return
      dialogVisible.value = false

      langsComposable.addNewLang(inputValue.value)

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