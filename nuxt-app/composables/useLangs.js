import {ref, computed} from 'vue'
const fileHandler = ref(null)
const langaugeObj = ref({})
const selectedTreeNode = ref({'Root': true})

export function useLangs() {


  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      reader.onload = function(evt) {
        resolve(evt.target.result)
      };
      reader.readAsText(file)
    })
  }

  const selectFiles = async () => {
    const pickerOpts = {
      types: [
        {
          description: 'i18n json files',
          accept: {
            'application/json': ['.json']
          }
        },
      ],
      excludeAcceptAllOption: true,
    };

    // Show the file selector
    fileHandler.value = await window.showOpenFilePicker(pickerOpts);

    const fileData = await fileHandler.value[0].getFile();

    console.log(fileData)
  }

  const mergedObjects = computed(() => {
    let merged = {}
    languages.value.forEach(lang => {
      merged = Object.assign(merged, lang.data)
    })
    return merged
  })

  function transformObject(input, parentPath = '') {
    // Function to create the key-path pairs for non-object values
    function createKeys(obj, path) {
      return Object.entries(obj).filter(([_, value]) => typeof value !== 'object' || value === null).map(([key, _]) => ({
        key,
        path: path ? `${path}.${key}` : key,
      }));
    }

    // Recursive function to handle objects and their nested structures
    function createChildren(obj, path) {
      return Object.entries(obj).filter(([_, value]) => typeof value === 'object' && value !== null).map(([key, value]) =>  transformObject(value, path ? `${path}.${key}` : key));
    }

    const keys = createKeys(input, parentPath);
    const children = createChildren(input, parentPath);

    return {
      key: parentPath || 'Root',
      label: parentPath.split('.').pop() || 'Root',
      path: parentPath || "",
      icon: 'pi pi-fw pi-folder',
      keys,
      children,
    };
  }

  const treeData = computed(() => {
    console.log(transformObject(mergedObjects.value))
    return [transformObject(mergedObjects.value)]
  })

  return {
    selectFiles,
    languages,
    mergedObjects,
    treeData,
    selectedTreeNode
  }
}