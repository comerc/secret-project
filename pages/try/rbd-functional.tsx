import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from '@emotion/styled'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import type { Quote as QuoteType } from '../types'
import { resetServerContext } from 'react-beautiful-dnd'

import { LoremIpsum } from 'lorem-ipsum'

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

export const getServerSideProps = async ({ query }) => {
  resetServerContext()
  const initial = Array.from({ length: 100 }, (v, k) => k).map((k) => {
    const custom: Quote = {
      id: `id-${k}`,
      content: `Quote ${k} ` + lorem.generateWords(getRandomInt(5)),
    }

    return custom
  })
  return { props: { initial } }
}

const grid = 8
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const QuoteItem = styled.div`
  width: 200px;
  border: 1px solid grey;
  margin-bottom: ${grid}px;
  background-color: lightblue;
  padding: ${grid}px;
`

function Quote({ quote, index }) {
  return (
    <Draggable draggableId={quote.id} index={index}>
      {(provided) => (
        <QuoteItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {quote.content}
        </QuoteItem>
      )}
    </Draggable>
  )
}

const QuoteList = React.memo(function QuoteList({ quotes }) {
  return quotes.map((quote: QuoteType, index: number) => (
    <Quote quote={quote} index={index} key={quote.id} />
  ))
})

function TryRBDFunctionalPage({ initial }) {
  const [state, setState] = useState({ quotes: initial })

  function onDragEnd(result) {
    if (!result.destination) {
      return
    }
    if (result.destination.index === result.source.index) {
      return
    }
    const quotes = reorder(state.quotes, result.source.index, result.destination.index)
    setState({ quotes })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <React.StrictMode>
        <Droppable droppableId="list">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <QuoteList quotes={state.quotes} />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </React.StrictMode>
    </DragDropContext>
  )
}

export default TryRBDFunctionalPage
