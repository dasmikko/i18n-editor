<template>
  <div class="w-screen h-screen flex items-center align-center justify-center">
    <div class="text-center">
      <p class="font-bold mb-2" style="font-size: 2rem;">i18n Editor</p>
      <input type="file" @change="filesChange" multiple accept="application/json">
      <LoadJsonDialog/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'indexPage',
  setup () {

    const filesChange = (event) => {
      const files = event.target.files

      console.log(files)

      for (const file of files) {
        console.log(file)

        let reader = new FileReaderSync()
        let jsonResult = reader.readAsText(file)
        consoel.log(jsonResult)
      }
    }

    return {
      filesChange
    }
  }
}
</script>

<style lang="scss" scoped>

</style>