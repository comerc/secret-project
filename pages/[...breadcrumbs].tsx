import React from 'react'
import { useRouter } from 'next/router'
import ClientOnly from '.../components/ClientOnly'
import Header from '.../components/Header'
import Warning from '.../components/Warning'
import BoardHeader from '.../components/BoardHeader'
import BoardCanvas from '.../components/BoardCanvas'
import Board, { BoardState } from '.../components/Board'
import BoardMenu from '.../components/BoardMenu'
import CardDetailWindow from '.../components/CardDetailWindow'
// import FontFaceObserver from '.../components/FontFaceObserver'
import { resetServerContext } from 'react-beautiful-dnd'
import { nanoid } from 'nanoid'
import cx from 'classnames'
import normalizeUrlName from '.../utils/normalizeUrlName'
import getInitialData from '.../utils/getInitialData'
import { useOverlayScrollbars } from 'overlayscrollbars-react'

// TODO: data for custom system scroll: console.log(window.scrollX, document.body.scrollWidth, document.body.clientWidth)

type IProps = {
  boardId: string
  favorites: []
  members: []
  urlName: string
  columns: {}
  columnsOrder: []
  issues: {}
}

export const getServerSideProps = async ({ query: { breadcrumbs } }): IProps => {
  resetServerContext()
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
      args: { oldListTitle: 'Backlog', newListTitle: 'To Do' },
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
  const { columns, columnsOrder, issues } = getInitialData({ members, actions })
  return {
    props: { boardId, urlName, favorites, members, columns, columnsOrder, issues },
  }
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
  }, [breadcrumbs, router, urlName])
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

function BoardPage({
  members,
  boardId,
  favorites: defaultFavorites,
  urlName,
  columns,
  columnsOrder,
  issues,
}: IProps) {
  // @deprecated
  const [isMenu, setIsMenu] = React.useState(false)
  const [hasMenu, setHasMenu] = React.useState(false)
  const toggleMenu = () => {
    // setIsMenu(!isMenu)
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
  const version = 'V3'
  const renderCardDetailWindow = () => {
    const id = Object.keys(issues)[0]
    return <CardDetailWindow issue={issues[id]} />
  }
  // const isFontListLoaded = useFontFaceObserver([{ family: FONT_FAMILY }])
  const [initialize, osInstance] = useOverlayScrollbars({
    options: {
      overflow: {
        // x: isMenu === hasMenu ? 'scroll' : 'hidden',
        x: 'scroll',
        y: 'hidden',
      },
      scrollbars: {
        // theme: cx('os-theme-light board', hasMenu && 'has-menu'),
        theme: 'os-theme-light board',
        visibility: 'auto',
        autoHide: 'never',
        // autoHideDelay: 1300,
        dragScroll: true,
        clickScroll: true,
        pointers: ['mouse', 'touch', 'pen'],
      },
    },
    // events,
    defer: true,
  })
  React.useEffect(() => {
    initialize(document.body)
  }, [initialize])
  const hasWarning = false // TODO: показывать Warning
  return (
    <ClientOnly>
      {/* <FontFaceObserver> */}
      <Router {...{ urlName, renderCardDetailWindow }}>
        {version === 'V3' && (
          <BoardState {...{ columns, columnsOrder, issues }}>
            <div className="flex h-screen w-max flex-col bg-[var(--body-dark-board-background)]">
              <div className="sticky left-0 w-screen">
                <Header {...{ favorites, handleDeleteFavorites }} />
                {hasWarning && <Warning />}
                <BoardHeader
                  {...{
                    members,
                    boardId,
                    hasMenu: false, // !! отключено
                    toggleMenu,
                    favorites,
                    handleChangeFavorites,
                  }}
                />
              </div>
              <div className="grow pb-7">
                <Board
                  {...{
                    hasMenu: false, // !! отключено
                  }}
                />
              </div>
            </div>
            <BoardMenu {...{ hasMenu, toggleMenu }} />
          </BoardState>
        )}
        {version === 'V2' && (
          <BoardState {...{ columns, columnsOrder, issues }}>
            <div className="fixed bottom-0 left-0 right-0 top-0 flex flex-col bg-[var(--body-dark-board-background)]">
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
              <Board {...{ isMenu, hasMenu }} />
            </div>
            <div className="fixed bottom-0 right-0 top-0 mt-[44px]">
              <BoardMenu {...{ hasMenu, toggleMenu }} />
            </div>
          </BoardState>
        )}
        {version === 'V1' && (
          <>
            <div
              id="chrome-container"
              className="fixed left-0 right-0 top-0 h-full bg-[var(--body-dark-board-background)]" // overflow-hidden
            >
              <div id="surface" className="flex h-full flex-col">
                <Header {...{ favorites, handleDeleteFavorites }} />
                <div className="flex grow flex-col">
                  <div className="flex flex-1 flex-row">
                    <div id="content-wrapper" className="flex flex-1 flex-col">
                      <div id="content" className="relative grow">
                        <div id="board-wrapper" className="absolute bottom-0 left-0 right-0 top-0">
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
                            <Board {...{ columns, columnsOrder, issues }} />
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
      {/* </FontFaceObserver> */}
    </ClientOnly>
  )
}

export default BoardPage
