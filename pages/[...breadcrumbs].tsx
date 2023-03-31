import React from 'react'
import { useRouter } from 'next/router'
import ClientOnly from '.../components/ClientOnly'
import Header from '.../components/Header'
import BoardHeader from '.../components/BoardHeader'
import BoardCanvas from '.../components/BoardCanvas'
import Board from '.../components/Board'
import BoardMenu from '.../components/BoardMenu'
import CardDetailWindow from '.../components/CardDetailWindow'
import { resetServerContext } from 'react-beautiful-dnd'
import { nanoid } from 'nanoid'
import cx from 'classnames'
import generateSentence from '.../utils/generateSentence'
import normalizeUrlName from '.../utils/normalizeUrlName'

// TODO: data for custom system scroll: console.log(window.scrollX, document.body.scrollWidth, document.body.clientWidth)

type IProps = {
  issues: []
  boardId: string
  favorites: []
  members: []
  urlName: string
  issueId: string
}

export const getServerSideProps = async ({ query: { breadcrumbs } }): IProps => {
  resetServerContext()
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
  const members = await fetch('https://randomuser.me/api/?results=6')
    .then((res) => res.json())
    .then((data) => data.results)
  const actions = [
    {
      id: 'a-0',
      member: members[0],
      createdBy: '2023-02-23 20:21:22',
      record: 'comment',
      args: { text: '123' },
    },
    {
      id: 'a-01',
      member: members[0],
      createdBy: '2023-02-23 20:21:22',
      record: 'comment',
      args: { text: '321' },
    },
    {
      id: 'a-1',
      member: members[0],
      createdBy: '2023-02-23 20:21:22',
      record: 'addAttachment',
      args: {
        url: '/attachments/screen1.png',
        thumbnail: '/attachments/previews/screen1.png',
      },
    },
    {
      id: 'a-2',
      member: members[0],
      createdBy: '2023-02-23 20:21:22',
      record: 'deleteAttachment',
      args: { url: '/attachments/LICENSE' },
    },
    {
      id: 'a-3',
      member: members[0],
      createdBy: '2023-02-23 20:21:22',
      record: 'inviteMember',
      args: { member: members[0] },
    },
    {
      id: 'a-4',
      member: members[0],
      createdBy: '2023-02-23 20:21:22',
      record: 'leftMember',
      args: { member: members[0] },
    },
    {
      id: 'a-5',
      member: members[0],
      createdBy: '2023-02-23 20:21:22',
      record: 'addCard',
      args: { listTitle: 'Backlog' },
    },
    {
      id: 'a-51',
      member: members[0],
      createdBy: '2023-02-23 20:21:22',
      record: 'moveCard',
      args: { listTitle1: 'Backlog', listTitle2: 'To Do' },
    },
    {
      id: 'a-6',
      member: members[0],
      createdBy: '2023-02-23 20:21:22',
      record: 'archiveCard',
    },
    {
      id: 'a-7',
      member: members[0],
      createdBy: '2023-02-23 20:21:22',
      record: 'unarchiveCard',
    },
    {
      id: 'a-8',
      member: members[0],
      createdBy: '2023-02-23 20:21:22',
      record: 'closeDueDate',
    },
    {
      id: 'a-9',
      member: members[0],
      createdBy: '2023-02-23 20:21:22',
      record: 'reopenDueDate',
    },
    {
      id: 'a-10',
      member: members[0],
      createdBy: '2023-02-23 20:21:22',
      record: 'setDueDate',
      args: { dueDate: '2023-02-23 20:21:22' },
    },
    {
      id: 'a-11',
      member: members[0],
      createdBy: '2023-02-23 20:21:22',
      record: 'changeDueDate',
      args: { dueDate: '2023-02-23 20:21:22' },
    },
    {
      id: 'a-12',
      member: members[0],
      createdBy: '2023-02-23 20:21:22',
      record: 'deleteDueDate',
    },
    {
      id: 'a-13',
      member: members[0],
      createdBy: '2023-02-23 20:21:22',
      record: 'addChecklist',
      args: { checklistTitle: 'Чек-лист' },
    },
    {
      id: 'a-14',
      member: members[0],
      createdBy: '2023-02-23 20:21:22',
      record: 'deleteChecklist',
      args: { checklistTitle: 'Чек-лист' },
    },
    {
      id: 'a-15',
      member: members[0],
      createdBy: '2023-02-23 20:21:22',
      record: 'renameChecklist',
      args: { oldChecklistTitle: 'Чек-лист', newChecklistTitle: 'Проверить' },
    },
  ]
  const issues = Array.from({ length: 4 }, (v, k) => k).map((k) => ({
    id: `id-${k}`,
    title: `Issue ${k} ` + generateSentence(),
    description: '',
    members,
    labels,
    actions,
  }))
  const route = breadcrumbs[0] // TODO: w || u || b || c
  const routes = ['b', 'c']
  if (!routes.includes(route)) {
    return {
      notFound: true,
    }
  }
  const boardId = breadcrumbs[1] // if route === 'b'
  const urlName =
    route === 'b' ? normalizeUrlName('Пупер: My  Name  43 -- Супер!- -') : breadcrumbs[2] // TODO: get boardName from DB
  const favorites = [
    {
      boardId,
      name: 'Minsk4',
      workspace: 'Andrew Ka',
      color: '#cd5a91',
      wallpapper: '/wallpapper.jpg',
    },
    {
      boardId: nanoid(8),
      name: 'Minsk16',
      workspace: 'Andrew Ka',
      color: '#cd5a91',
      wallpapper: '/wallpapper.jpg',
    },
  ]
  return { props: { issues, boardId, issueId: null, urlName, favorites, members } }
}

