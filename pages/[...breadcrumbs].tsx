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
import CardEditWindow from '.../components/CardEditWindow'
// import FontFaceObserver from '.../components/FontFaceObserver'
import { resetServerContext } from 'react-beautiful-dnd'
import { nanoid } from 'nanoid'
import cx from 'classnames'
import normalizeUrlName from '.../utils/normalizeUrlName'
import getInitialData from '.../utils/getInitialData'
import getData, { ShortRoute } from '.../repositories/getData'
import { useOverlayScrollbars } from 'overlayscrollbars-react'

// TODO: обновить antd@^5.2.0 (сейчас его нельзя трогать)
// TODO: data for custom system scroll: console.log(window.scrollX, document.body.scrollWidth, document.body.clientWidth)

type IProps = {
  boardId: string
  favorites: []
  members: []
  urlName: string
  lists: {}
  listsOrder: []
  cards: {}
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
      date: '2023-02-23 20:21:22',
      record: 'comment',
      args: { text: '123' },
    },
    {
      id: 'a-01',
      member: members[0],
      date: '2023-02-23 20:21:22',
      record: 'comment',
      args: { text: '321' },
    },
    {
      id: 'a-1',
      member: members[0],
      date: '2023-02-23 20:21:22',
      record: 'addAttachment',
      args: {
        url: '/attachments/screen1.png',
        thumbnail: '/attachments/previews/screen1.png',
      },
    },
    {
      id: 'a-2',
      member: members[0],
      date: '2023-02-23 20:21:22',
      record: 'deleteAttachment',
      args: { url: '/attachments/LICENSE' },
    },
    {
      id: 'a-3',
      member: members[0],
      date: '2023-02-23 20:21:22',
      record: 'inviteMember',
      args: { member: members[0] },
    },
    {
      id: 'a-4',
      member: members[0],
      date: '2023-02-23 20:21:22',
      record: 'leftMember',
      args: { member: members[0] },
    },
    {
      id: 'a-5',
      member: members[0],
      date: '2023-02-23 20:21:22',
      record: 'addCard',
      args: { listTitle: 'Backlog' },
    },
    {
      id: 'a-51',
      member: members[0],
      date: '2023-02-23 20:21:22',
      record: 'moveCard',
      args: { oldListTitle: 'Backlog', newListTitle: 'To Do' },
    },
    {
      id: 'a-6',
      member: members[0],
      date: '2023-02-23 20:21:22',
      record: 'archiveCard',
    },
    {
      id: 'a-7',
      member: members[0],
      date: '2023-02-23 20:21:22',
      record: 'unarchiveCard',
    },
    {
      id: 'a-8',
      member: members[0],
      date: '2023-02-23 20:21:22',
      record: 'closeDueDate',
    },
    {
      id: 'a-9',
      member: members[0],
      date: '2023-02-23 20:21:22',
      record: 'reopenDueDate',
    },
    {
      id: 'a-10',
      member: members[0],
      date: '2023-02-23 20:21:22',
      record: 'setDueDate',
      args: { dueDate: '2023-02-23 20:21:22' },
    },
    {
      id: 'a-11',
      member: members[0],
      date: '2023-02-23 20:21:22',
      record: 'changeDueDate',
      args: { dueDate: '2023-02-23 20:21:22' },
    },
    {
      id: 'a-12',
      member: members[0],
      date: '2023-02-23 20:21:22',
      record: 'deleteDueDate',
    },
    {
      id: 'a-13',
      member: members[0],
      date: '2023-02-23 20:21:22',
      record: 'addChecklist',
      args: { checklistTitle: 'Чек-лист' },
    },
    {
      id: 'a-14',
      member: members[0],
      date: '2023-02-23 20:21:22',
      record: 'deleteChecklist',
      args: { checklistTitle: 'Чек-лист' },
    },
    {
      id: 'a-15',
      member: members[0],
      date: '2023-02-23 20:21:22',
      record: 'renameChecklist',
      args: { oldChecklistTitle: 'Чек-лист', newChecklistTitle: 'Проверить' },
    },
  ]
  const shortRoute = breadcrumbs[0]
  const shortRoutes: ShortRoute[] = ['w', 'u', 'b', 'c']
  if (!shortRoutes.includes(shortRoute)) {
    return { notFound: true }
  }
  // TODO: [redirect](https://nextjs.org/docs/pages/api-reference/functions/get-server-side-props#redirect)
  const boardId = breadcrumbs[1] // if shortRoute === 'b'
  const urlName =
    shortRoute === 'b' ? normalizeUrlName('Пупер: My  Name  43 -- Супер!- -') : breadcrumbs[2] // TODO: get boardName from DB
  const data = await getData(shortRoute)
  // console.log(data.board?.lists[0].cards)
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
  const { lists, listsOrder, cards } = getInitialData({ members, actions })
  return {
    props: { boardId, urlName, favorites, members, lists, listsOrder, cards },
  }
}

// TODO: will-change: transform

function Router({ urlName, children, renderCardDetailWindow, renderCardEditWindow }) {
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
    if (breadcrumbs[0] === 'b') {
      // FIX: возврат после /c/itemId на /b/boardId стрелкой 'back' в Chrome - не возвращается фокус куда надо;
      // в итоге стрелки на клаве работают неправильно
      setTimeout(() => {
        document.getElementById('board-wrapper').focus()
      })
    }
  }, [breadcrumbs, router, urlName])
  if (!isUrlName) {
    return
  }
  return (
    <>
      {children}
      {breadcrumbs[0] === 'c' ? renderCardDetailWindow() : renderCardEditWindow()}
    </>
  )
}

function BoardPage({
  members,
  boardId,
  favorites: defaultFavorites,
  urlName,
  lists,
  listsOrder,
  cards,
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
    const id = Object.keys(cards)[0]
    return <CardDetailWindow card={cards[id]} />
  }
  const renderCardEditWindow = () => {
    return hasMenu || <CardEditWindow />
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
      {version === 'V3' && (
        <Router {...{ urlName, renderCardDetailWindow, renderCardEditWindow }}>
          <BoardState {...{ lists, listsOrder, cards }}>
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
        </Router>
      )}
      {version === 'V2' && (
        <Router {...{ urlName, renderCardDetailWindow, renderCardEditWindow }}>
          <BoardState {...{ lists, listsOrder, cards }}>
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
        </Router>
      )}
      {version === 'V1' && (
        <Router {...{ urlName, renderCardDetailWindow, renderCardEditWindow }}>
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
                          <Board {...{ lists, listsOrder, cards }} />
                        </div>
                        <BoardMenu {...{ hasMenu, toggleMenu }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Router>
      )}
      {/* </FontFaceObserver> */}
    </ClientOnly>
  )
}

export default BoardPage
