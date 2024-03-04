<template>
  <div class="grid" :class="{shrink: shrink}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Grid',
  props: {
    shrink: Boolean
  }
}
</script>

<style lang="scss" scoped>
  .grid {
    display: grid;
    grid-gap: 1rem 1rem;
    grid-auto-flow: row;
    justify-content: stretch;

    &.shrink {
      grid-auto-columns: max-content;
    }
  }
</style>
