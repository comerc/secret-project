import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  SearchOutlined,
  UserOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  StarOutlined,
  StarFilled,
  LockTwoTone,
  LockOutlined,
  GlobalOutlined,
  TeamOutlined,
  BlockOutlined,
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  DownOutlined,
  FilterOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  UserAddOutlined,
  BarsOutlined,
  // LayoutOutlined,
  EllipsisOutlined,
  MoreOutlined,
  // BookOutlined,
  ProjectOutlined,
  // ProfileOutlined,
  EditOutlined,
  EyeOutlined,
  ContainerOutlined,
  MessageOutlined,
  CheckSquareOutlined,
  PaperClipOutlined,
  BorderOutlined,
  CreditCardOutlined,
  TagOutlined,
  ArrowRightOutlined,
  CopyOutlined,
  LikeOutlined,
  DatabaseOutlined,
  ShareAltOutlined,
  FileDoneOutlined,
  UndoOutlined,
  MinusOutlined,
  PictureOutlined,
  DownloadOutlined,
  SmileOutlined,
  HeartOutlined,
} from '@ant-design/icons'
import {
  // Layout,
  Tooltip,
  Avatar,
  Form,
  Drawer,
  Button,
  Input,
  Checkbox,
  Modal,
  // Icon,
  Dropdown,
  Space,
  Divider,
  theme,
  // TODO: renderCloseIcon,
} from 'antd'
import type { MenuProps } from 'antd'
import cx from 'classnames'
import ClientOnly from '.../components/ClientOnly'
import { useWindowSize, useOnClickOutside, useIsFirstRender } from 'usehooks-ts'
import { resetServerContext } from 'react-beautiful-dnd'
import generateSentence from '.../utils/generateSentence'
import { nanoid } from 'nanoid'
import Image from 'next/image'
import normalizeUrlName from '.../utils/normalizeUrlName'
import labelColors from '.../utils/labelColors'
import pluralize from '.../utils/pluralize'
import dayjs from 'dayjs'
import ColorThief from 'colorthief'
import convertRGBToHSL from '.../utils/convertRGBToHSL'
import isHTMLControl from '.../utils/isHTMLControl'

// TODO: CardDetailChecklist(s)

const myThumbnail = 'https://avatars.githubusercontent.com/u/1025241?s=32&v=4'

function CommentBoxOptionsButton({ icon, title, onClick }) {
  return (
    <Button
      className={cx(
        'text-[var(--ds-icon,#42526e)]',
        'hover:bg-[var(--ds-background-neutral-hovered,#091e4214)]',
        'active:bg-[var(--ds-background-neutral-pressed,#091e4221)]',
        'rounded-[3px] border-0 leading-5 shadow-none',
      )}
      {...{ icon, title, onClick }}
    />
  )
}

function InlineSpacer() {
  return <span className="inline-block min-w-[4px]" />
}

function getActionContent({ record, args, createdByLink }) {
  const fn = actionRecords[record]
  if (record === 'comment') {
    const { isExpanded, setIsExpanded } = React.useContext(CommentBoxContext)
    const [isEditComment, setIsEditComment] = React.useState(false)
    React.useEffect(() => {
      if (!isExpanded) {
        setIsEditComment(false)
      }
    }, [isExpanded])
    return (
      <>
        <InlineSpacer />
        {createdByLink}
        {/* // TODO: (изменён) */}
        <div className="my-1 ">
          {isExpanded && isEditComment ? (
            <CommentBox defaultValue={args.text} close={() => setIsEditComment(false)} />
          ) : (
            <div className="action-comment truncate rounded-[3px] bg-[var(--ds-background-input,#fff)] py-2 px-3 text-[var(--ds-text,#172b4d)]">
              {args.text}
            </div>
          )}
        </div>
        <div className="text-[12px] leading-6 text-[var(--ds-text-subtle,#5e6c84)]">
          <Button
            className={cx(
              'mr-1 bg-transparent',
              'text-[var(--ds-icon-subtle,#6b778c)]',
              'hover:text-[var(--ds-icon-accent-gray,#172b4d)]',
              'h-6 w-4 rounded-none border-0 p-0 leading-6 shadow-none',
            )}
            icon={
              <SmileOutlined
                className="scale-95"
                onClick={() => {
                  // TODO: добавить смайлик для комментария
                }}
              />
            }
          ></Button>
          <LinkButton
            onClick={() => {
              setIsEditComment(true)
              setIsExpanded(true)
            }}
          >
            Изменить
          </LinkButton>
          <LinkButton
            onClick={() => {
              // TODO: удалить комментарий
              Modal.confirm()
            }}
          >
            Удалить
          </LinkButton>
          {/* // TODO: • В этом поле есть несохранённые изменения */}
        </div>
      </>
    )
  }
  if (['addAttachment', 'deleteAttachment'].includes(record)) {
    return (
      <>
        {fn()}{' '}
        <a href={args.url} className="text-[var(--ds-link,#172b4d)] underline">
          {getFilename(args.url)}
        </a>{' '}
        <InlineSpacer />
        {createdByLink}
        {/* // TODO: картинка */}
        {/* <div>{args.thumbnail}</div> */}
        <div>
          <button
            className="text-xs text-[var(--ds-text-subtle,#5e6c84)] underline hover:text-[var(--ds-text-subtle,#172b4d)]"
            onClick={() => {
              // TODO: заполнить коммент ссылкой на текущий action
            }}
          >
            Ответить
          </button>
        </div>
      </>
    )
  }
  return (
    <>
      {fn(args)}
      <div>{createdByLink}</div>
    </>
  )
}

// TODO: routing for highligted

function CardDetailAction({ id, member, record, args, createdBy, highligted }) {
  const actionUrl = '#'
  return (
    <div
      className={cx(
        highligted
          ? 'border-l-[var(--ds-border-information,#0079bf)] bg-[var(--ds-background-information,#e4f0f6)]'
          : 'border-transparent',
        'relative ml-[-12px] border-l-4 py-2 pl-12 pr-0.5 leading-5',
      )}
    >
      <div className="absolute top-2 left-2">
        <MemberIcon {...member} />
      </div>
      <button
        title={`${member.name.first} ${member.name.last} (${member.login.username})`}
        className="mr-1 font-bold"
        onClick={() => {
          // event.preventDefault()
          // TODO: popup профиля
        }}
      >
        {member.name.first} {member.name.last}
      </button>
      {getActionContent({
        record,
        args,
        createdByLink: (
          <a
            className="whitespace-pre text-xs text-[var(--ds-text-subtle,#5e6c84)] hover:text-[var(--ds-text-subtle,#172b4d)] hover:underline"
            href={actionUrl}
            onClick={() => {
              event.preventDefault()
              // TODO: router.push(actionUrl, undefined, { shallow: true, })
            }}
          >
            {getLiteralDate(dayjs(createdBy), { withTime: true })}
          </a>
        ),
      })}
    </div>
  )
}

const CommentBoxContext = React.createContext(null)

function CommentBoxState({ children }) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  return (
    <CommentBoxContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </CommentBoxContext.Provider>
  )
}

function CommentBox({ avatar, isNewComment = false, defaultValue = '', close }) {
  const { setIsExpanded } = React.useContext(CommentBoxContext)
  const [isFocused, setIsFocused] = React.useState(!isNewComment)
  const [isShowControls, setIsShowControls] = React.useState(defaultValue !== '')
  const ref = React.useRef(null)
  const inputRef = React.useRef(null)
  if (isNewComment) {
    useOnClickOutside(ref, (event) => {
      if (isShowControls || isHTMLControl(event.target, ref.current)) {
        return
      }
      setIsFocused(false)
    })
  } else {
    React.useEffect(() => {
      inputRef.current.focus({
        preventScroll: true,
        cursor: 'all',
      })
    }, [])
  }
  return (
    <div ref={ref}>
      {avatar}
      <div
        className={cx(
          'comment-box',
          isFocused ? 'is-focused pb-14' : 'pb-2',
          'relative overflow-hidden rounded-[3px] bg-[var(--ds-background-input,#ffffff)] px-3 pt-2 leading-5 transition-[box-shadow,padding-bottom]',
        )}
      >
        {/* <Form
        // className="w-full pt-1"
        form={form}
        layout="vertical"
        // initialValues={{ requiredMarkValue: requiredMark }}
        // onValuesChange={onRequiredTypeChange}
        // requiredMark={requiredMark}
      > */}
        {/* <Form.Item> */}
        <Input.TextArea
          placeholder={isNewComment ? 'Напишите комментарий…' : null}
          className={cx(
            isFocused
              ? 'hover:bg-[var(--ds-background-input-hovered,#ebecf0)] focus:bg-[var(--ds-background-input,transparent)] focus:transition-none'
              : isShowControls
              ? ''
              : 'hover:bg-[var(--ds-background-input-hovered,#ebecf0)]',
            isFocused ? 'p-0' : 'my-[-8px] mx-[-12px] cursor-pointer py-[8px] px-[12px]',
            'focus-borderless box-content min-h-[20px] overflow-hidden leading-5 placeholder:text-[var(--ds-text-subtle,#5e6c84)]',
          )}
          bordered={false}
          // ref={inputRef}
          autoSize
          aria-label={isNewComment ? 'Написать комментарий' : 'Изменить комментарий'}
          // value={value}
          defaultValue={defaultValue}
          onChange={(event) => {
            // setValue(event.target.value)
            setIsShowControls(event.target.value !== '')
          }}
          onFocus={() => {
            if (isNewComment) {
              setIsExpanded(false)
            }
            setIsFocused(true)
          }}
          ref={inputRef}
        />
        <div
          className={cx(
            'absolute bottom-2 left-3 right-2 transition-[transform,opacity]',
            isFocused ? 'translate-y-0 opacity-100' : 'translate-y-[48px] opacity-0',
          )}
        >
          {/* // TODO: не меняет фокус для input при клике по disabled <input type="submit" disabled value="123"></input> */}
          <CardDetailButton
            disabled={!isShowControls}
            colors={
              isShowControls
                ? 'bg-[var(--ds-background-brand-bold,#0079bf)] text-[var(--ds-text-inverse,#fff)] hover:bg-[var(--ds-background-brand-bold-hovered,#026aa7)] active:bg-[var(--ds-background-brand-bold-pressed,#055a8c)]'
                : 'bg-[var(--ds-background-disabled,#091e420a)] text-[var(--ds-text-disabled,#a5adba)]'
            }
            onClick={() => {
              console.log('2222')
            }}
          >
            Сохранить
          </CardDetailButton>
          {isNewComment || (
            <Button
              className="ml-1 rounded-[3px] border-0 text-[var(--ds-icon,#42526e)] shadow-none hover:text-[var(--ds-icon,#172b4d)]"
              aria-label="Отменить изменения"
              icon={<CloseOutlined className="scale-125" />}
              onClick={close}
            />
          )}
          <div className="float-right ml-1 inline-flex gap-1">
            <CommentBoxOptionsButton
              icon={<PaperClipOutlined />}
              title="Добавить вложение…"
              onClick={(event) => {
                console.log('onClick')
              }}
            />
            <CommentBoxOptionsButton
              icon={<UserAddOutlined className="scale-95" />}
              title="Упомянуть участника…"
            />
            <CommentBoxOptionsButton
              icon={<SmileOutlined className="scale-95" />}
              title="Добавить эмодзи…"
            />
            <CommentBoxOptionsButton
              icon={<CreditCardOutlined className="scale-95" rotate={180} />}
              title="Добавить карточку…"
            />
          </div>
        </div>
        {/* </Form.Item> */}
        {/* </Form> */}
      </div>
    </div>
  )
}

