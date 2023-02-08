function normalizeBoardName(s) {
  return s
    .replace(/\-/, ' ')
    .replace(/[^a-z0-9\ ]/gi, '')
    .trim()
    .replace(/  +/g, '-')
    .toLowerCase()
}

export default normalizeBoardName
