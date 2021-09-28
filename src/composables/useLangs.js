import {ref} from 'vue'

const langObj = ref({})
const langs = ref([])
const tabDownColumn = ref(false)

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



  return {
    langObj,
    langs,
    tabDownColumn,
    findExistingLangs,
    addNewLang,
    removeLang

  }
}