function CardDetailActions({ actions }) {
  {
    /* <FileDoneOutlined  className="scale-125"/> */
  }
  const [isExpanded, setIsExpanded] = React.useState(false)
  // const [form] = Form.useForm()
  // const [value, setValue] = React.useState('')
  return (
    <CardDetailSection
      icon={<FileDoneOutlined className="scale-125" />}
      title="Действия"
      headerActions={
        <CardDetailButton
          className="float-right ml-2"
          onClick={() => {
            setIsExpanded(!isExpanded)
          }}
        >
          {isExpanded ? 'Скрыть подробности' : 'Показать подробности'}
        </CardDetailButton>
      }
    >
      <CommentBoxState>
        <div className="relative ml-10 mb-3 pr-0.5">
          <CommentBox
            avatar={
              <Avatar
                draggable={false}
                src={myThumbnail}
                className="absolute left-[-40px] top-0 border-0"
              />
            }
            isNewComment
          />
        </div>
        {actions.map((action, id) => (
          <CardDetailAction key={action.id} {...action} />
        ))}
      </CommentBoxState>
      <CardDetailButton>Показать все действия…</CardDetailButton>
    </CardDetailSection>
  )
}

function CardDetailSection({ icon, title, headerActions, children }) {
  return (
    <WindowModule>
      <div className="relative mb-1 ml-10 flex h-12 items-center py-2">
        <div className="absolute left-[-40px] top-[8px] flex h-8 w-8 justify-center text-base">
          {icon}
        </div>
        <BoardTitle>{title}</BoardTitle>
        {headerActions && <div className="grow">{headerActions}</div>}
      </div>
      {children}
    </WindowModule>
  )
}

function getFilename(url) {
  return url.split('/').pop()
}

function getFileExtension(filename) {
  const a = filename.split('.')
  if (a.length === 1) {
    return
  }
  return a.pop()
}

// TODO: добавить в функционал ColorThief
// function hasAlpha(context, canvas) {
//   var data = context.getImageData(0, 0, canvas.width, canvas.height).data,
//       hasAlphaPixels = false;
//   for (var i = 3, n = data.length; i < n; i+=4) {
//       if (data[i] < 255) {
//           hasAlphaPixels = true;
//           break;
//       }
//  }
//  return hasAlphaPixels;
// }

