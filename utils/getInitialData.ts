import { nanoid } from 'nanoid'
import generateSentence from '.../utils/generateSentence'

let itemIdSequence = 0

function getIssues(count, columnId, { members, labels, actions }) {
  const issues = Array.from({ length: count }, () => {
    const id = itemIdSequence++
    return {
      id: `#${id}`,
      title: `#${id} ` + generateSentence(),
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

function getColumns({ members, labels, actions }) {
  const columnTitles = ['To Do', 'In Progress', 'Done']
  const columns = columnTitles
    .map((columnTitle) => {
      const columnId = nanoid(8)
      const issues = getIssues(4, columnId, { members, labels, actions })
      return {
        id: columnId,
        title: columnTitle,
        issues,
        issuesOrder: Object.keys(issues),
      }
    })
    .reduce((accumulator, currentValue) => {
      accumulator[currentValue.id] = currentValue
      return accumulator
    }, {})
  return columns
}

function getInitialData({ members, labels, actions }) {
  const columns = getColumns({ members, labels, actions })
  const columnsOrder = Object.keys(columns)
  return { columns, columnsOrder, selectedId: '' }
}

export default getInitialData
