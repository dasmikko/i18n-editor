<template>
  <div class="grid-column" :style="styleObj">
    <slot></slot>
  </div>
</template>

<script>
import {computed} from 'vue'

export default {
  name: 'GridColumn',
  props: {
    column:  {
      type: [Number, String],
      default: () => 1,
      required: true
    },
    justify:  {
      type: String,
    }
  },
  setup(props) {
    const styleObj = computed(() => {
      return {
        'grid-column': props.column,
        'justify-self': props.justify
      }
    })

    return {
      styleObj
    }
  }
}
</script>

<style lang="scss" scoped>

  .grid-column {
    grid-row: auto;
    display: flex;
    align-items: center;
  }

</style>