function CardDetailAttachment({ id, url, title, createdBy, thumbnail }) {
  // TODO: drag'n'drop для сортировки по orderIndex
  const [filename, fileExtension] = React.useMemo(() => {
    const filename = getFilename(url)
    const fileExtension = getFileExtension(filename)
    return [filename, fileExtension]
  }, [url])
  const imgRef = React.useRef()
  const [thumbnailColor, setThumbnailColor] = React.useState([])
  return (
    <div
      className="relative mb-2 overflow-hidden rounded-[3px] leading-5 [&:hover>div]:bg-[var(--ds-background-neutral,#091e420a)]"
      role="button"
      onClick={() => {
        console.log('onClick')
      }}
    >
      <a
        // для поддержки контекстного меню по правой кнопки мышки
        className={cx(
          thumbnail ? '' : fileExtension ? 'text-lg' : 'text-base',
          'absolute top-[50%] flex h-[80px] w-[112px] translate-y-[-50%] items-center justify-center overflow-hidden rounded-[3px] bg-[var(--background-color)] font-bold text-[var(--ds-text-subtle,#5e6c84)]',
        )}
        style={{
          '--background-color':
            thumbnailColor.length === 3
              ? `var(--ds-background-thumbnail,rgb(${thumbnailColor[0]},${thumbnailColor[1]},${thumbnailColor[2]}))`
              : 'var(--ds-background-neutral,#091e420a)',
        }}
        href={url}
        onClick={(event) => {
          event.preventDefault()
        }}
      >
        {thumbnail ? (
          <img
            className="h-[80px] w-[112px] object-contain"
            crossOrigin={'anonymous'}
            ref={imgRef}
            // TODO: если на картинки есть прозрачный фон - hasAlpha(), то не устанавливать цвет
            // src="/attachments/previews/transparent1.png"
            // src="/attachments/previews/transparent2.png"
            src={thumbnail}
            onLoad={() => {
              const colorThief = new ColorThief()
              const img = imgRef.current
              const result = colorThief.getColor(img, 25)
              // TODO: в зависимости от light, инвертировать кнопку "Обложка"
              const [_hue, _saturation, light] = convertRGBToHSL(...result)
              // console.log(result)
              setThumbnailColor(result)
            }}
          />
        ) : (
          fileExtension || <PaperClipOutlined className="scale-125" />
        )}
      </a>
      <div className="min-h-[80px] py-2 pl-[128px] pr-2">
        <span className="text-sm font-bold">{title || filename}</span>
        <a
          className="relative ml-1 h-5"
          target="_blank"
          href={url}
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          <DownloadOutlined className="absolute top-0.5 text-[var(--ds-icon,#42526e)]" />
        </a>
        <div className="text-[var(--ds-text-subtle,#5e6c84)]">
          <span
            className="mr-1"
            // TODO: Добавлено час назад || Добавлено 14 фев в 16:13
          >
            {createdBy}
          </span>
          <LinkButton
            onClick={() => {
              // TODO: Комментарий
            }}
          >
            Комментарий
          </LinkButton>
          <LinkButton
            onClick={() => {
              // TODO: Удалить
            }}
          >
            Удалить
          </LinkButton>
          <LinkButton
            onClick={() => {
              // TODO: Изменить
            }}
          >
            Изменить
          </LinkButton>
        </div>
        {thumbnail && (
          <div className="mt-2">
            <Button
              // make-cover
              // HACK: h-4 - уменьшает высоту <p> до требуемых 88px
              className="mr-2 h-4 border-0 p-0 leading-5 text-[var(--ds-link,#5e6c84)] underline hover:text-[var(--ds-link,#172b4d)]"
              type="link"
              size="small"
              icon={<PictureOutlined className="text-[var(--ds-icon,#42526e)]" />}
              onClick={() => {
                // TODO: Сделать обложкой
              }}
            >
              Сделать обложкой
            </Button>
            <Button
              // remove-cover
              // HACK: h-4 - уменьшает высоту <p> до требуемых 88px
              className="mr-2 h-4 border-0 p-0 leading-5 text-[var(--ds-link,#5e6c84)] underline hover:text-[var(--ds-link,#172b4d)]"
              type="link"
              size="small"
              icon={<PictureOutlined className="text-[var(--ds-icon,#42526e)]" />}
              onClick={() => {
                // TODO: Убрать обложку
              }}
            >
              Убрать обложку
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

function CardDetailAttachments() {
  const attachments = [
    {
      id: 'id-1',
      url: '/attachments/transparent1.png',
      title: 'title title title title title title title title title title title title title', // TODO: or filename
      createdBy: '2023-02-22',
      thumbnail: '/attachments/previews/transparent1.png', // TODO: from Image or fileext or PaperClipOutlined
    },
    {
      id: 'id-2',
      url: '/attachments/LICENSE',
      // title: '', // TODO: or filename
      createdBy: '2023-02-22',
      // thumbnail: '', // TODO: from Image or fileext or PaperClipOutlined
    },
    {
      id: 'id-3',
      url: '/attachments/postcss.config.js',
      // title: '', // TODO: or filename
      createdBy: '2023-02-22 10:11:12',
      // thumbnail: '', // TODO: from Image or fileext or PaperClipOutlined
    },
    {
      id: 'id-4',
      url: '/attachments/tailwind.config.js',
      // title: '', // TODO: or filename
      createdBy: '2023-02-22 10:11:12',
      // thumbnail: '', // TODO: from Image or fileext or PaperClipOutlined
    },
    {
      id: 'id-5',
      url: '/attachments/tsconfig.json',
      // title: '', // TODO: or filename
      createdBy: '2023-02-22 10:11:12',
      // thumbnail: '', // TODO: from Image or fileext or PaperClipOutlined
    },
  ]
  const shortCount = 4
  const [isExpanded, setIsExpanded] = React.useState(false)
  return (
    <CardDetailSection icon={<PaperClipOutlined className="scale-125" />} title="Вложения">
      <div className="ml-10">
        {(isExpanded ? attachments : attachments.slice(0, shortCount)).map((attachment) => (
          <CardDetailAttachment key={attachment.id} {...attachment} />
        ))}
        <Space direction="vertical">
          <CardDetailButton
            // className="mb-1"
            onClick={() => {
              setIsExpanded(!isExpanded)
            }}
          >
            {isExpanded
              ? 'Показать меньше вложений'
              : `Посмотреть все вложения (скрыто ${attachments.length - shortCount})`}
          </CardDetailButton>
          <CardDetailButton>Добавить вложение</CardDetailButton>
        </Space>
      </div>
    </CardDetailSection>
  )
}

function Dropzone() {
  return (
    // TODO: не больше 50 members из-за z-50 - как создать "локальный контекст наложения z-index"?
    <div className="absolute top-0 left-0 right-0 bottom-0 z-50 flex flex-col justify-center bg-[var(--ds-surface-overlay,#ffffffb3)] text-center text-xl font-bold">
      Перетяните файлы, чтобы загрузить.
    </div>
  )
}

function LinkButton({ onClick, children }) {
  return (
    <div className="mr-1 inline-block">
      {'• '}
      <a
        role="button"
        onClick={onClick}
        className="text-[var(--ds-link,#5e6c84)] underline hover:text-[var(--ds-link,#172b4d)]"
      >
        {children}
      </a>
    </div>
  )
}

function CardDetailDescription() {
  const text = generateSentence(40)
  const [isEdit, setIsEdit] = React.useState(text === '')
  const [isMore, setIsMore] = React.useState(false)
  const descriptionRef = React.useRef()
  const isFirst = useIsFirstRender()
  React.useEffect(() => {
    if (isFirst && !isEdit) {
      const rect = descriptionRef.current.getBoundingClientRect()
      if (rect.height > 432) {
        setIsMore(true)
      }
    }
  }, [])
  const hasNotSavedChanges = true
  const isSaveError = false
  return (
    <CardDetailSection
      icon={<ContainerOutlined className="scale-125" />}
      title="Описание"
      headerActions={
        <CardDetailButton
          className="ml-2"
          onClick={() => {
            setIsMore(false)
            setIsEdit(true)
          }}
        >
          Изменить
        </CardDetailButton>
      }
    >
      <div className="relative ml-10">
        {isMore && (
          <div
            role="button"
            onClick={() => {
              setIsMore(false)
            }}
            className="description-content-fade-button absolute top-0 left-0 right-0 h-[432px] pt-[400px] text-[var(--ds-text-subtle,#5e6c84)] hover:text-[var(--ds-text,#172b4d)]"
          >
            <div className="truncate p-2 text-center leading-5 underline">
              Показать полное описание
            </div>
          </div>
        )}
        {!isEdit && (
          <div className={cx(isMore && 'h-[432px] overflow-hidden')} ref={descriptionRef}>
            {text}
          </div>
        )}
        {!isEdit && text === '' && (
          <div className="mb-2">
            <CardDetailButton
              className="h-14 py-2"
              onClick={() => {
                setIsEdit(true)
              }}
            >
              <div className="h-10">Добавить более подробное описание…</div>
            </CardDetailButton>
          </div>
        )}
        {isEdit && (
          <div>
            Edit{' '}
            <Button
              onClick={() => {
                setIsEdit(false)
              }}
            >
              Отмена
            </Button>
          </div>
        )}
        {!isMore && hasNotSavedChanges && (
          <div className="mb-2 text-[var(--ds-text-subtle,#5e6c84)]">
            <span className="mr-1">В этом поле есть несохранённые изменения</span>
            <LinkButton
              onClick={() => {
                setIsEdit(true)
              }}
            >
              Посмотреть изменения
            </LinkButton>
            <LinkButton
              onClick={() => {
                // TODO: отменить изменения
              }}
            >
              Отменить
            </LinkButton>
          </div>
        )}
        {!isMore && isSaveError && (
          <div className="mb-2 text-[var(--ds-text-danger,#eb5a46)]">Изменения не сохранены.</div>
        )}
      </div>
    </CardDetailSection>
  )
}

function BoardTitle({ children }) {
  return <h3 className="truncate text-[16px] font-semibold leading-5">{children}</h3>
}

function HorizontalDivider() {
  return <hr className="mb-2 border-[var(--ds-border,#091e4221)]" />
}

function WindowSidebarButton({ colors, icon, onClick, children }) {
  return (
    <CardDetailButton
      className="mb-2 w-full max-w-[300px] text-start"
      {...{ colors, icon, onClick }}
    >
      {children}
    </CardDetailButton>
  )
}

function WindowModule({ className, children }) {
  return <div className={cx('relative clear-both mb-6', className)}>{children}</div>
}

function WindowSidebar({ isArchive, setIsArchive }) {
  return (
    <div
      className="float-right overflow-hidden pr-4 pl-2"
      style={{
        width: `calc(100% - ${mainWidth}px)`,
      }}
    >
      <WindowModule
      // TODO: className="u-clearfix"
      >
        <CardDetailItemTitle>Добавить на карточку</CardDetailItemTitle>
        <WindowSidebarButton icon={<UserOutlined />}>Участники</WindowSidebarButton>
        <WindowSidebarButton icon={<TagOutlined />}>Метки</WindowSidebarButton>
        <WindowSidebarButton icon={<CheckSquareOutlined />}>Чек-лист</WindowSidebarButton>
        <WindowSidebarButton icon={<ClockCircleOutlined />}>Даты</WindowSidebarButton>
        <WindowSidebarButton icon={<PaperClipOutlined />}>Вложение</WindowSidebarButton>
        {/* <WindowSidebarButton icon={}>// TODO: Обложка</WindowSidebarButton> */}
      </WindowModule>
      <WindowModule
      // TODO: className="u-clearfix"
      >
        <CardDetailItemTitle>Действия</CardDetailItemTitle>
        <WindowSidebarButton icon={<ArrowRightOutlined />}>Перемещение</WindowSidebarButton>
        <WindowSidebarButton icon={<CopyOutlined />}>Копирование</WindowSidebarButton>
        {/* <WindowSidebarButton icon={}>// TODO: Создать шаблон</WindowSidebarButton> */}
        {/* <WindowSidebarButton icon={<LikeOutlined />}>// TODO: Голосовать</WindowSidebarButton> */}
        <HorizontalDivider />
        {isArchive || (
          <WindowSidebarButton
            icon={<DatabaseOutlined />}
            onClick={() => {
              setIsArchive(true)
            }}
          >
            Архивация
          </WindowSidebarButton>
        )}
        {isArchive && (
          <WindowSidebarButton
            icon={<UndoOutlined rotate={90} />}
            onClick={() => {
              setIsArchive(false)
            }}
          >
            Вернуть
          </WindowSidebarButton>
        )}
        {isArchive && (
          <WindowSidebarButton
            icon={<MinusOutlined />}
            colors={cx(
              'text-[var(--ds-text-inverse,#fff)]',
              'bg-[var(--ds-background-danger-bold,#b04632)]',
              'hover:bg-[var(--ds-background-danger-bold-hovered,#933b27)]',
              'active:bg-[var(--ds-background-danger-bold-pressed,#6e2f1a)]',
            )}
            onClick={() => {
              // TODO: подтверждение удаления карточки
            }}
          >
            Удалить
          </WindowSidebarButton>
        )}
        <WindowSidebarButton icon={<ShareAltOutlined />}>Поделиться</WindowSidebarButton>
      </WindowModule>
    </div>
  )
}

function ListCardMembers({ members }) {
  return (
    <Avatar.Group className="float-right mb-1 mr-[-2px] block" size="small">
      {members.map((member, index, a) => (
        <MemberIcon key={member.login.uuid} {...member} zIndex={a.length - index} />
      ))}
    </Avatar.Group>
  )
}

function getLiteralDate(date, { withTime = false }) {
  const literalDates = {
    near: ['Вчера', 'Сегодня', 'Завтра'],
    past: [
      'В прошлое воскресенье',
      'В прошлый понедельник',
      'В прошлый вторник',
      'В прошлую среду',
      'В прошлый четверг',
      'В прошлую пятницу',
      'В прошлую субботу',
    ],
    future: [
      'В воскресенье',
      'В понедельник',
      'Во вторник',
      'В среду',
      'В четверг',
      'В пятницу',
      'В субботу',
    ],
  }
  const time = withTime ? ' в ' + date.format('HH:mm') : ''
  const now = dayjs()
  const delta = Math.ceil(date.diff(now, 'day', true))
  if (delta >= -1 && delta <= 1) {
    return literalDates.near[delta + 1] + time
  }
  if (delta < 0 && delta > -7) {
    return literalDates.past[date.day()] + time
  }
  if (delta > 0 && delta < 7) {
    return literalDates.future[date.day()] + time
  }
  return date.format('D MMM') + time
}

function getDueDateMode({ deadline, mode, forCardDetail = false }) {
  const dueDateModes = {
    normal: {
      title: 'Срок карточки истекает не скоро',
      style: {
        '--background-color-hovered': 'transparent',
        '--background-color': 'transparent',
        '--text-color': 'var(--ds-text-subtle,#5e6c84)',
      },
    },
    danger: {
      status: 'просрочено',
      title: 'Срок карточки истёк',
      title2: 'Карточка недавно просрочена!',
      style: {
        '--background-color-hovered': 'var(--ds-background-danger-bold-hovered,#b04632)',
        '--background-color': 'var(--ds-background-danger-bold,#eb5a46)',
        '--text-color': 'var(--ds-text-inverse,#fff)',
      },
    },
    warning: {
      status: 'скоро истечёт',
      title: 'До истечения срока карточки осталось менее 24 часов',
      title2: 'До истечения срока карточки осталось менее часа',
      style: {
        '--background-color-hovered': 'var(--ds-background-warning-hovered,#d9b51c)',
        '--background-color': 'var(--ds-background-warning,#f2d600)',
        '--text-color': 'var(--ds-text-inverse,#fff)',
      },
    },
    success: {
      status: 'выполнено',
      title: 'Эта карточка выполнена',
      style: {
        '--background-color-hovered': 'var(--ds-background-success-hovered,#519839)',
        '--background-color': 'var(--ds-background-success,#61bd4f)',
        '--text-color': 'var(--ds-text-inverse,#fff)',
      },
    },
  }
  const result = dueDateModes[mode]
  if (['danger', 'warning'].includes(mode)) {
    const isLastHour = false // TODO: by deadline
    if (isLastHour) {
      result.title = result.title2
    }
  }
  if (forCardDetail && mode === 'warning') {
    result.style['--text-color'] = 'var(--ds-text, #172B4D)'
  }
  return result
}

// TODO: https://react-component.github.io/calendar/examples/antd-range-calendar.html
function CardDetailStartDateBadge({ start }) {
  return (
    <CardDetailButton
      onClick={() => {
        // console.log()
      }}
    >
      {getLiteralDate(start)}
      <DownOutlined />
    </CardDetailButton>
  )
}

function CardDetailDueDateBadge({ start, deadline, mode = 'danger' }) {
  const [checked, setChecked] = React.useState(false)
  const currentMode = getDueDateMode({
    deadline,
    mode: checked ? 'success' : mode,
    forCardDetail: true,
  })
  return (
    <div title={currentMode.title}>
      <Checkbox
        className="mr-1"
        onClick={() => {
          setChecked(!checked)
        }}
      />
      <CardDetailButton onClick={() => {}}>
        {!!start && start.format('D MMM - ')}
        {start ? deadline.format('D MMM') : getLiteralDate(deadline, { withTime: true })}
        {!!currentMode.status && (
          <span
            className="ml-2 rounded-[2px] bg-[var(--background-color)] px-1 text-xs text-[var(--text-color)]"
            style={currentMode.style}
          >
            {currentMode.status}
          </span>
        )}
        <DownOutlined />
      </CardDetailButton>
    </div>
  )
}

function CardDetailNotifications({ notifications }) {
  const [isChecked, setIsChecked] = React.useState(false)
  const title = isChecked
    ? 'Вы подписаны на уведомления об обновлениях этой карточки. Нажмите, чтобы отменить подписку.'
    : 'Подпишитесь на уведомления об обновлениях этой карточки'
  // TODO: отказался от Tooltip
  return (
    <CardDetailButton
      className={cx('transition-none', isChecked && 'relative pr-10')}
      icon={<EyeOutlined />}
      onClick={() => {
        setIsChecked(!isChecked)
      }}
      aria-label={title}
    >
      {isChecked ? (
        <>
          {'Вы подписаны'}
          <span className="absolute top-1 right-1 flex h-6 w-7 justify-center rounded-[3px] bg-[var(--ds-icon-subtle,#42526e)] text-[var(--ds-icon-inverse,#fff)]">
            <CheckOutlined />
          </span>
        </>
      ) : (
        'Подписаться'
      )}
    </CardDetailButton>
  )
}

function CardDetailMembers({ members }) {
  return (
    <Avatar.Group className="block">
      {members.map((member, index, a) => (
        <MemberIcon key={member.login.uuid} {...member} zIndex={a.length - index} />
      ))}
      <CardDetailButton icon={<PlusOutlined />} shape="circle" />
    </Avatar.Group>
  )
}

function CardDetailItemTitle({ children }) {
  return (
    <h3 className="mr-2 mb-1 truncate text-[12px] font-semibold leading-5 text-[var(--ds-text-subtle,#5e6c84)]">
      {children}
    </h3>
  )
}

function CardDetailItem({ title, children }) {
  return (
    <div className="mr-4 mb-4 inline-block">
      <CardDetailItemTitle>{title}</CardDetailItemTitle>
      {children}
    </div>
  )
}

// TODO: объединить с BoardHeaderButton - формировать className, а не врапить Button
function CardDetailButton({
  className,
  colors,
  icon,
  shape = 'default',
  children,
  onClick,
  disabled,
}) {
  return (
    <Button
      className={cx(
        shape === 'default' && 'rounded-[3px]',
        'border-0 leading-5 shadow-none',
        colors ||
          [
            'text-[var(--ds-text,inherit)]',
            'bg-[var(--ds-background-neutral,rgba(9,30,66,0.04))]',
            'hover:bg-[var(--ds-background-neutral-hovered,rgba(9,30,66,0.08))]',
            'active:bg-[var(--ds-background-neutral-pressed,#e4f0f6)]',
            'active:text-[var(--ds-text,#0079bf)]',
          ].join(' '),
        // indent && 'mr-1 mb-1',
        children && 'px-3', // : 'w-8 px-0',
        className,
      )}
      {...{ shape, icon, onClick, disabled }}
    >
      {children}
    </Button>
  )
}

function CardDetailLabels({ labels }) {
  return (
    <div className="flex flex-wrap gap-1">
      {labels.map((label) => (
        <CardDetailLabel key={label.id} {...label} />
      ))}
      <CardDetailButton icon={<PlusOutlined />} />
    </div>
  )
}

function CardDetailLabel({ id, colorId, name }) {
  const color = labelColors[colorId]
  const title = `Цвет: ${color.name}, название: «${name}»`
  return (
    <Tooltip
      // TODO: добавить цвет
      // overlayStyle={{ ...color.style }}
      // overlayInnerStyle={{ color: 'var(--ds-text, #172b4d)' }}
      // color={'var(--background-color)'}
      placement="bottomLeft"
      title={title}
    >
      <button
        style={color.style}
        className="relative inline-block h-8 min-w-[48px] max-w-full truncate rounded-[3px] bg-[var(--background-color,var(--ds-skeleton,#DFE1E6))] pl-8 pr-3 text-left leading-8 text-[var(--text-color,var(--ds-text,#172b4d))] hover:brightness-[.85] hover:saturate-[.85] focus:ring-2"
        tabIndex={0}
        aria-label={title}
        // onClick={(event) => {}}
      >
        <>
          <div className="absolute top-2 bottom-2 left-2 h-4 w-4 rounded-[50%] bg-[var(--foreground-color)]" />
          {name}
        </>
      </button>
    </Tooltip>
  )
}

const mainWidth = 576

function CardDetailWindow({ issue: { members, labels, actions } }) {
  const [isOpen, setIsOpen] = React.useState(true) // TODO: состояние определяет '/c/...'
  const close = () => {
    setIsOpen(false)
  }
  const columnName = 'Backlog'
  const columnUrl = '/c/id-123/backlog'
  const notifications = true
  const start = dayjs('2023-02-23')
  const deadline = dayjs('2023-02-24')
  const isDrag = false // TODO: перетаскивание файлов
  const [isArchive, setIsArchive] = React.useState(false) // TODO: архивация карточки
  const isSubscribed = true // TODO: подписка на карточку
  return (
    <Modal
      open={isOpen}
      onCancel={close}
      afterClose={() => {}}
      // title="Карточка"
      // transitionName=""
      // maskTransitionName=""
      // style={null}
      // closable={false}
      footer={null}
      destroyOnClose
      // centered
      // width={768}
      // mask={false}
      // TODO: адаптивность для мобилки
      className="card-detail-window min-w-[768px] max-w-[768px]"
      wrapClassName="overflow-x-hidden"
    >
      {/* // TODO: Обложка */}
      {isArchive && (
        <div className="card-back-archive-banner relative py-3 pl-12 pr-3">
          <div className="absolute top-3 left-2 flex h-8 w-8 justify-center">
            <DatabaseOutlined className="scale-125" />
          </div>
          <span className="text-[16px] leading-8">Архивная карточка</span>
        </div>
      )}
      <div className="relative px-12 pt-3 pb-2">
        <div className="absolute top-5 left-4 flex h-8 w-8 justify-center">
          <CreditCardOutlined className="scale-125" rotate={180} />
        </div>
        <Input.TextArea
          className="mt-2 min-h-[32px] resize-none overflow-hidden rounded-[3px] border-0 bg-transparent px-2 py-1 text-[20px] font-semibold leading-[24px] focus:bg-[var(--ds-background-input,#fff)]"
          bordered={false}
          spellCheck={false}
          // ref={inputRef}
          autoSize
          // aria-label={name}
          // size={512}
          value={'Выполнить деплой'}
          // onChange={(event) => {
          //   setValue(event.target.value)
          // }}
          // onBlur={() => {
          //   setIsFocused(false)
          // }}
          // onFocus={() => {
          //   setIsFocused(true)
          // }}
        />
        <div className="mb-3 cursor-default pl-2.5 text-sm text-[var(--ds-text-subtle,#5e6c84)]">
          в колонке{' '}
          <a
            className=" text-[var(--ds-text-subtle,#5e6c84)] underline"
            href={columnUrl}
            onClick={(event) => {
              event.preventDefault()
              router.push(columnUrl, undefined, {
                shallow: true,
              })
            }}
          >
            {columnName}
          </a>
          {isSubscribed && (
            <span className="relative ml-3 h-5">
              <EyeOutlined className="absolute top-0.5 text-[var(--ds-icon,#42526e)]" />
            </span>
          )}
        </div>
      </div>
      <div
        className="relative float-left pr-2 pb-2 pl-4"
        style={{
          width: `${mainWidth}px`,
        }}
      >
        <div className="mt-2 ml-10">
          {/* <CardDetailItem title="Список"> // TODO: реализовать кнопку "Список" </CardDetailItem> */}
          <CardDetailItem title="Участники">
            <CardDetailMembers {...{ members }} />
          </CardDetailItem>
          <CardDetailItem title="Метки">
            <CardDetailLabels {...{ labels }} />
          </CardDetailItem>
          <CardDetailItem title="Уведомления">
            <CardDetailNotifications {...{ notifications }} />
          </CardDetailItem>
          {deadline ? (
            <CardDetailItem title={start ? 'Даты' : 'Срок'}>
              <CardDetailDueDateBadge {...{ start, deadline }} />
            </CardDetailItem>
          ) : (
            <CardDetailItem title="Начало">
              <CardDetailStartDateBadge {...{ start }} />
            </CardDetailItem>
          )}
          {/* <CardDetailItem title="Голоса"> // TODO: непонятно </CardDetailItem> */}
          {/* <CardDetailItem title="Последнее обновление"> // TODO: непонятно </CardDetailItem> */}
        </div>
        <CardDetailDescription />
        {/* // TODO: Местоположение */}
        {/* // TODO: Поля пользователя */}
        {/* // TODO: Вложения системы         */}
        <CardDetailAttachments />
        <CardDetailActions {...{ actions }} />
      </div>
      <WindowSidebar {...{ isArchive, setIsArchive }} />
      {isDrag && <Dropzone />}
    </Modal>
  )
}

function ExtrasButton() {
  const data = [
    { 'add-card': 'Добавить карточку…' },
    { 'copy-list': 'Копировать список…' },
    { 'move-list': 'Переместить список…' },
    { 'list-subscribe': 'Подписаться' },
    'divider',
    { 'sort-cards': 'Сортировать по…' },
    'divider',
    // TODO: добавить автоматизацию
    // { group: 'Автоматизация' },
    // { '': 'Когда карточка добавлена в список…' },
    // { '': 'Каждый день, сортировать по…' },
    // { '': 'Каждый понедельник, сортировать по…' },
    // { '': 'Создать настраиваемое правило…' },
    // 'divider',
    { 'move-cards': 'Переместить все карточки списка…' },
    { 'archive-cards': 'Архивировать все карточки списка…' },
    'divider',
    { 'close-list': 'Архивировать список' },
  ]
  const items = data.map((currentValue, index) => {
    if (currentValue === 'divider') {
      return { type: 'divider' }
    }
    const [key, itemText] = Object.entries(currentValue)[0]
    return {
      key,
      label: (
        <CustomDropdownItem>
          <div className="truncate">{itemText}</div>
        </CustomDropdownItem>
      ),
    }
  })
  return (
    <CustomDropdown
      header="Действия со списком"
      items={items}
      onClick={(event) => {
        // setSelected(event.key)
      }}
      smallSize
    >
      <Button
        className="rounded-[3px] border-0 bg-transparent text-[var(--ds-icon-subtle,#6b778c)] shadow-none hover:bg-[var(--ds-background-neutral-hovered,#091e4214)] hover:text-[var(--ds-icon,#172b4d)] active:bg-[var(--ds-background-neutral-pressed,#091e4221)]"
        icon={<EllipsisOutlined />}
      />
    </CustomDropdown>
  )
}

function StartDateBadge({ start }) {
  return (
    <Badge>
      <ClockCircleOutlined className="badge-clock badge-icon" />
      <BadgeText>Дата начала: {start.format('D MMM')}</BadgeText>
    </Badge>
  )
}

function DueDateBadge({ start, deadline, mode = 'warning' }) {
  const [checked, setChecked] = React.useState(false)
  const currentMode = getDueDateMode({ deadline, mode: checked ? 'success' : mode })
  return (
    <Badge
      title={currentMode.title}
      style={currentMode.style}
      className="transition [&:hover>.badge-clock]:hidden [&:hover>.badge-check]:flex"
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        setChecked(!checked)
      }}
    >
      <ClockCircleOutlined className="badge-clock badge-icon" />
      {checked ? (
        <CheckSquareOutlined className="badge-check badge-icon hidden" />
      ) : (
        <BorderOutlined className="badge-check badge-icon hidden" />
      )}
      <BadgeText>
        {!!start && start.format('D MMM - ')}
        {deadline.format('D MMM')}
      </BadgeText>
    </Badge>
  )
}

function Badge({ children, style, className, onClick, title }) {
  return (
    <div
      title={title}
      role={onClick ? 'button' : null}
      tabIndex={onClick ? '-1' : null}
      onClick={onClick}
      style={style}
      className={cx(
        'mr-1 mb-1 inline-flex max-w-full items-center truncate rounded-[3px] bg-[var(--background-color)] p-0.5 text-[var(--text-color)] hover:bg-[var(--background-color-hovered)]',
        className,
      )}
    >
      {children}
    </div>
  )
}

function BadgeText({ children }) {
  return <span className="whitespace-nowrap pl-0.5 pr-1 text-xs">{children}</span>
}

function Badges() {
  const start = dayjs('2023-02-23')
  const deadline = dayjs('2023-02-24')
  return (
    <div className="float-left ml-[-2px] max-w-full">
      <Badge title="Вы подписаны на эту карточку">
        <EyeOutlined className="badge-icon" />
      </Badge>
      {deadline ? <DueDateBadge {...{ start, deadline }} /> : <StartDateBadge {...{ start }} />}
      <Badge title="Эта карточка с описанием">
        <ContainerOutlined className="badge-icon" />
      </Badge>
      <Badge title="Комментарии">
        <MessageOutlined className="badge-icon" />
        <BadgeText>3</BadgeText>
      </Badge>
      <Badge title="Вложения">
        <PaperClipOutlined className="badge-icon" />
        <BadgeText>3</BadgeText>
      </Badge>
      <Badge title="Элементы списка задач">
        <CheckSquareOutlined className="badge-icon" />
        <BadgeText>8/10</BadgeText>
      </Badge>
    </div>
  )
}

function FrontLabel({ id, colorId, name }) {
  const { isExpanded, setIsExpanded } = React.useContext(FrontLabelsContext)
  const color = labelColors[colorId]
  const title = `Цвет: ${color.name}, название: «${name}»`
  return (
    <Tooltip
      // TODO: добавить цвет?
      // overlayStyle={{ ...color.style }}
      // overlayInnerStyle={{ color: 'var(--ds-text, #172b4d)' }}
      // color={'var(--background-color)'}
      placement="topLeft"
      title={title}
    >
      <div className="inline-flex max-w-[calc(100%-4px)]">
        <button
          style={color.style}
          className={cx(
            isExpanded
              ? 'h-4 min-w-[56px] max-w-full truncate bg-[var(--background-color)] pl-4 pr-2 text-xs'
              : 'h-2 min-w-[40px] max-w-[40px] bg-[var(--foreground-color)]',
            'relative inline-block rounded text-left transition hover:brightness-[.85] hover:saturate-[.85]',
          )}
          tabIndex={-1}
          aria-label={title}
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            setIsExpanded(!isExpanded)
          }}
        >
          {isExpanded && (
            <>
              <div className="absolute top-1 bottom-1 left-1 h-2 w-2 rounded-[50%] bg-[var(--foreground-color)]" />
              {name}
            </>
          )}
        </button>
      </div>
    </Tooltip>
  )
}

