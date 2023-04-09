import { nanoid } from 'nanoid'
import generateSentence from '.../utils/generateSentence'

let itemIdSequence = 0

function getIssues(count, columnId, { members, actions }) {
  const labels = [
    {
      id: 1,
      colorId: '1-1',
      name: '1-1',
    },
    {
      id: 2,
      colorId: '1-2',
      name: '1-2',
    },
    {
      id: 3,
      colorId: '1-3',
      name: '1-3',
    },
    // {
    //   id: 4,
    //   colorId: '1-4',
    //   name: '1-4',
    // },
    // {
    //   id: 5,
    //   colorId: '1-5',
    //   name: '1-5',
    // },
    // {
    //   id: 6,
    //   colorId: '1-6',
    //   name: '1-6',
    // },
    // {
    //   id: 7,
    //   colorId: '4-2',
    //   name: 'Моя очень-очень-очень длинная метка',
    // },
  ]
  const issues = Array.from({ length: count }, () => {
    const id = ++itemIdSequence
    return {
      id: `${id}`,
      title: `#${id} ${generateSentence()}`,
      description: '',
      members,
      labels,
      actions,
    }
  }).reduce((accumulator, currentValue) => {
    accumulator[currentValue.id] = currentValue
    return accumulator
  }, {})
  return issues
}

function getInitialData({ members, actions }) {
  let issues = {}
  const columnTitles = ['To Do', 'In Progress', 'Done']
  const columns = columnTitles
    .map((columnTitle) => {
      const columnId = nanoid(8)
      const columnIssues = getIssues(40, columnId, { members, actions })
      issues = { ...issues, ...columnIssues }
      return {
        id: columnId,
        title: columnTitle,
        // issues: columnIssues,
        issuesOrder: Object.keys(columnIssues),
      }
    })
    .reduce((accumulator, currentValue) => {
      accumulator[currentValue.id] = currentValue
      return accumulator
    }, {})
  const columnsOrder = Object.keys(columns)
  return { columns, columnsOrder, issues }
}

export default getInitialData
