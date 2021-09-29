<template>
  <teleport to="#dialogContainer">
    <div v-if="modelValue">
      <div class="dialog-bg" @click="toggleDialog"></div>
      <div class="dialog">
        <p class="mb-2 font-bold">{{title}}</p>
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>

<script>
import {ref} from 'vue'

export default {
  name: 'Dialog',
  props: {
    title: String,
    modelValue: Boolean
  },
  setup (props, {emit}) {

    const toggleDialog = () => {
      emit('update:modelValue', !props.modelValue)
    }

    return {
      toggleDialog
    }
  }
}
</script>

<style lang="scss" scoped>
  .dialog-bg {
    @apply fixed w-screen h-screen bg-black opacity-30 z-20;
  }

  .dialog {
    @apply fixed left-1/2 top-1/2 block bg-white rounded p-4 transform -translate-y-1/2 -translate-x-1/2 shadow-xl z-30;
    min-width: 300px;
  }
</style>