function FrontLabels({ labels }) {
  const { isExpanded } = React.useContext(FrontLabelsContext)
  // TODO: добавить режим для дальтоников
  return (
    <div className={cx(isExpanded ? 'mb-1' : 'my-1', 'flex flex-wrap gap-1')}>
      {labels.map((label) => (
        <FrontLabel key={label.id} {...label} />
      ))}
    </div>
  )
}

function ListCard({ id, title, labels, members }) {
  const router = useRouter()
  const urlName = React.useMemo(() => normalizeUrlName(title), [title])
  // TODO: cover
  return (
    <a
      href={`/c/${id}/${urlName}`}
      className="relative mb-2 block rounded-[3px] bg-[var(--ds-surface-raised,#fff)] text-sm text-[var(--ds-text,inherit)] shadow hover:bg-[var(--ds-surface-raised-hovered,#f4f5f7)]"
      onClick={(event) => {
        event.preventDefault()
        router.push(`/c/${id}/${urlName}`, undefined, {
          shallow: true,
        })
        // TODO: открывать модальный диалог по месту для лучшей анимации
      }}
    >
      <div className="overflow-hidden px-2 pt-1.5 pb-0.5">
        <FrontLabels {...{ labels }} />
        <div className="mb-1 break-words">{title}</div>
        <Badges />
        <ListCardMembers {...{ members }} />
      </div>
      {/* <Button
        // TODO: добавить редактирование карточки на месте
        icon={<EditOutlined />}
        size="small"
        className="absolute right-0.5 top-0.5 rounded-[3px] border-0 bg-[var(--ds-surface-raised-hovered,#f4f5f7)]
        opacity-80 shadow-none
        "
        onClick={(event) => {
          event.preventDefault()
          event.stopPropagation()
        }}
      /> */}
    </a>
  )
}

