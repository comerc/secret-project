function getParentItemId(node) {
  // TODO: element.closest()
  while (node !== null) {
    node = node.parentNode
    const result = node?.dataset?.itemId
    if (result) {
      return result
    }
  }
  return false
}

export default getParentItemId
