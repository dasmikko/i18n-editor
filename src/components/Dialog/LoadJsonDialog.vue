<template>
  <button @click="dialogVisible = true" tabindex="-1">
    <i-ic-sharp-upload/> Load i18n JSON
  </button>
  <Dialog title="Load i18n JSON" v-model="dialogVisible">
    <Grid>
      <GridColumn column="1">
        <textarea type="text" v-model="inputValue" @keypress.enter="onClickAddKey"></textarea>
      </GridColumn>
      <GridColumn column="1" class="disableFlex">
        <Grid>
          <GridColumn column="1">
            <template v-if="inputValue">
              <span class="text-green-500" v-if="jsonIsValid">JSON is valid!</span>
              <span class="text-red-500" v-else>JSON NOT valid!</span>
            </template>
          </GridColumn>
          <GridColumn column="2" justify="end">
            <button @click="onClickAddKey">Load Json</button>
          </GridColumn>
        </Grid>
      </GridColumn>
    </Grid>
  </Dialog>
</template>

<script>
import Dialog from './Dialog.vue'
import {computed, ref, watch} from 'vue'
import Grid from '../Grid/Grid.vue'
import GridColumn from '../Grid/GridColumn.vue'
import {useLangs} from '../../composables/useLangs.js'
export default {
  name: 'LoadJsonDialog',
  components: {GridColumn, Grid, Dialog},
  props: {
    obj: Object
  },
  setup (props) {
    const dialogVisible = ref(false)
    const inputValue = ref('')
    const langsComposable = useLangs()

    const jsonIsValid = computed(() => {
      try {
        JSON.parse(inputValue.value)
        return true
      } catch (e) {
        return false
      }
    })


    const onClickAddKey = () => {
      if (!inputValue.value || !jsonIsValid.value) return
      dialogVisible.value = false

      langsComposable.langObj.value = JSON.parse(inputValue.value)
      langsComposable.findExistingLangs()

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
      onClickAddKey,
      jsonIsValid
    }
  }
}
</script>

<style scoped>

</style>