// TODO: will-change: transform

function Router({ urlName, children, renderCardDetailWindow }) {
  const router = useRouter()
  const { breadcrumbs } = router.query
  const [isUrlName, setIsUrlName] = React.useState(false)
  React.useEffect(() => {
    if (breadcrumbs === undefined) {
      return
    }
    if (breadcrumbs[0] === 'b' && breadcrumbs[2] !== urlName) {
      router.push(`/${breadcrumbs[0]}/${breadcrumbs[1]}/${urlName}`, undefined, {
        shallow: true,
      })
      return
    }
    setIsUrlName(true)
  }, [breadcrumbs])
  if (!isUrlName) {
    return
  }
  return (
    <>
      {children}
      {breadcrumbs[0] === 'c' && renderCardDetailWindow()}
    </>
  )
}

function BoardPage({ issues, members, boardId, favorites: defaultFavorites, urlName }: IProps) {
  const [isMenu, setIsMenu] = React.useState(false)
  const [hasMenu, setHasMenu] = React.useState(false)
  const toggleMenu = () => {
    setIsMenu(!isMenu)
    setTimeout(() => {
      setHasMenu(!hasMenu)
    })
  }
  const [favorites, setFavorites] = React.useState(defaultFavorites)
  const handleChangeFavorites = (value) => {
    if (value) {
      setFavorites([
        ...favorites,
        {
          boardId,
          name: 'Minsk4',
          workspace: 'Andrew Ka',
          color: '#cd5a91',
          wallpapper: '/wallpapper.jpg',
        },
      ])
    } else {
      setFavorites(favorites.filter((item) => item.boardId !== boardId))
    }
  }
  const handleDeleteFavorites = (deletedBoardId) => {
    setFavorites(favorites.filter((item) => item.boardId !== deletedBoardId))
  }
  const version = 'V2'
  const renderCardDetailWindow = () => <CardDetailWindow issue={issues[0]} />
  return (
    <ClientOnly>
      <Router {...{ urlName, renderCardDetailWindow }}>
        {version === 'V2' && (
          <>
            <div className="fixed top-0 right-0 bottom-0 left-0 flex flex-col bg-[var(--body-dark-board-background)]">
              <Header {...{ favorites, handleDeleteFavorites }} />
              <BoardHeader
                {...{
                  members,
                  boardId,
                  hasMenu,
                  toggleMenu,
                  favorites,
                  handleChangeFavorites,
                }}
              />
              <div id="board-warnings"></div>
              <Board {...{ issues, isMenu, hasMenu }} />
            </div>
            <div className="fixed top-0 right-0 bottom-0 mt-[44px]">
              <BoardMenu {...{ hasMenu, toggleMenu }} />
            </div>
          </>
        )}
        {version === 'V1' && (
          <>
            <div
              id="chrome-container"
              // className="body-dark-board-background"
              className="fixed top-0 left-0 right-0 h-full bg-[var(--window-background)]" // overflow-hidden
            >
              <div id="surface" className="flex h-full flex-col">
                <Header {...{ favorites, handleDeleteFavorites }} />
                <div className="flex grow flex-col">
                  <div className="flex flex-1 flex-row">
                    <div id="content-wrapper" className="flex flex-1 flex-col">
                      <div id="content" className="relative grow">
                        <div id="board-wrapper" className="absolute top-0 left-0 right-0 bottom-0">
                          <div
                            id="board-main-content"
                            className={cx(
                              isMenu && `md:mr-[339px]`, // !! соответствует Drawer.width
                              'mr-0 flex h-full flex-col',
                            )}
                            style={{
                              transition: 'margin 0.3s ease-in', // !! 0.3s for Drawer.afterOpenChange
                            }}
                          >
                            <BoardHeader
                              {...{
                                members,
                                boardId,
                                hasMenu,
                                toggleMenu,
                                favorites,
                                handleChangeFavorites,
                              }}
                            />
                            <div id="board-warnings"></div>
                            <Board {...{ issues }} />
                          </div>
                          <BoardMenu {...{ hasMenu, toggleMenu }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Router>
    </ClientOnly>
  )
}

export default BoardPage
