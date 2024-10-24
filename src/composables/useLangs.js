import {computed, ref} from 'vue'
import _get from 'lodash/get.js'
import _set from 'lodash/set.js'

const filename = ref('i18n.json')
const langObj = ref({})
const langs = ref([])
const tabDownColumn = ref(false)
const fileHandler = ref(null)
const isMergingFiles = ref(false)

const selectedNodeKey = ref({})
const disableKeyField = ref(true)

export function useLangs () {

  const searchObjectForLangs = (object, currentPath) => {
    for (let key in object) {
      if (langObj.value.length > 0) return
      if (typeof object[key] === 'object') {
        searchObjectForLangs(object[key], [...currentPath, key])
      }
      if (typeof object[key] === 'string') {
        langs.value = Object.keys(object)
        return
      }
    }
  }

  const findExistingLangs = () => {
    langs.value = []
    searchObjectForLangs(langObj.value, [])
  }


  const goThroughObjectAddingLang = (object, lang) => {
    for (let key in object) {
      if (langObj.value.length > 0) return
      if (typeof object[key] === 'object') {
        goThroughObjectAddingLang(object[key], lang)
      }
      if (typeof object[key] === 'string') {
        object[lang] = ''
        return
      }
    }
  }

  const addNewLang = (lang) => {
    goThroughObjectAddingLang(langObj.value, lang)
    findExistingLangs()
  }

  const goThroughObjectDeletingLang = (object, lang) => {
    for (let key in object) {
      if (langObj.value.length > 0) return
      if (typeof object[key] === 'object') {
        goThroughObjectDeletingLang(object[key], lang)
      }
      if (typeof object[key] === 'string') {
        delete object[lang]
      }
    }
  }

  const removeLang = (lang) => {
    goThroughObjectDeletingLang(langObj.value, lang)
    findExistingLangs()
  }


  const generateLangFileInNewFormat = (lObj) => {
    const langKeys = Object.keys(lObj)
    let mergedLangsObject = {}

    const recursiveTraverse = (obj, currentPath) => {
      for (let key in obj) {
        if (typeof obj[key] === 'object') {
          recursiveTraverse(obj[key], [...currentPath, key])
        }
        if (typeof obj[key] === 'string') {
          langKeys.forEach((langkey) => {
            const value = _get(lObj[langkey], [...currentPath, key])
            _set(mergedLangsObject, [...currentPath, key, langkey], value)
          })
        }
      }
    }

    recursiveTraverse(lObj[langKeys[0]], [])
    return mergedLangsObject
  }




  // Build a tree structure from an array of dot-separated paths // Thanks chatgpt
  const buildTree = (arr) => {
    const result = [];

    // Helper function to find or create a node
    function findOrCreateNode(pathParts, currentLevel, fullPath) {
      const currentKey = pathParts[0];
      const currentFullPath = fullPath ? `${fullPath}.${currentKey}` : currentKey;

      let node = currentLevel.find((item) => item.key === currentFullPath);

      if (!node) {
        node = {
          key: currentFullPath,
          label: currentKey

        };
        currentLevel.push(node);
      }

      if (pathParts.length > 1) {
        if (!node.children) {
          node.children = [];
        }
        findOrCreateNode(pathParts.slice(1), node.children, currentFullPath);
      }
    }

    // Process each item in the array
    arr.forEach((item) => {
      const pathParts = item.split('.');
      findOrCreateNode(pathParts, result, '');
    });

    return result;
  }

  // This is a goddamn mess
  const langsTree = computed(() => {
    let paths = []

    function traverseObject(obj, currentPath = []) {
      for (let key in obj) {
        // Create the new path including the current key
        const newPath = [...currentPath, key];

        if (typeof obj[key] === 'object') {
          // If it's an object, recurse deeper
          if (langs.value.includes(Object.keys(obj[key])[0])) {
            // Is a language object
            let path = currentPath.join('.')
            if (!paths.includes(path) && path !== '') {
              paths.push(path)
            } else if (!paths.includes(key) && path === '') {
              paths.push(key)
            }
          } else {
            // Is not language object
            let path = newPath.join('.')
            if (!paths.includes(path) && path !== '') {
              paths.push(path)
            } else if (!paths.includes(key) && path === '') {
              paths.push(key)
            }
            traverseObject(obj[key], newPath);
          }
        }
      }
    }
    traverseObject(langObj.value)
    return buildTree(paths)
  })



  return {
    filename,
    langObj,
    langs,
    tabDownColumn,
    findExistingLangs,
    addNewLang,
    removeLang,
    generateLangFileInNewFormat,
    fileHandler,
    isMergingFiles,

    selectedNodeKey,
    disableKeyField,

    langsTree
  }
}