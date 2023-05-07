function getParentColumnId(node) {
  // TODO: element.closest()
  while (node !== null) {
    node = node.parentNode
    const result = node?.dataset?.columnId
    if (result) {
      return result
    }
  }
  return false
}

export default getParentColumnId