function ListHeader({ name }) {
  const [value, setValue] = React.useState(name)
  const [isFocused, setIsFocused] = React.useState(false)
  const inputRef = React.useRef()
  const issuesCount = 98
  const isFilter = true // TODO: реализовать isFilter через Context
  return (
    <div className="relative flex-none pt-1.5 pb-2.5 pl-2 pr-10">
      <Input.TextArea
        className="mb-[-4px] min-h-[28px] resize-none overflow-hidden rounded-[3px] border-0 bg-transparent px-2 py-1 font-semibold leading-[20px] focus:bg-[var(--ds-background-input,#fff)]"
        bordered={false}
        spellCheck={false}
        ref={inputRef}
        autoSize
        aria-label={name}
        size={512}
        value={value}
        onChange={(event) => {
          setValue(event.target.value)
        }}
        onBlur={() => {
          setIsFocused(false)
        }}
        onFocus={() => {
          setIsFocused(true)
        }}
      />
      {isFilter && (
        <p className="mx-2 text-sm text-[var(--ds-text-subtle,#5e6c84)]">
          {pluralize(issuesCount, ['карточка', 'карточки', 'карточек'])}
        </p>
      )}
      <div
        className={cx(
          isFocused && 'hidden',
          'absolute top-0 left-0 right-0 bottom-0 cursor-pointer',
        )}
        onClick={() => {
          event.preventDefault()
          inputRef.current.focus({
            preventScroll: true,
            cursor: 'all',
          })
        }}
      />
      <div className="absolute top-1 right-1">
        <ExtrasButton />
      </div>
    </div>
  )
}

function ListFooter() {
  return (
    <div className="max-h-[38px] min-h-[38px] px-2 pt-0.5 pb-2">
      <Button
        className="h-[28px] w-full rounded-[3px] border-0 bg-transparent px-2 py-1 text-[var(--ds-text-subtle,#5e6c84)] shadow-none text-start hover:bg-[var(--ds-background-neutral-subtle-hovered,#091e4214)] hover:text-[var(--ds-text,#172b4d)] active:bg-[var(--ds-background-neutral-pressed,#091e4221)]"
        icon={<PlusOutlined />}
      >
        Добавить карточку
      </Button>
    </div>
  )
}

const FrontLabelsContext = React.createContext(null)

function FrontLabelsState({ children }) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  return (
    <FrontLabelsContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </FrontLabelsContext.Provider>
  )
}

function Board({ issues }) {
  const columns = [
    // { id: 'column0', name: 'Backlog' },
    {
      id: 'column1',
      name: 'To Do To Do To Do To Do To Do To Do To Do To Do To Do To Do To Do',
    },
    { id: 'column2', name: 'In Progress' },
    { id: 'column3', name: 'Done' },
  ]
  // const cards = [
  //   { id: 'card1', name: 'Выполнить деплой' },
  //   { id: 'card2', name: 'Прикрутить CI & CD' },
  // ]
  return (
    <div id="board" className="ml-2.5 mr-2 flex max-h-max select-none gap-2 pb-2">
      <FrontLabelsState>
        {columns.map(({ id, name }) => (
          <div key={id}>
            <div className="flex min-w-[272px] max-w-[272px] flex-col rounded-[3px] bg-[var(--ds-background-accent-gray-subtlest,#ebecf0)]">
              <ListHeader {...{ name }} />
              <div className="max-h-[500px] overflow-x-hidden overflow-y-scroll px-2">
                {issues.map((issue) => (
                  <ListCard key={issue.id} {...issue} />
                ))}
              </div>
              <ListFooter />
            </div>
          </div>
        ))}
      </FrontLabelsState>
      {/* <Image
        // TODO: обои
        priority
        src="/wallpapper.jpg"
        fill
        // width="5760" height="3840"
        style={{
          objectFit: 'cover',
        }}
      /> */}
    </div>
  )
}

const actionRecords = {
  comment: () => null,
  addAttachment: () => 'прикрепил(а) вложение',
  deleteAttachment: () => 'удалил(а) вложение',
  inviteMember: () => 'присоединился(-ась) к этой карточке',
  leftMember: () => 'покинул(а) эту карточку',
  addCard: ({ listTitle }) => `добавил(а) эту карточку в список ${listTitle}`,
  moveCard: ({ oldListTitle, newListTitle }) =>
    `переместил(а) эту карточку из списка ${oldListTitle} в список ${newListTitle}`,
  archiveCard: () => 'архивировал(а) эту карточку',
  unarchiveCard: () => 'вернул(а) из архива эту карточку',
  closeDueDate: () => 'отметил(а) срок как завершённый',
  reopenDueDate: () => 'отметил(а) срок как незавершённый',
  setDueDate: ({ dueDate }) =>
    (({ dueDate }) => `установил(а) срок ${dueDate}`)({
      dueDate: getLiteralDate(dayjs(dueDate), { withTime: true }),
    }),
  changeDueDate: ({ dueDate }) =>
    (({ dueDate }) => `изменил(а) срок на ${dueDate}`)({
      dueDate: getLiteralDate(dayjs(dueDate), { withTime: true }),
    }),
  deleteDueDate: () => 'удалил(а) срок',
  addChecklist: ({ checklistTitle }) => `добавил(а) чек-лист ${checklistTitle}`,
  deleteChecklist: ({ checklistTitle }) => `удадил(а) чек-лист ${checklistTitle}`,
  renameChecklist: ({ oldChecklistTitle, newChecklistTitle }) =>
    `переименовал(а) чек-лист ${newChecklistTitle} (с ${oldChecklistTitle})`,
}

