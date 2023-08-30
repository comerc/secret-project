function getCardIdByParent(node) {
  // TODO: element.closest()
  while (node !== null) {
    node = node.parentNode
    const result = node?.dataset?.cardId
    if (result) {
      return result
    }
  }
  return false
}

export default getCardIdByParent
