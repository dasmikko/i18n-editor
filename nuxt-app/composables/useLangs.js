import {ref} from 'vue'
import _get from 'lodash/get.js'
import _set from 'lodash/set.js'

const filename = ref('i18n.json')
const langObj = ref({})
const langs = ref([])
const tabDownColumn = ref(false)
const fileHandler = ref(null)
const isMergingFiles = ref(false)

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
    searchObjectForLangs(langObj, [])
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
    isMergingFiles
  }
}