function normalizeBoardName(s) {
  // const test = '`~!@#$%^&*()_+=[]{}\\|/;:\'",./<>?'
  return s
    .replace(/[`~!@#\$%^&*()_+=\[\]{}\\|;:'",./<>?]/g, '')
    .replace(/-/g, ' ')
    .trim()
    .replace(/ +/g, '-')
    .toLowerCase()
}

export default normalizeBoardName
