<template>
  <div class="options">
    <label for="tabbycolumn">
      <input type="checkbox" id="tabbycolumn" v-model="tabByColumn"> Tab by column
    </label>

    <AddLangDialog />
  </div>

  <Treeview :obj="langs"/>
  <pre class="rounded">{{langs}}</pre>
</template>

<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import Grid from './components/Grid/Grid.vue'
import GridColumn from './components/Grid/GridColumn.vue'
import Treeview from "./TreeView/Treeview.vue";
import {computed, customRef, onMounted, ref, watch} from 'vue'
import {useLangs} from './composables/useLangs.js'
import AddLangDialog from './components/Dialog/AddLangDialog.vue'

export default {
  name: 'App',
  components: {
    AddLangDialog,
    Treeview,
    HelloWorld,
    Grid,
    GridColumn
  },
  setup () {
    const langsComposable = useLangs()
    const tabByColumn = ref(false)

    onMounted(() => {
      langsComposable.langObj.value = {
        "common": {
          "logoff": {
            "da": "Log af",
            "en": "Logout"
          },
          "saveCurrentView": {
            "da": "Gem nuværende view",
            "en": "Save current view"
          },
          "search": {
            "da": "Søg",
            "en": "Search"
          }
        },
        "topnav": {
          "leftBurgerMenu": {
            "adminMenuItem": {
              "da": "Admin",
              "en": "Admin"
            },
            "usersMenuItem": {
              "da": "Brugere",
              "en": "Users"
            },
          },
          "noSavedSearches": {
            "da": "Ingen gemte søgninger",
            "en": "No saved searches"
          },
          "noSavedViews": {
            "da": "Ingen gemte views",
            "en": "No saved views"
          },
          "saveCurrentView": {
            "da": "Gem nuværende view",
            "en": "Save current view"
          },
          "savedSearches": {
            "da": "Gemte søgninger",
            "en": "Saved searches"
          },
          "savedViews": {
            "da": "Gemte views",
            "en": "Saved views"
          }
        }
      }

      langsComposable.findExistingLangs()
    })

    watch(
        tabByColumn,
        () => {
          langsComposable.tabDownColumn.value = tabByColumn.value
        }
    )

    return {
      langs: langsComposable.langObj,
      tabByColumn
    }
  }
}

</script>



<style lang="scss">
  .options {
    @apply flex mb-8;

    label {
      @apply bg-purple-500 text-white rounded p-2 select-none cursor-pointer mr-4;
    }
  }


</style>
