<template>
  <button class="btn gap-2" @click="dialogVisible = true" tabindex="-1">
    <i-ic-round-language/> Add language
  </button>

  <Dialog title="Add Language" v-model="dialogVisible">
    <Grid>
      <GridColumn column="1">
        <input type="text" v-model="inputValue" @keypress.enter="onClickAddKey">
      </GridColumn>
    </Grid>

    <template v-slot:actions>
      <button class="outline mr-2" @click="dialogVisible = false">Cancel</button>
      <button @click="onClickAddKey">Add lang</button>
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