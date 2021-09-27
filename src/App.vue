<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import Grid from './components/Grid/Grid.vue'
import GridColumn from './components/Grid/GridColumn.vue'
import Treeview from "./TreeView/Treeview.vue";
import {onMounted, ref} from 'vue'

export default {
  name: 'App',
  components: {
    Treeview,
    HelloWorld,
    Grid,
    GridColumn
  },
  setup () {
    const langs = ref({
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
    })


    const setDeepValue = (obj, path, value) => {
      let newPath = [...path]
      const currentKey = newPath[0]

      if (newPath.length > 1) {
        if (!obj[currentKey]) obj[currentKey] = {}
        newPath.shift() // Remove first item
        setDeepValue(obj[currentKey], newPath, value)
      } else {
        obj[currentKey] = value
      }
    }

    const traverseObject = (object, currentPath) => {
      for (let key in object) {
        console.log(key)
        if (typeof object[key] === 'object') {
          traverseObject(object[key], [...currentPath, key])
        }
      }
    }


    onMounted(() => {
      //traverseObject(langs, [])
    })

    return {
      langs
    }
  }
}

</script>

<template>
  <Treeview :obj="langs"/>
  <pre>
    {{langs}}
  </pre>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
