export const $_helper_treeTransform = data => configRootTree(transform(data))

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
