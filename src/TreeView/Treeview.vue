<template>
  <Grid>
    <GridColumn column="1">
      Key
    </GridColumn>
    <GridColumn column="2">
      da
    </GridColumn>
    <GridColumn column="3">
      en
    </GridColumn>

    <GridColumn column="1 / 4">
      <hr>
    </GridColumn>

    <TreeviewRow
        v-for="key in Object.keys(obj)"
        :objectKey="key"
        :obj="obj[key]" />
  </Grid>
</template>

<script>

import Grid from '../components/Grid/Grid.vue'
import GridColumn from '../components/Grid/GridColumn.vue'
import TreeviewRow from './TreeviewRow.vue'
export default {
  name: "Treeview",
  components: {TreeviewRow, GridColumn, Grid},
  props: {
    obj: {
      type: Object,
      default: {}
    },
  },
  setup () {

  }
}
</script>

<style scoped>

</style>