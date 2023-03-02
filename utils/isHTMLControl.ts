function isHTMLControl(node) {
  const controls = ['A', 'BUTTON', 'TEXTAREA', 'INPUT']
  while (node !== null) {
    if (controls.includes(node.tagName) || node.role === 'button') {
      return true
    }
    node = node.parentNode
  }
  return false
}

export default isHTMLControl
