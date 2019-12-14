/* eslint-disable */
import { ROOT_GROUP_LAYERS_FOLDER_NAME } from "@/config/constants"

export const $_helper_treeTransform = data => configRootTree(transform(data))

let parentFound = false
let dataFound = {}

export const getOldParentNode = (data, categoryGroupId) => {
  parentFound = false
  dataFound = {}
  return xxx(data, categoryGroupId)
}

function xxx (data, categoryGroupId) {

  if (data['id'] === categoryGroupId) {
    parentFound = true
    dataFound = data
  } else if (data['children'] && !parentFound) {
    data['children'].forEach(ch => {
      if (!parentFound) return getOldParentNode(ch, categoryGroupId)
    })
  }
  return dataFound
}

  /**
   * Recursive function to prepare v-model structure
   * for vue-tree-list component
   * 
   * @param {Object} data 
   */
function transform (data) {
  data['name'] = data['name'] || data['label']
  data['label'] = data['name']
  // delete data['label']
  data['addLeafNodeDisabled'] = true
  
  if (data['children'] === undefined) {
    data['children'] = []
  }
    if (data['children'].length) {
      data['children'].forEach(ch => {
        transform(ch)
      })
    } else return

  return data
}

// VueTreeList props settings for ROOT_GROUP_LAYERS_FOLDER_NAME
const mainNodeSettings = {
  dragDisabled: true,
  addLeafNodeDisabled: true,
  // editNodeDisabled: true,
  delNodeDisabled: true,
}

/**
 * setting props only on ROOT_GROUP_LAYERS_FOLDER_NAME
 * 
 * @param {Object} data 
 */
function configRootTree (data) {
  if (data.id === 1) {
    Object.keys(mainNodeSettings).forEach(mns => {
      data[mns] = mainNodeSettings[mns]
    })
  }
  return data
}


// function treeTransform (data) {
//   data['label'] = data['title']

//   data['children'] = data['layers']
//   delete data['layers']

//   if (data['children'].length && !data['name']) {
//     data['children'].forEach(ch => {
//       treeTransform(ch)
//     })
//   } else return

//   return data
// }