type IProps = {
  issues: []
  boardId: string
  favorites: []
  members: []
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
        url: '/attachments/transparent1.png',
        thumbnail: '/attachments/previews/transparent1.png',
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
  const issues = Array.from({ length: 20 }, (v, k) => k).map((k) => ({
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

function HeaderDivider() {
  return (
    <div className="float-left ml-1 mr-2 mt-2 mb-3 inline-block h-4 border-l border-[var(--dynamic-text-transparent)]" />
  )
}

function MenuDivider() {
  return <hr className="my-2 border-[var(--ds-border,#091e4221)]" />
}

function MenuButton({ icon, children, subtitle }) {
  return (
    <Button className="flex h-auto w-full items-start rounded-[3px] border-0 bg-transparent px-3 py-1.5 text-[var(--ds-text-subtle,inherit)] shadow-none hover:bg-[var(--ds-background-neutral-subtle-hovered,#091e4214)] active:bg-[var(--ds-background-neutral-subtle-pressed,#e4f0f6)]">
      <div className="flex h-5 w-3.5 items-center justify-center leading-none">{icon}</div>
      <div className="ml-2 flex grow flex-col items-start leading-5">
        <div className="font-semibold">{children}</div>
        <div className="text-[var(--ds-text-subtle,#5E6C84)]">{subtitle}</div>
      </div>
    </Button>
  )
  // return (
  //   <a
  //     role="button" // TODO: replace to <button />
  //     className="relative flex flex-col rounded-[3px] bg-transparent py-1.5 pl-9 pr-1.5 leading-5 text-[var(--ds-text-subtle,inherit)] hover:bg-[var(--ds-background-neutral-subtle-hovered,#091e4214)]"
  //   >
  //     <div className="absolute left-[12px] top-[9px] leading-none">{icon}</div>
  //     <div className="font-semibold">{children}</div>
  //     <div className="text-[var(--ds-text-subtle,#5E6C84)]">{subtitle}</div>
  //   </a>
  // )
}

function ShareButton() {
  const [isOpen, setIsOpen] = React.useState(false)
  const close = () => {
    setIsOpen(false)
  }
  return (
    <>
      <BoardHeaderButton
        // aria-label=""
        title="Поделиться доской"
        onClick={(e) => {
          setIsOpen(true)
        }}
        className="float-left"
        icon={<UserAddOutlined />}
        colors="bg-[var(--ds-background-input,#FFFFFF)] text-[var(--ds-text,#000000)] hover:bg-[var(--ds-background-input-hovered,#ffffffe5)]"
      >
        Поделиться
      </BoardHeaderButton>
      <Modal
        open={isOpen}
        onCancel={close}
        title="Поделиться доской"
        // transitionName=""
        // maskTransitionName=""
        // style={null}
        // closable={false}
        footer={null}
        destroyOnClose
        centered
        // width={760}
        // mask={false}
        // wrapClassName="search-modal"
      >
        123
      </Modal>
    </>
  )
}

// TODO: при drag должна быть круглая форма (overflow:clip; overflow-clip-margin:content-box;)
// TODO: drag'n'drop для Avatar на ListCard
function MemberIcon({ login: { uuid, username }, picture: { thumbnail }, name, zIndex }) {
  return (
    <button
      title={`${name.first} ${name.last} (${username})`}
      className={cx(
        '[&>.ant-avatar]:bg-[var(--ds-background-accent-gray-subtlest,#dfe1e6)]',
        'hover:[&>.ant-avatar]:bg-[var(--ds-background-accent-gray-subtler,#c1c7d0)] hover:[&>.ant-avatar>img]:opacity-80',
        'active:[&>.ant-avatar]:bg-[var(--ds-background-accent-gray-subtle,#b3bac5)] active:[&>.ant-avatar>img]:opacity-70',
      )}
      onClick={(event) => {
        // event.preventDefault()
        // TODO: popup профиля
      }}
    >
      <Avatar draggable={false} src={thumbnail} style={{ zIndex: zIndex }} />
    </button>
  )
}

function MembersButton({ members }) {
  const maxCount = 5
  return (
    <Avatar.Group
      className={cx(
        'float-left mb-1 mr-1 inline-flex h-8 items-center px-1',
        members.length > maxCount &&
          'select-none [&>:last-child]:bg-[var(--dynamic-button)] [&>:last-child]:text-[var(--dynamic-text)] hover:[&>:last-child]:bg-[var(--dynamic-button-hovered)] active:[&>:last-child]:bg-[var(--dynamic-button-pressed)]',
      )}
      size="small"
      maxCount={maxCount}
      maxPopoverPlacement="bottomLeft"
      maxPopoverTrigger="click"
    >
      {members.map((member, index, a) => (
        <MemberIcon key={member.login.uuid} {...member} zIndex={a.length - index} />
      ))}
    </Avatar.Group>
  )
}

function InFavoritesButton({ favorites, onDelete }) {
  const items = favorites.map(({ boardId, name, workspace, color, wallpapper }) => (
    <div key={boardId} className="pt-1 pb-1">
      <div className="flex h-8 select-none rounded-[3px] hover:bg-[var(--ds-background-neutral,#EBECF0)]">
        <div
          className="h-8 w-[52px] flex-none rounded-[3px]"
          style={{
            backgroundColor: color,
            // TODO: wallpapper
          }}
        />
        <div className="flex grow flex-col truncate pl-2">
          <div className="truncate text-[14px] font-[500] leading-[18px]">{name}</div>
          <div className="truncate text-[12px] leading-[12px] text-[var(--ds-text-subtle,#5E6C84)]">
            {workspace}
          </div>
        </div>
        <div className="flex w-8 flex-none items-center justify-center">
          <Button
            className="border-[var(--ds-border,#091e4221)] shadow-none [&>.anticon]:text-[#f2d600] [&:hover>.anticon]:scale-125 [&:focus>.anticon]:scale-125"
            title={`Нажмите, чтобы удалить доску "${name}" из избранного.`}
            icon={<StarFilled />}
            size="small"
            onClick={() => onDelete(boardId)}
          ></Button>
        </div>
      </div>
    </div>
  ))
  return (
    <CustomDropdown
      smallSize
      footer={
        items.length === 0 ? (
          // TODO: добавить картинку
          <div className="mt-3 mb-2 text-center">
            Чтобы быстро находить важные доски, отмечайте их.
          </div>
        ) : (
          // TODO: добавить перестановку через drag'n'drop
          <div className="mb-2">{items}</div>
        )
      }
    >
      <BoardHeaderButton
        aria-label="Избранные"
        // title="" // TODO: добавить title
        colors="bg-transparent text-[var(--dynamic-text)] hover:bg-[var(--dynamic-button-hovered)]"
        // var(--header-menu-background)
        // var(--header-menu-color)
      >
        В избранном
        <DownOutlined />
      </BoardHeaderButton>
    </CustomDropdown>
  )
}

function FilterItem({ background, icon, text, isFirst }) {
  return (
    <Checkbox
      value={text} // TODO: реализовать фильтр
      className={cx(
        'flex items-center [&>.ant-checkbox]:top-0',
        isFirst ? 'text-[var(--ds-text-subtle,#5e6c84)]' : 'text-[var(--ds-text, #172b4d)]', // TODO: first:
      )}
    >
      {icon ? (
        <Space>
          <div className={cx('flex h-6 w-6 items-center justify-center rounded-[50%]', background)}>
            {icon}
          </div>
          {text}
        </Space>
      ) : (
        text
      )}
    </Checkbox>
  )
}

function FilterButton() {
  const [isAllDeadlineItems, setAllDeadlineItems] = React.useState(false)
  const [filterCount, setFilterCount] = React.useState(8)
  const isFilter = filterCount > 0
  const [isOpen, setOpen] = React.useState(false)
  const [form] = Form.useForm()
  const memberItems = [
    {
      icon: <UserOutlined className="text-[var(--ds-icon-subtle,#6B778C)]" />,
      background: 'bg-[var(--ds-background-neutral,#EBECF0)]',
      text: 'Нет участников',
    },
    {
      icon: <UserOutlined className="text-[white]" />,
      background: 'bg-[green]',
      text: 'Карточки, назначенные мне',
    },
  ]
  const deadlineItems = [
    {
      icon: <CalendarOutlined className="text-[var(--ds-icon-subtle,#6B778C)]" />,
      background: 'bg-[var(--ds-background-neutral,#EBECF0)]',
      text: 'Без даты',
    },
    {
      icon: <ClockCircleOutlined className="text-[var(--ds-icon-inverse,#FFFFFF)]" />,
      background: 'bg-[var(--ds-background-danger-bold,#EB5A46)]',
      text: 'Просроченные',
    },
    {
      icon: <ClockCircleOutlined className="text-[var(--ds-icon-inverse,#FFFFFF)]" />,
      background: 'bg-[var(--ds-background-warning-bold,#F2D600)]',
      text: 'Срок истекает в течение суток',
    },
    {
      icon: <ClockCircleOutlined className="var(--ds-icon,#42526E)" />,
      background: 'bg-[var(--ds-background-neutral,#EBECF0)]',
      text: 'Срок истекает в течение недели',
    },
    {
      icon: <ClockCircleOutlined className="var(--ds-icon,#42526E)" />,
      background: 'bg-[var(--ds-background-neutral,#EBECF0)]',
      text: 'Срок истекает в течение месяца',
    },
    {
      text: 'Отмечено как выполненное',
    },
    {
      text: 'Не отмечено как выполненное',
    },
  ]
  return (
    <CustomDropdown
      items={[]}
      placement="bottom"
      header="Фильтр"
      footer={
        <Form
          className="w-full pt-1"
          form={form}
          layout="vertical"
          // initialValues={{ requiredMarkValue: requiredMark }}
          // onValuesChange={onRequiredTypeChange}
          // requiredMark={requiredMark}
        >
          <Form.Item
            label="Ключевое слово"
            help="Поиск карточек, участников, меток и т. д."
            // TODO: label var(--ds-text-subtle, #5e6c84)
          >
            <Input
              placeholder="Введите ключевое слово…"
              className="mt-[-2px] bg-[var(--ds-background-input,#fafbfc)] placeholder:text-[var(--ds-text-subtle,#6b778c)] hover:bg-[var(--ds-background-input-hovered,#ebecf0)] focus:bg-[var(--ds-background-input,#ffffff)]"
            />
          </Form.Item>
          <Form.Item label="Участники">
            <Checkbox.Group className="flex w-full select-none flex-col [&>.ant-checkbox-wrapper]:ml-0">
              <Space direction="vertical" className="w-full">
                {memberItems.map((item, index) => (
                  <FilterItem key={index} {...item} isFirst={index === 0} />
                ))}
              </Space>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item label="Срок">
            <Checkbox.Group className="flex w-full select-none flex-col [&>.ant-checkbox-wrapper]:ml-0">
              <Space direction="vertical" className="w-full">
                {(isAllDeadlineItems ? deadlineItems : deadlineItems.slice(0, 3)).map(
                  (item, index) => (
                    <FilterItem key={index} {...item} isFirst={index === 0} />
                  ),
                )}
              </Space>
            </Checkbox.Group>
            {isAllDeadlineItems || (
              <Button
                className="ml-6 mt-2 p-0 text-[var(--ds-link,#5e6c84)] hover:text-[var(--ds-link,#172b4d)] hover:underline"
                type="link"
                size="small"
                onClick={() => setAllDeadlineItems(true)}
              >
                Показать все параметры
                <DownOutlined />
              </Button>
            )}
          </Form.Item>
        </Form>
        // TODO: фильтр по меткам
        // TODO: выбор типа совпадения
      }
      onOpenChange={(flag) => {
        setOpen(flag)
        if (flag) {
          setAllDeadlineItems(false) // TODO: сворачивать, только если не отмечено из расширенного списка
          // setFilter(true)
        } else {
          // setFilter(false)
        }
      }}
    >
      <div className="float-left mb-1 mr-1 inline-flex">
        <BoardHeaderButton
          // aria-label=""
          title="Фильтр карточек"
          // onClick={(event) => {
          //   event.preventDefault()
          // }}
          indent={false}
          icon={<FilterOutlined />}
          colors={cx(
            (isOpen || isFilter) &&
              'bg-[var(--dynamic-button-highlighted)] text-[var(--dynamic-button-highlighted-text)] hover:bg-[var(--dynamic-button-highlighted-hovered)] hover:text-[var(--dynamic-button-highlighted-text)]',
          )}
          className={cx(isFilter && 'rounded-r-none')}
        >
          Фильтр
          {isFilter && (
            <span className="ml-2 rounded-[20px] bg-[var(--dynamic-button-highlighted-hovered)] px-1.5">
              {filterCount}
            </span>
          )}
        </BoardHeaderButton>
        {isFilter && (
          <BoardHeaderButton
            // aria-label=""
            title="Очистить фильтры"
            indent={false}
            colors="bg-[var(--dynamic-button-highlighted)] text-[var(--dynamic-button-highlighted-text)] hover:bg-[var(--dynamic-button-highlighted-hovered)] hover:text-[var(--dynamic-button-highlighted-text)]"
            className="rounded-l-none"
            icon={<CloseOutlined />}
            onClick={(event) => {
              event.stopPropagation()
              setFilterCount(0)
            }}
          />
        )}
      </div>
    </CustomDropdown>
  )
}

function PlusButton() {
  const handleClick = () => {}
  const ariaLabel = 'Создать доску или рабочее пространство'
  return (
    <div tabIndex={0} className="mr-1 mb-1 ml-2">
      <div className="lg:hidden">
        <BoardHeaderButton
          aria-label={ariaLabel}
          tabIndex={-1}
          indent={false}
          icon={<PlusOutlined />}
          onClick={handleClick}
          // исключён active:bg- (как в оригинале)
          colors="bg-[var(--dynamic-button)] text-[var(--dynamic-text)] hover:bg-[var(--dynamic-button-hovered)]"
        />
      </div>
      <div className="hidden lg:block">
        <BoardHeaderButton
          aria-label={ariaLabel}
          tabIndex={-1}
          indent={false}
          onClick={handleClick}
        >
          Создать
        </BoardHeaderButton>
      </div>
    </div>
  )
}

function MoreButton({ onClick }) {
  // TODO: во время анимации появляется горизонтальная прокрутка окна
  return (
    <BoardHeaderButton
      className="float-left"
      icon={<MoreOutlined />}
      onClick={onClick}
    ></BoardHeaderButton>
  )
}

// function CloseButton({ onClick }) {
//   // неудачная попытка повторить кнопку модального диалога antd
//   // TODO: для Drawer нужно увеличить размер
//   return (
//     <button
//       tabIndex="-1"
//       className="h-[22px] w-[22px] rounded-[4px] text-[14px] leading-[22px]
//         transition-colors
//         hover:bg-black/[0.06]
//         active:bg-black/[0.15]
//         [&>.anticon]:m-0
//         [&>.anticon]:align-[-2px]
//         [&>.anticon]:text-black/[0.45]
//         [&:hover>.anticon]:text-black/[0.88]"
//       type="button"
//       aria-label="Close"
//       onClick={onClick}
//     >
//       <CloseOutlined
//       // style={{
//       //   color: '#6b778c', // TODO: var(--ds-icon-subtle,#6b778c);
//       // }}
//       />
//     </button>
//   )
// }

function CustomDropdownItem({ children }) {
  return (
    <a
      tabIndex={-1}
      href="#" // TODO: replace to role="button" or <button />
      onClick={(event) => {
        event.preventDefault()
      }}
      className="mx-[-12px] block py-[6px] px-[12px] text-sm text-[var(--ds-text,#172b4d)] hover:bg-[var(--ds-background-neutral-hovered,#091e420a)] active:bg-[var(--ds-background-neutral-pressed,#e4f0f6)]"
    >
      {children}
    </a>
  )
}

function CustomDropdown({
  header,
  footer,
  items = [],
  onClick,
  onOpenChange,
  placement = 'bottomLeft',
  smallSize = false,
  children,
}) {
  const [open, setOpen] = React.useState(false)
  // const { width, height } = useWindowSize() // TODO: ошибки в смещении при уменьшении размера экрана
  const { token } = theme.useToken()
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    // borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  }
  const menuStyle = {
    boxShadow: 'none',
  }
  return (
    <Dropdown
      trigger={['click']}
      onOpenChange={(flag) => {
        setOpen(flag)
        if (onOpenChange) {
          onOpenChange(flag)
        }
      }}
      open={open}
      placement={placement} // TODO: ошибки в смещении при уменьшении размера экрана
      menu={{
        items,
        onClick: (event) => {
          if (onClick) {
            onClick(event)
          }
          setOpen(false)
        },
      }}
      dropdownRender={(menu) => (
        <div
          style={{
            ...contentStyle,
            // TODO: ошибки в смещении при уменьшении размера экрана
            // width: `${width}px`
          }}
          className={cx(
            'rounded-[3px]',
            // TODO: max-w-
            // TODO: FilterButton - 384px (а надо?)
            smallSize ? 'w-[304px]' : 'w-[370px]',
          )}
        >
          {header && (
            <div className="relative mb-2">
              <span className="mx-3 block truncate border-b border-[var(--ds-border,#091e4221)] px-7 text-center leading-10 text-[var(--ds-text-subtle,#5e6c84)]">
                {header}
              </span>
              <a
                className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center text-[var(--ds-icon-subtle,#6b778c)]  hover:text-[var(--ds-icon,#172b4d)]"
                href="#" // TODO: replace to role="button" or <button />
                onClick={(event) => {
                  event.preventDefault()
                  setOpen(false)
                }}
              >
                <CloseOutlined />
              </a>
            </div>
          )}
          {!header && !footer && <div className="pt-3" />}
          {items.length > 0 && (
            <div
              className={cx(
                'overflow-y-auto overflow-x-hidden px-3 pb-3',
                '[&>.ant-dropdown-menu]:p-0',
                '[&>.ant-dropdown-menu>.ant-dropdown-menu-item]:p-0',
                '[&>.ant-dropdown-menu>.ant-dropdown-menu-item:hover]:bg-black/0',
                '[&>.ant-dropdown-menu>.ant-dropdown-menu-item-divider]:my-2',
                '[&>.ant-dropdown-menu>.ant-dropdown-menu-item-divider]:bg-[var(--ds-border,#091e4221)]',
              )}
              // TODO: ошибки в смещении при уменьшении размера экрана
              // style={{
              //   maxHeight: `calc(${height}px - 48px)`,
              // }}
            >
              {React.cloneElement(menu as React.ReactElement, {
                tabIndex: '-1', // TODO: пока отключил [TAB], надо включить
                style: menuStyle,
              })}
            </div>
          )}
          {footer && <div className="px-3 py-3">{footer}</div>}
        </div>
      )}
    >
      {children}
    </Dropdown>
  )
}

function PermisionLevelButton() {
  const [selected, setSelected] = React.useState('public')
  const map = {
    private: {
      icon: <LockTwoTone twoToneColor="#eb5a46" />, // TODO: var(--ds-icon-accent-red,#eb5a46)
      buttonIcon: <LockOutlined />,
      itemText: 'Приватная',
      title: 'Просматривать и изменять эту доску могут только её участники.',
    },
    workspace: {
      icon: <TeamOutlined style={{ color: '#42526e' }} />, // TODO: var(--ds-icon,#42526e);
      buttonIcon: <TeamOutlined />,
      itemText: 'Рабочее пространство', // TODO: itemSubText
      buttonText: 'Для рабочего пространства',
      title: 'Просматривать и изменять эту доску могут все участники рабочего пространства.',
    },
    // TODO: добавить режим 'enterprise'
    // enterprise: {
    //   icon: <BlockOutlined style={{ color: '#6b778c' }} />, // TODO: var(--ds-icon-subtle,#6b778c);
    //   buttonIcon: <BlockOutlined />,
    //   itemText: 'Организация',
    //   title:
    //     'Просматривать эту доску могут все сотрудники организации. Чтобы предоставить это разрешение, доску нужно добавить в корпоративное рабочее пространство.',
    // },
    // TODO: добавить подтверждение перед включением публичного режима
    public: {
      icon: <GlobalOutlined style={{ color: '#61bd4f' }} />, // TODO: var(--ds-icon-accent-green,#61bd4f);
      buttonIcon: <GlobalOutlined />,
      itemText: 'Публичная',
      title: 'Публичные доски доступны для всех в Интернете.',
    },
  }
  const items = Object.entries(map).map(([key, { icon, itemText, title }]) => ({
    key,
    label: (
      <CustomDropdownItem>
        <span className="flex items-center">
          <span className="mr-1 inline-flex">{icon}</span>
          {itemText}
          {key === selected && (
            <span className="ml-2 inline-flex text-[var(--ds-icon,#42526e)]">
              <CheckOutlined />
            </span>
          )}
        </span>
        <span className="mt-1 inline-block text-xs text-[var(--ds-text-subtle,#5e6c84)]">
          {title}
        </span>
      </CustomDropdownItem>
    ),
  }))
  const value = map[selected]
  return (
    <CustomDropdown
      header="Изменение видимости"
      items={items}
      onClick={(event) => {
        setSelected(event.key)
      }}
    >
      <BoardHeaderButton
        aria-label="Изменить уровень доступа к доске"
        title={value.title}
        onClick={(e) => e.preventDefault()}
        icon={value.buttonIcon}
        className="float-left"
      >
        {value.buttonText || value.itemText}
      </BoardHeaderButton>
    </CustomDropdown>
  )
}

// TODO: Using <Button> results in "findDOMNode is deprecated in StrictMode" warning
// https://github.com/ant-design/ant-design/issues/22493

function FavoriteButton({ boardId, favorites, onChange }) {
  const switchState = favorites.findIndex((item) => item.boardId === boardId) > -1
  return (
    <BoardHeaderButton
      className={cx(
        'float-left',
        '[&:hover>.anticon]:scale-125 [&:focus>.anticon]:scale-125',
        switchState && '[&>.anticon]:text-[#f2d600]',
      )}
      aria-label="Добавить или удалить доску из избранного"
      title="Нажмите, чтобы добавить или удалить доску из избранного. Избранные доски отображаются вверху вашего списка досок."
      icon={switchState ? <StarFilled /> : <StarOutlined />}
      onClick={() => {
        onChange(!switchState)
      }}
    ></BoardHeaderButton>
  )
}

function BoardHeaderButton({
  className,
  title,
  children,
  icon,
  onClick,
  'aria-label': ariaLabel,
  tabIndex = 0,
  indent = true,
  colors,
  shape = 'default',
}) {
  return (
    <Button
      aria-label={ariaLabel}
      className={cx(
        // FIX: вынес, т.к. не работает переопределение цветов в className (для FilterButton)
        colors ||
          [
            'bg-[var(--dynamic-button)]',
            'text-[var(--dynamic-text)]',
            'hover:bg-[var(--dynamic-button-hovered)]',
            'active:bg-[var(--dynamic-button-pressed)]',
          ].join(' '),
        'border-0 leading-5 shadow-none',
        shape === 'default' && 'rounded-[3px]',
        indent && 'mr-1 mb-1',
        children && 'px-3', // : 'w-8 px-0',
        className,
      )}
      {...{ title, icon, onClick, tabIndex, shape }}
    >
      {children}
    </Button>
  )
}

function BoardNameButton({ defaultValue, onEndEdit }) {
  const inputRef = React.useRef()
  const textRef = React.useRef()
  const [state, setState] = React.useState({
    isInput: false,
    width: 0,
    value: defaultValue,
  })
  return (
    <div
      className={cx(
        'relative float-left mr-1 mb-1 h-[32px] rounded-[3px] text-[18px] font-bold leading-8',
        'text-[var(--dynamic-text)]',
        'hover:bg-[var(--dynamic-button-hovered)]',
        'active:bg-[var(--dynamic-button-pressed)]',
      )}
      style={{
        maxWidth: 'calc(100% - 24px)',
        transition: '.1s ease',
      }}
    >
      <a
        href="#" // TODO: replace to role="button" or <button />
        aria-label="Редактировать название доски"
        title="Нажмите, чтобы отредактировать название доски."
        onClick={(event) => {
          event.preventDefault()
          setState({
            ...state,
            isInput: true,
            width: textRef.current.offsetWidth,
          })
          setTimeout(() => {
            inputRef.current.focus({
              preventScroll: true,
              cursor: 'all',
            })
          })
        }}
      >
        <h1 ref={textRef} className="mb-3 min-w-[25px] max-w-full truncate whitespace-pre px-3">
          {state.value}
        </h1>
      </a>
      <Input
        className={cx(
          'absolute top-0 left-0 right-0 bottom-0',
          'h-[32px] rounded-[3px] px-3 py-0 text-[18px] font-bold leading-5',
          'bg-[var(--ds-background-input,#fff)]',
          state.isInput || 'hidden',
        )}
        bordered={false}
        ref={inputRef}
        maxlengt={512}
        spellCheck={false}
        onBlur={() => {
          let value = state.value.trim()
          if (value == '') {
            value = defaultValue
          }
          textRef.current.innerText = value // for textRef.current.offsetWidth
          setState({
            isInput: false,
            width: textRef.current.offsetWidth,
            value,
          })
          onEndEdit(value)
        }}
        value={state.value}
        onChange={(event) => {
          const value = event.target.value
          textRef.current.innerText = value // for textRef.current.offsetWidth
          setState({
            ...state,
            value,
            width: textRef.current.offsetWidth,
          })
        }}
      />
    </div>
  )
}

function NavHeaderButton({ icon }) {
  return (
    <div role="presentation">
      <Button
        className="border-0 bg-transparent text-[var(--dynamic-text)] shadow-none hover:bg-[var(--dynamic-button-hovered)]"
        shape="circle"
        icon={icon}
      ></Button>
    </div>
  )
}

function SearchPrefixIcon({ onClick }) {
  return (
    <Button
      className={cx(
        'h-[22px] w-[22px] min-w-[22px] border-0 bg-transparent shadow-none',
        onClick ? 'text-white' : 'text-black',
      )}
      size="small"
      shape="circle"
      icon={<SearchOutlined />}
      onClick={onClick}
    />
  )
}

function Search({ defaultValue, close }) {
  const inputRef = React.useRef()
  React.useEffect(() => {
    inputRef.current.focus()
  }, [])
  const ref = React.useRef(null)
  useOnClickOutside(ref, close)
  return (
    <div ref={ref}>
      <Input
        ref={inputRef}
        className="pointer-events-auto rounded-[5px] border border-solid border-[var(--ds-border-focused,#388BFF)] bg-[white] pl-1"
        bordered={false}
        placeholder="Поиск в CSP"
        prefix={<SearchPrefixIcon />}
        defaultValue={defaultValue}
      />
      <div className="search-results pointer-events-auto mt-2 h-96 rounded-[3px] bg-white p-8">
        <div
          // TODO: overflow-y-auto неправильно работает
          className=""
        >
          <Button>OK</Button>
          <p>some contents…</p>
          <p>some contents…</p>
          <p>some contents…</p>
        </div>
        <div>Footer</div>
      </div>
    </div>
  )
}

function SearchButton() {
  const [isSearch, setIsSearch] = React.useState(false)
  const [search, setSearch] = React.useState('')
  const inputContainerRef = React.useRef()
  const inputRef = React.useRef()
  const buttonContainerRef = React.useRef()
  const buttonRef = React.useRef()
  const close = () => {
    setSearch('')
    setIsSearch(false)
    setTimeout(() => {
      if (window.getComputedStyle(inputContainerRef.current).display === 'block') {
        inputRef.current.focus()
        inputRef.current.blur()
      } else if (window.getComputedStyle(buttonContainerRef.current).display === 'block') {
        buttonRef.current.focus()
        buttonRef.current.blur()
      }
    })
  }
  return (
    <>
      <div ref={inputContainerRef} className={cx('hidden', isSearch || 'md:block')}>
        <Input
          className="rounded-[5px] border border-solid border-white/30 bg-white/[.15] pl-1 caret-white hover:bg-white/30 [&>input::placeholder]:text-white"
          bordered={false}
          placeholder="Поиск"
          prefix={<SearchPrefixIcon onClick={() => setIsSearch(true)} />}
          onClick={() => setIsSearch(true)}
          onChange={(event) => {
            setSearch(event.target.value)
            setIsSearch(true)
          }}
          value={search}
          ref={inputRef}
        />
      </div>
      <div ref={buttonContainerRef} className={cx('md:hidden', isSearch && 'hidden')}>
        <Button
          className="rounded-[3px] border-0 bg-transparent text-[var(--dynamic-text)] shadow-none hover:bg-[var(--dynamic-button-hovered)]"
          icon={<SearchOutlined />}
          onClick={() => setIsSearch(true)}
          ref={buttonRef}
        />
      </div>
      <Modal
        className={cx(
          'top-[6px] pb-0',
          '[&>.ant-modal-content]:pointer-events-none',
          '[&>.ant-modal-content]:rounded-[3px]',
          '[&>.ant-modal-content]:bg-white/0',
          '[&>.ant-modal-content]:p-0',
          '[&>.ant-modal-content]:shadow-none',
        )}
        open={isSearch}
        onCancel={close}
        transitionName=""
        // maskTransitionName=""
        // style={null}
        closable={false}
        footer={null}
        destroyOnClose
        width={760}
        mask={false}
        wrapClassName="search-modal"
      >
        <Search defaultValue={search} close={close} />
      </Modal>
    </>
  )
}

function BoardPage(props: IProps) {
  const router = useRouter()
  const { breadcrumbs } = router.query
  const [isUrlName, setIsUrlName] = React.useState(false)
  React.useEffect(() => {
    if (breadcrumbs === undefined) {
      return
    }
    if (breadcrumbs[0] === 'b' && breadcrumbs[2] !== props.urlName) {
      router.push(`/${breadcrumbs[0]}/${breadcrumbs[1]}/${props.urlName}`, undefined, {
        shallow: true,
      })
      return
    }
    setIsUrlName(true)
  }, [breadcrumbs])
  // const [isMoreButton, setIsMoreButton] = React.useState(true)
  const [isMenu, setIsMenu] = React.useState(false)
  const [favorites, setFavorites] = React.useState(props.favorites)
  const handleChangeFavorites = (value) => {
    if (value) {
      setFavorites([
        ...favorites,
        {
          boardId: props.boardId,
          name: 'Minsk4',
          workspace: 'Andrew Ka',
          color: '#cd5a91',
          wallpapper: '/wallpapper.jpg',
        },
      ])
    } else {
      setFavorites(favorites.filter((item) => item.boardId !== props.boardId))
    }
  }
  const handleDeleteFavorites = (boardId) => {
    setFavorites(favorites.filter((item) => item.boardId !== boardId))
  }
  if (!isUrlName) {
    return
  }
  return (
    <div
      id="chrome-container"
      // className="body-dark-board-background"
      className="h-full bg-[#cd5a91]" // overflow-hidden
    >
      <div id="surface" className="flex h-full flex-col">
        <div className="max-h-[44px] min-h-[44px] overflow-hidden">
          <nav
            // TODO: transition
            className="flex max-h-[44px] border-b border-[var(--dynamic-text-transparent)] bg-[var(--dynamic-background)] px-1 py-1.5 backdrop-blur-[6px]"
          >
            <Link
              href="/"
              className="mr-1 mb-1 h-8 rounded-[3px] px-1.5 hover:bg-[var(--dynamic-button-hovered)]"
              aria-label="Вернуться на главную страницу"
            >
              <div className="flex h-8 items-center gap-1 text-[18px] font-bold leading-8 text-[var(--dynamic-text)]">
                <HeartOutlined />
                Secret
              </div>
            </Link>
            <InFavoritesButton favorites={favorites} onDelete={handleDeleteFavorites} />
            <PlusButton />
            <div className="flex grow"></div>
            <div className="flex space-x-1">
              <SearchButton />
              <NavHeaderButton icon={<BellOutlined />} />
              <NavHeaderButton icon={<QuestionCircleOutlined />} />
              <NavHeaderButton icon={<UserOutlined />} />
            </div>
          </nav>
        </div>
        <main className="flex grow flex-col">
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
                    <div
                      id="board-header"
                      className="h-auto bg-[var(--board-header-background-color)] pt-2 pr-1 pb-1 pl-2.5"
                    >
                      <BoardNameButton
                        defaultValue="Minsk4"
                        onEndEdit={(value) => {
                          console.log(value)
                        }}
                      />
                      <FavoriteButton
                        boardId={props.boardId}
                        favorites={favorites}
                        onChange={handleChangeFavorites}
                      />
                      <HeaderDivider />
                      <PermisionLevelButton />
                      <div className="float-right">
                        <FilterButton />
                        <HeaderDivider />
                        <MembersButton members={props.members} />
                        <ShareButton />
                        <HeaderDivider />
                        {/* {isMoreButton && ( */}
                        <MoreButton
                          onClick={() => {
                            // setIsMoreButton(false)
                            setIsMenu(!isMenu)
                          }}
                        />
                        {/* )} */}
                      </div>
                    </div>
                    <div id="board-warnings"></div>
                    <div
                      id="board-canvas"
                      className="grow"
                      style={{
                        background:
                          'linear-gradient(to bottom,var(--board-header-background-color),#0000 80px,#0000)',
                      }}
                    >
                      <Board issues={props.issues} />
                    </div>
                  </div>
                  <Drawer
                    className="relative bg-[var(--ds-surface-overlay,#f4f5f7)]"
                    bodyStyle={{
                      padding: '0 12px',
                    }}
                    // title="Меню"
                    placement="right"
                    // onClose={() => {
                    //   setIsMenu(false)
                    // }}
                    // afterOpenChange={() => {
                    //   if (!isMenu) setIsMoreButton(true)
                    // }}
                    open={isMenu}
                    mask={false}
                    getContainer={false}
                    width={339 + 6}
                    closable={false}
                    // extra={
                    //   <CloseButton
                    //     onClick={() => {
                    //       setIsMenu(false)
                    //     }}
                    //   />
                    // }
                  >
                    <div className="flex h-12 items-center justify-center px-9">
                      <BoardTitle>Меню</BoardTitle>
                    </div>
                    <a
                      className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center text-[var(--ds-icon-subtle,#6b778c)]  hover:text-[var(--ds-icon,#172b4d)]"
                      href="#" // TODO: replace to role="button" or <button />
                      onClick={(event) => {
                        event.preventDefault()
                        setIsMenu(false)
                      }}
                    >
                      <CloseOutlined className="scale-125" />
                    </a>
                    <HorizontalDivider />
                    <MenuButton icon={<ProjectOutlined />} subtitle="Добавьте описание для доски">
                      О доске
                    </MenuButton>
                    <MenuButton>Сменить фон</MenuButton>
                    <MenuButton icon={<EllipsisOutlined />}>Ещё</MenuButton>
                    <MenuDivider />
                    <MenuButton icon={<BarsOutlined />}>Действия</MenuButton>
                  </Drawer>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {breadcrumbs[0] === 'c' && <CardDetailWindow issue={props.issues[0]} />}
    </div>
  )
}

export default BoardPage
