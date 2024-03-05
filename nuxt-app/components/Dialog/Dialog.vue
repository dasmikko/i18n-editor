<template>
  <teleport to="body">
    <transition name="dialogTransition">
      <div v-if="modelValue">
        <div
          class="dialog-bg"
          @click="toggleDialog"
        />
        <div class="dialog">
          <p class="mb-2 font-bold">
            {{ title }}
          </p>
          <slot />
        </div>
      </div>
    </transition>
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
    @apply fixed w-screen h-screen bg-black top-0 left-0 opacity-30 z-30;
  }

  .dialog {
    @apply fixed left-1/2 top-1/2 block bg-white rounded p-4 transform -translate-y-1/2 -translate-x-1/2 shadow-xl z-40;
    min-width: 300px;
  }

  .dialogTransition-enter-active,
  .dialogTransition-leave-active {
    @apply transition-all duration-200;

    .dialog {
      @apply transition-all duration-200 origin-center transform scale-100 -translate-y-1/2 -translate-x-1/2;
    }
  }

  .dialogTransition-enter-from,
  .dialogTransition-leave-to {
    opacity: 0;

    .dialog {
      @apply transform origin-center scale-50 -translate-y-1/2 -translate-x-1/2;
    }
  }
</style>