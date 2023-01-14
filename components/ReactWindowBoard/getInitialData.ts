import generateSentence from '.../utils/generateSentence'

let uniqueId = 0
function getItems(count) {
  return Array.from({ length: count }, (v, k) => {
    const id = uniqueId++
    return {
      id: `id:${id}`,
      text: `item ${id} ` + generateSentence(),
    }
  })
}

const initial = {
  columns: {
    'column-0': {
      id: 'column-0',
      title: 'First column',
      items: getItems(3),
    },
    'column-1': {
      id: 'column-1',
      title: 'Second column',
      items: getItems(1000),
    },
  },
  // columnOrder: ['column-0'],
  columnOrder: ['column-0', 'column-1'],
}

export default function getInitialData() {
  return initial
}
