<template>
  <div class="treeview">
      <TreeviewRow
          v-for="key in Object.keys(sortedObj)"
          :objectKey="key"
          :obj="obj[key]" />
  </div>
</template>

<script>

import Grid from '../components/Grid/Grid.vue'
import GridColumn from '../components/Grid/GridColumn.vue'
import TreeviewRow from './TreeviewRow.vue'
import {useLangs} from '../composables/useLangs.js'
import {computed} from 'vue'
import AddObjectDialog from '../components/Dialog/AddObjectDialog.vue'
import __ from 'lodash'
export default {
  name: "Treeview",
  components: {AddObjectDialog, TreeviewRow, GridColumn, Grid},
  props: {
    obj: {
      type: Object,
      default: {}
    },
  },
  setup (props) {
    const langsComposable = useLangs()
    const langs = computed(() => {
      return langsComposable.langs.value
    })

    const sortedObj = computed(() => {
      return __(props.obj).toPairs().sortBy(0).fromPairs().value()
    })

    const onClickDeleteLang = (lang) => {
      if (confirm('Are you sure?')) langsComposable.removeLang(lang)
    }

    return {
      langs,
      sortedObj,
      onClickDeleteLang
    }
  }
}
</script>

<style lang="scss" scoped>
  .treeview {
    @apply mb-4;
  }
</style>