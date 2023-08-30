function getListIdByParent(node) {
  // TODO: element.closest()
  while (node !== null) {
    node = node.parentNode
    const result = node?.dataset?.listId
    if (result) {
      return result
    }
  }
  return false
}

export default getListIdByParent