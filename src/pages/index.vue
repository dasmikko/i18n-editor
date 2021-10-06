<template>
  <div class="w-screen h-screen flex items-center align-center justify-center">
    <div class="text-center">
      <p class="font-bold mb-2" style="font-size: 2rem;">i18n Editor</p>
      <label for=""><input type="file" multiple accept="application/json"> Select file(s)</label>
      <LoadJsonDialog/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'indexPage'
}
</script>

<style lang="scss" scoped>

</style>