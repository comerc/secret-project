function isHTMLControl(node, byNode) {
  const controls = ['A', 'BUTTON', 'TEXTAREA', 'INPUT']
  while (node !== null) {
    // console.log(node.tagName, node.role)
    if (node.role === 'button') {
      return true
    }
    if (node.role === 'dialog') {
      return !node.contains(byNode)
    }
    if (controls.includes(node.tagName)) {
      return true
    }
    node = node.parentNode
  }
  return false
}

export default isHTMLControl
