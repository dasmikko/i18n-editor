<template>
  <button
    tabindex="-1"
    @click="dialogVisible = true"
  >
    <i-ic-sharp-upload /> Paste JSON file
  </button>
  <Dialog
    v-model="dialogVisible"
    title="Load i18n JSON"
  >
    <Grid>
      <GridColumn column="1">
        <textarea
          v-model="inputValue"
          type="text"
          @keypress.enter="onClickAddKey"
        />
      </GridColumn>
      <GridColumn
        column="1"
        class="disableFlex"
      >
        <Grid>
          <GridColumn column="1">
            <template v-if="inputValue">
              <span
                v-if="jsonIsValid"
                class="text-green-500"
              >JSON is valid!</span>
              <span
                v-else
                class="text-red-500"
              >JSON NOT valid!</span>
            </template>
          </GridColumn>
          <GridColumn
            column="2"
            justify="end"
          >
            <button @click="onClickAddKey">
              Load Json
            </button>
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
import { useRouter } from 'vue-router'

export default {
  name: 'LoadJsonDialog',
  components: {GridColumn, Grid, Dialog},
  props: {
    obj: Object
  },
  setup (props) {
    const router = useRouter()
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
      router.replace('/editor')
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