<template>
  <div class="treeview">
    <TreeViewRow
      v-for="key in Object.keys(sortedObj)"
      :object-key="key"
      :obj="obj[key]"
    />
  </div>
</template>

<script>
import {computed} from 'vue'
import __ from 'lodash'
export default {
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