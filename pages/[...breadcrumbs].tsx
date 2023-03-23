import React from 'react'
import { useRouter } from 'next/router'
import {
  // SearchOutlined,
  UserOutlined,
  // StarOutlined,
  // StarFilled,
  // LockTwoTone,
  // LockOutlined,
  // GlobalOutlined,
  // TeamOutlined,
  // BlockOutlined,
  CheckOutlined,
  CloseOutlined,
  PlusOutlined,
  DownOutlined,
  // FilterOutlined,
  // CalendarOutlined,
  ClockCircleOutlined,
  UserAddOutlined,
  // LayoutOutlined,
  EllipsisOutlined,
  MoreOutlined,
  // ProfileOutlined,
  EditOutlined,
  EyeOutlined,
  ContainerOutlined,
  CheckSquareOutlined,
  PaperClipOutlined,
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
  LoadingOutlined,
  FireOutlined,
} from '@ant-design/icons'
import {
  // Layout,
  Tooltip,
  Avatar,
  Button,
  Input,
  Checkbox,
  Modal,
  Space,
  // Divider,
  // TODO: renderCloseIcon,
  Progress,
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
import dayjs from 'dayjs'
import ColorThief from 'colorthief'
import convertRGBToHSL from '.../utils/convertRGBToHSL'
import isHTMLControl from '.../utils/isHTMLControl'
// import useScrollWithShadow from '.../utils/useScrollWithShadow'
import { ClickScrollPlugin } from 'overlayscrollbars'
import Header from '.../components/Header'
import HeaderButton from '.../components/HeaderButton'
import BoardHeader from '.../components/BoardHeader'
import MemberIcon from '.../components/MemberIcon'
import Board from '.../components/Board'
import getDueDateMode from '.../utils/getDueDateMode'
import BoardMenu from '.../components/BoardMenu'

// TODO: data for custom system scroll: console.log(window.scrollX, document.body.scrollWidth, document.body.clientWidth)

function EditCloseButton({ onClick }) {
  return (
    <Button
      className={cx(
        [
          'text-[var(--ds-icon,#42526e)]',
          'bg-transparent',
          'hover:text-[var(--ds-icon,#172b4d)]',
          'hover:bg-[var(--ds-background-neutral-hovered,#091e4214)]',
          'active:bg-[var(--ds-background-neutral-pressed,#091e4221)]',
        ].join(' '),
        'min-w-[32px] rounded-[3px] border-0 bg-transparent shadow-none',
      )}
      aria-label="Отменить изменения"
      icon={<CloseOutlined className="scale-125" />}
      {...{ onClick }}
    />
  )
}

function CardDetailChecklistNewItem() {
  const { isExpanded, setIsExpanded } = React.useContext(ChecklistListContext)
  const [isEdit, setIsEdit] = React.useState(false)
  // TODO: если заполнить поле ввода через буфер обмена многострочным текстом, то каждая строка будет отдельным элементом после отправки формы
  const [value, setValue] = React.useState('')
  return isEdit ? (
    <ChecklistInputBox
      className="mt-[6px]"
      value={value}
      onChange={(event) => {
        setValue(event.target.value)
      }}
      onSubmit={() => {
        console.log('onSubmit')
      }}
      close={() => {
        setIsEdit(false)
      }}
      isNew
    />
  ) : (
    <div className="mt-2">
      <CardDetailButton
        onClick={() => {
          setIsExpanded(false)
          setTimeout(() => {
            setIsExpanded(true)
            setIsEdit(true)
          })
        }}
      >
        Добавить элемент
      </CardDetailButton>
    </div>
  )
}

function CardDetailChecklistItemButton({ icon, circle, transparent, onClick }) {
  return (
    <Button
      className={cx(
        'text-[var(--ds-text,#172b4d)]',
        'hover:bg-[var(--ds-background-neutral-hovered,#091e4214)]',
        'active:bg-[var(--ds-background-neutral-pressed,#091e4221)]',
        'h-6 w-6 border-0 leading-4 shadow-none',
        circle ? 'rounded-[50%]' : 'rounded-[3px]',
        // TODO: это баг или фича? два раза используется alpha от #091e420a
        transparent ? 'bg-transparent' : 'bg-[var(--ds-background-neutral-subtle,#091e420a)]',
      )}
      {...{ icon, onClick }}
    />
  )
}

function ChecklistInputBox({ className, value, onChange, onSubmit, close, isNew, isTitle }) {
  const { isExpanded, setIsExpanded } = React.useContext(ChecklistListContext)
  React.useEffect(() => {
    if (isExpanded) {
      inputRef.current.focus({
        preventScroll: true,
        cursor: 'all',
      })
    } else {
      close()
    }
  }, [isExpanded])
  const ref = React.useRef()
  const inputRef = React.useRef()
  useOnClickOutside(
    ref,
    (event) => {
      if (isHTMLControl(event.target, ref.current)) {
        return
      }
      setIsExpanded(false)
    },
    'mouseup',
  )
  return (
    <div {...{ className }}>
      <div ref={ref}>
        <Input.TextArea
          className={cx(
            isNew
              ? 'border-for-new-checklist-input min-h-[32px] resize-y bg-[var(--ds-background-input,#fff)] placeholder:text-[var(--ds-text-subtle,#5e6c84)]'
              : 'border-for-checklist-input bg-[var(--ds-background-input,#091e420a)]',
            isTitle ? 'text-[16px] font-semibold' : 'text-[14px]',
            'focus-borderless overflow-hidden rounded-[3px] py-2 px-3 leading-5 text-[var(--ds-text,#172b4d)]',
          )}
          placeholder={isNew && 'Добавить элемент'}
          bordered={false}
          ref={inputRef}
          autoSize={{ minRows: 2 }}
          {...{ value, onChange }}
        />
      </div>
      <div className="mt-2 flex gap-1">
        <CardDetailButton
          primary
          onClick={() => {
            if (value.trim() === '') {
              if (isNew || isTitle) {
                inputRef.current.focus()
                return
              } else {
                // TODO: удалить item из BD
              }
            }
            onSubmit()
            close()
          }}
        >
          {isNew ? 'Добавить' : 'Сохранить'}
        </CardDetailButton>
        {/* // TODO: сбрасывать defaultValue по кнопке Отмена/Close */}
        {isNew ? (
          <CardDetailButton ghost onClick={close}>
            Отмена
          </CardDetailButton>
        ) : (
          <EditCloseButton onClick={close} />
        )}
        {isTitle || (
          <>
            <div className="ml-[-4px] grow" />
            <CardDetailButton
              truncated
              asLink
              icon={<UserAddOutlined />}
              onClick={() => {
                console.log('3333')
              }}
            >
              Назначить
            </CardDetailButton>
            <CardDetailButton
              className="min-w-[96px]"
              truncated
              asLink
              icon={<ClockCircleOutlined />}
              onClick={() => {
                console.log('4444')
              }}
            >
              Срок
            </CardDetailButton>
            <CardDetailButton
              className="min-w-[32px]"
              asLink
              icon={<FireOutlined />}
              onClick={() => {
                console.log('5555')
              }}
            />
            <CardDetailButton
              className="min-w-[32px]"
              asLink
              icon={<SmileOutlined />}
              onClick={() => {
                console.log('6666')
              }}
            />
            {isNew || (
              <CardDetailButton
                className="min-w-[32px]"
                asLink
                icon={<EllipsisOutlined />}
                onClick={() => {
                  console.log('7777')
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

function CardDetailChecklistItem({ text }) {
  const complete = true // TODO: complete
  const { setIsExpanded } = React.useContext(ChecklistListContext)
  const [isEdit, setIsEdit] = React.useState(false)
  const [value, setValue] = React.useState(text)
  return (
    //transition-[background-color] duration-300
    <div className="relative cursor-pointer rounded-[3px] pl-10 hover:bg-[var(--ds-background-neutral,#091e420a)] [&:hover>.checklist-item-text-and-controls>.checklist-item-controls]:z-0">
      <Checkbox className="absolute top-[8px] left-[4px] m-[-6px] box-content h-5 w-5 justify-center p-[6px]" />
      {isEdit ? (
        <ChecklistInputBox
          className="pb-2"
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
          }}
          onSubmit={() => {
            console.log('onSubmit')
          }}
          close={() => {
            setIsEdit(false)
          }}
        />
      ) : (
        <div
          className="checklist-item-text-and-controls flex py-[6px]"
          onClick={() => {
            console.log(1)
            setIsExpanded(false)
            setTimeout(() => {
              setIsExpanded(true)
              setIsEdit(true)
            })
          }}
        >
          <span
            className={cx(
              complete
                ? 'text-[var(--ds-text-subtle,#5e6c84)] line-through'
                : 'text-[var(--ds-text,#172b4d)]',
              'flex-1 self-center leading-5',
            )}
          >
            {text}
          </span>
          <div
            // HACK: visible выполняется с transition, a если z-index - без него
            className="checklist-item-controls z-[-1] ml-1 inline-flex gap-1"
          >
            <CardDetailChecklistItemButton
              icon={<ClockCircleOutlined />}
              onClick={(event) => {
                event.stopPropagation()
              }}
            />
            <CardDetailChecklistItemButton
              icon={<UserAddOutlined />}
              circle
              onClick={(event) => {
                event.stopPropagation()
              }}
            />
            <CardDetailChecklistItemButton
              icon={<EllipsisOutlined />}
              transparent
              onClick={(event) => {
                event.stopPropagation()
              }}
            />
          </div>
        </div>
        // TODO: В этом поле есть несохранённые изменения. Посмотреть изменения • Отменить
      )}
    </div>
  )
}

function getChecklistTitleBox(title, getDefaultTitleBox) {
  const { isExpanded, setIsExpanded } = React.useContext(ChecklistListContext)
  const [isEdit, setIsEdit] = React.useState(false)
  const [value, setValue] = React.useState(title)
  return isEdit ? (
    <ChecklistInputBox
      className="pb-2"
      value={value}
      onChange={(event) => {
        setValue(event.target.value)
      }}
      onSubmit={() => {
        console.log('onSubmit')
      }}
      close={() => {
        setIsEdit(false)
      }}
      isTitle
    />
  ) : (
    getDefaultTitleBox({
      onClick: () => {
        setIsExpanded(false)
        setTimeout(() => {
          setIsExpanded(true)
          setIsEdit(true)
        })
      },
    })
  )
}

function CardDetailChecklist({ title, items }) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const checkedCount = 1
  const percent = 80
  // TODO: у Checklist тоже есть drag'n'drop
  return (
    <CardDetailSection
      getCustomTitleBox={getChecklistTitleBox}
      icon={<CheckSquareOutlined className="scale-125" />}
      title={title}
      right
      actions={
        <div className="flex flex-wrap gap-2">
          <CardDetailButton
            onClick={() => {
              setIsExpanded(!isExpanded)
            }}
          >
            {isExpanded
              ? `Показать отмеченные элементы (${checkedCount})`
              : 'Скрывать отмеченные элементы'}
          </CardDetailButton>
          <CardDetailButton onClick={() => {}}>Удалить</CardDetailButton>
        </div>
      }
    >
      <div className="relative mb-2 leading-[10px]">
        <span className="absolute top-[1px] w-8 text-center text-[11px] text-[var(--ds-text-subtle,#5e6c84)]">
          {percent}%
        </span>
        <div className="ml-10 ">
          <Progress
            className="m-0 leading-[10px] [&>.ant-progress-outer>.ant-progress-inner]:rounded-full"
            strokeColor={
              percent === 100
                ? 'var(--ds-background-success-bold,#61bd4f)'
                : 'var(--ds-background-accent-blue-subtle,#5ba4cf)'
            }
            strokeLinecap="square"
            showInfo={false}
            {...{ percent }}
          ></Progress>
        </div>
      </div>
      <div className="mb-2 ml-10 leading-5 text-[var(--ds-text-subtle,#5e6c84)]">
        Отмечены все элементы!
      </div>
      <div
      // TODO: drag'n'drop элементов
      >
        {items.map((item) => (
          <CardDetailChecklistItem key={item.id} {...item} />
        ))}
      </div>
      <div className="ml-10">
        <CardDetailChecklistNewItem />
      </div>
      {/* // TODO: "В этом списке слишком много элементов. Удалите некоторые из них, чтобы добавить новые." - как минимум, можно добавить 100 элементов (дальше не проверял) */}
    </CardDetailSection>
  )
}

const ChecklistListContext = React.createContext(null)

function ChecklistListState({ children }) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  return (
    <ChecklistListContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </ChecklistListContext.Provider>
  )
}

function CardDetailChecklistList() {
  const lists = [
    {
      id: 'checklist-1',
      title: 'Чек-лист1 Чек-лист1 Чек-лист1 Чек-лист1 Чек-лист1 Чек-лист1 Чек-лист1',
      items: [
        {
          id: 'item-1-1',
          text: 'ele ment1 ele ment1 ele ment1 ele ment1 ele ment1 ele ment1 ele ment1 ele ment1 ele ment1 ele ment1 ele ment1 ',
        },
        { id: 'item-1-2', text: 'element2' },
      ],
    },
    {
      id: 'checklist-2',
      title: 'Чек-лист2',
      items: [
        { id: 'item-2-1', text: 'element1' },
        { id: 'item-2-2', text: 'element2' },
      ],
    },
  ]
  return (
    <ChecklistListState>
      {lists.map((list) => (
        <CardDetailChecklist key={list.id} {...list} />
      ))}
    </ChecklistListState>
  )
}

// TODO: выделение-копирование текста должно выполняться с пробелами независимо от отступов HTML-элементов и пропуская "лишние" контролы

const myThumbnail = 'https://avatars.githubusercontent.com/u/1025241?s=32&v=4'

function CommentBoxOptionsButton({ icon, title, onClick }) {
  return (
    <Button
      className={cx(
        'text-[var(--ds-icon,#42526e)]',
        'hover:bg-[var(--ds-background-neutral-hovered,#091e4214)]',
        'active:bg-[var(--ds-background-neutral-pressed,#091e4221)]',
        'min-w-[32px] rounded-[3px] border-0 leading-5 shadow-none',
      )}
      {...{ icon, title, onClick }}
    />
  )
}

function InlineSpacer() {
  return <span className="inline-block min-w-[4px]" />
}

function ActionSpin() {
  return (
    <Button
      className="mr-1 h-5 cursor-default rounded-[3px] border-0 bg-transparent p-0 text-[12px] leading-5 text-[var(--ds-text-subtle,#5e6c84)] shadow-none"
      icon={<LoadingOutlined />}
      size="small"
      onClick={() => {
        // TODO: отмена отправки
      }}
    >
      Отправка…
    </Button>
  )
}

function getActionContent({ record, args, createdByLink }) {
  const fn = actionRecords[record]
  const isLoading = false
  if (record === 'comment') {
    const { isExpanded, setIsExpanded } = React.useContext(CommentBoxContext)
    const [isEdit, setIsEdit] = React.useState(false)
    React.useEffect(() => {
      if (!isExpanded) {
        setIsEdit(false)
      }
    }, [isExpanded])
    return (
      <>
        {' '}
        <InlineSpacer />
        {isLoading || createdByLink}
        {/* // TODO: (изменён) */}
        <div className="my-1 ">
          {isExpanded && isEdit ? (
            <CommentBox
              defaultValue={args.text}
              close={() => {
                setIsEdit(false)
              }}
            />
          ) : (
            <div className="action-comment truncate rounded-[3px] bg-[var(--ds-background-input,#fff)] py-2 px-3 text-[var(--ds-text,#172b4d)]">
              {args.text}
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center pt-0.5 text-[12px] leading-5 text-[var(--ds-text-subtle,#5e6c84)]">
          <Button
            className={cx(
              'm-[-4px] box-content p-[4px]',
              // TODO: так же увеличить кликабельную область для ссылок (по высоте, минимум 24px)
              'bg-transparent',
              'text-[var(--ds-icon-subtle,#6b778c)]',
              'hover:text-[var(--ds-icon-accent-gray,#172b4d)]',
              'h-4 w-4 rounded-[3px] border-0 leading-4 shadow-none',
            )}
            title="Добавить реакцию"
            icon={
              <SmileOutlined
                onClick={() => {
                  // TODO: добавить смайлик для комментария
                }}
              />
            }
          />
          <InlineSpacer />
          {isLoading ? (
            <div className="inline-block select-none [&>:last-child]:ml-1">
              {'• '}
              <ActionSpin />
            </div>
          ) : (
            <>
              <LinkButton
                onClick={() => {
                  setIsExpanded(true)
                  setIsEdit(true)
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
              {/* // TODO: <div>• В этом поле есть несохранённые изменения</div> */}
            </>
          )}
        </div>
      </>
    )
  }
  if (['addAttachment', 'deleteAttachment'].includes(record)) {
    return (
      <>
        {` ${fn()} `}
        <a
          className="text-[var(--ds-link,#172b4d)] underline"
          // для поддержки контекстного меню по правой кнопки мышки
          href={args.url}
          onClick={(event) => {
            event.preventDefault()
          }}
        >
          {getFilename(args.url)}
        </a>{' '}
        <InlineSpacer />
        {isLoading || createdByLink}
        {args.thumbnail && (
          <a target="_blank" href={args.url}>
            <img
              className="action-image-preview mt-2 mb-1 max-h-[500px] max-w-full rounded-[3px]"
              src={args.thumbnail}
            />
          </a>
        )}
        <div>
          {isLoading ? (
            <ActionSpin />
          ) : (
            <>
              <button
                className="select-none text-[12px] leading-5 text-[var(--ds-text-subtle,#5e6c84)] underline hover:text-[var(--ds-text-subtle,#172b4d)]"
                onClick={() => {
                  // TODO: заполнить коммент ссылкой на текущий action
                }}
              >
                Ответить
              </button>
              {/* // TODO: • В этом поле есть несохранённые изменения */}
            </>
          )}
        </div>
      </>
    )
  }
  return (
    <>
      {' '}
      {fn(args)}
      <div>
        {isLoading ? (
          <ActionSpin />
        ) : (
          <>
            {createdByLink}
            {/* // TODO: В этом поле есть несохранённые изменения */}
          </>
        )}
      </div>
    </>
  )
}

// TODO: routing for highligted action

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
        {/* // TODO: надо 32px и без бардюра */}
        <MemberIcon {...member} />
      </div>
      <button
        title={`${member.name.first} ${member.name.last} (${member.login.username})`}
        className="font-bold"
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
            className="whitespace-pre text-[12px] leading-5 text-[var(--ds-text-subtle,#5e6c84)] hover:text-[var(--ds-text-subtle,#172b4d)] hover:underline"
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
  const ref = React.useRef()
  const inputRef = React.useRef()
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
    <div {...{ ref }}>
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
          // TODO: Вы ничего не написали!
          // TODO: Ваш комментарий слишком длинный.
          placeholder={isNewComment ? 'Напишите комментарий…' : null}
          className={cx(
            isFocused
              ? 'hover:bg-[var(--ds-background-input-hovered,#ebecf0)] focus:bg-[var(--ds-background-input,transparent)] focus:transition-none'
              : isShowControls
              ? ''
              : 'hover:bg-[var(--ds-background-input-hovered,#ebecf0)]',
            isFocused ? 'p-0' : 'my-[-8px] mx-[-12px] cursor-pointer py-[8px] px-[12px]',
            'focus-borderless box-content min-h-[20px] overflow-hidden rounded-[3px] leading-5 text-[var(--ds-text,#172b4d)] placeholder:text-[var(--ds-text-subtle,#5e6c84)]',
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
            'absolute bottom-2 left-3 right-2 flex gap-1 transition-[transform,opacity]',
            isFocused ? 'translate-y-0 opacity-100' : 'translate-y-[48px] opacity-0',
          )}
        >
          {/* // TODO: не меняет фокус для input при клике по disabled <input type="submit" disabled value="123"></input> */}
          <CardDetailButton
            disabled={!isShowControls}
            primary
            // colors={
            //   isShowControls
            //     ? 'bg-[var(--ds-background-brand-bold,#0079bf)] text-[var(--ds-text-inverse,#fff)] hover:bg-[var(--ds-background-brand-bold-hovered,#026aa7)] active:bg-[var(--ds-background-brand-bold-pressed,#055a8c)]'
            //     : 'bg-[var(--ds-background-disabled,#091e420a)] text-[var(--ds-text-disabled,#a5adba)]'
            // }
            onClick={() => {
              console.log('2222')
            }}
          >
            Сохранить
          </CardDetailButton>
          {isNewComment || <EditCloseButton onClick={close} />}
          <div className="ml-[-4px] grow" />
          <CommentBoxOptionsButton
            icon={<PaperClipOutlined />}
            title="Добавить вложение…"
            onClick={(event) => {
              console.log('onClick')
            }}
          />
          <CommentBoxOptionsButton icon={<FireOutlined />} title="Упомянуть участника…" />
          <CommentBoxOptionsButton icon={<SmileOutlined />} title="Добавить эмодзи…" />
          <CommentBoxOptionsButton
            icon={<CreditCardOutlined rotate={180} />}
            title="Добавить карточку…"
          />
        </div>
        {/* </Form.Item> */}
        {/* </Form> */}
      </div>
    </div>
  )
}

function CardDetailActions({ actions }) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  // const [form] = Form.useForm()
  // const [value, setValue] = React.useState('')
  return (
    <CardDetailSection
      icon={<FileDoneOutlined className="scale-125" />}
      title="Действия"
      right
      actions={
        <CardDetailButton
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
        {actions.map(
          (action, id) =>
            (isExpanded || action.record === 'comment') && (
              <CardDetailAction key={action.id} {...action} />
            ),
        )}
      </CommentBoxState>
      {/* <CardDetailButton
        onClick={() => {
          // TODO: Показать все действия
        }}
      >
        Показать все действия…
      </CardDetailButton> */}
    </CardDetailSection>
  )
}

function CardDetailSection({ icon, title, actions, right = false, getCustomTitleBox, children }) {
  const getDefaultTitleBox = ({ onClick }) => (
    <div className="flex flex-wrap" {...{ onClick }}>
      <h3 className={cx('board-title', onClick && 'cursor-pointer')}>{title}</h3>
      <div className={cx(right && 'grow', 'inline-block min-w-[8px]')} />
      {actions}
    </div>
  )
  return (
    <WindowModule>
      <div className="relative mb-1 ml-10 py-2">
        <div className="absolute left-[-40px] top-[8px] flex h-8 w-8 justify-center text-base">
          {icon}
        </div>
        {getCustomTitleBox ? getCustomTitleBox(title, getDefaultTitleBox) : getDefaultTitleBox({})}
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
        // для поддержки контекстного меню по правой кнопки мышки
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
              // TODO: телега рисует подложку интереснее, как ambilight
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
    <div className="mr-1 inline-block select-none">
      {'• '}
      <a
        role="button"
        className="text-[var(--ds-link,#5e6c84)] underline hover:text-[var(--ds-link,#172b4d)]"
        {...{ onClick }}
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
      actions={
        <CardDetailButton
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

function WindowSidebarButton({ children, ...rest }) {
  return (
    <CardDetailButton className="mb-2 w-full" truncated {...rest}>
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
        <hr className="horizontal-divider mb-2" />
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
            danger
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
  icon,
  shape = 'default',
  children,
  onClick,
  disabled,
  truncated,
  primary,
  danger,
  asLink,
  ghost,
}) {
  return (
    <Button
      className={cx(
        truncated
          ? 'flex items-center overflow-hidden [&>:last-child]:truncate'
          : 'whitespace-normal',
        children && 'px-3 text-start', // : 'w-8 px-0',
        // indent && 'mr-1 mb-1',
        shape === 'default' && 'rounded-[3px]',
        'h-auto min-h-[32px] border-0 leading-5 shadow-none',
        (disabled
          ? [
              'text-[var(--ds-text-disabled,#a5adba)]',
              'bg-[var(--ds-background-disabled,#091e420a)]',
            ]
          : danger
          ? [
              'text-[var(--ds-text-inverse,#fff)]',
              'bg-[var(--ds-background-danger-bold,#b04632)]',
              'hover:bg-[var(--ds-background-danger-bold-hovered,#933b27)]',
              'active:bg-[var(--ds-background-danger-bold-pressed,#6e2f1a)]',
            ]
          : primary
          ? [
              'text-[var(--ds-text-inverse,#fff)]',
              'bg-[var(--ds-background-brand-bold,#0079bf)]',
              'hover:bg-[var(--ds-background-brand-bold-hovered,#026aa7)]',
              'active:bg-[var(--ds-background-brand-bold-pressed,#055a8c)]',
            ]
          : asLink
          ? [
              'text-[var(--ds-text-subtle,#5e6c84)]',
              'bg-transparent',
              'hover:text-[var(--ds-text,#172b4d)]',
              'hover:bg-[var(--ds-background-neutral-hovered,#091e4214)]',
              'active:bg-[var(--ds-background-neutral-pressed,#091e4221)]',
            ]
          : [
              'text-[var(--ds-text,inherit)]',
              ghost ? 'bg-transparent' : 'bg-[var(--ds-background-neutral,#091e420a)]',
              'hover:bg-[var(--ds-background-neutral-hovered,#091e4214)]',
              'active:text-[var(--ds-text,#0079bf)]',
              'active:bg-[var(--ds-background-neutral-pressed,#e4f0f6)]',
            ]
        ).join(' '),
        asLink && children && 'underline hover:no-underline',
        asLink &&
          icon &&
          '[&>.anticon]:text-[var(--ds-icon,#42526e)] [&:hover>.anticon]:text-[var(--ds-icon,#172b4d)]',
        asLink && children && icon && '[&>:last-child]:ml-1',
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
      {...{ title }}
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
  const [isArchive, setIsArchive] = React.useState(true) // TODO: архивация карточки
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
          className="mt-2 min-h-[32px] resize-none overflow-hidden rounded-[3px] bg-transparent px-2 py-1 text-[20px] font-semibold leading-6 text-[var(--ds-text,#172b4d)] focus:bg-[var(--ds-background-input,#fff)]"
          bordered={false}
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
        <CardDetailChecklistList />
        <CardDetailActions {...{ actions }} />
      </div>
      <WindowSidebar {...{ isArchive, setIsArchive }} />
      {isDrag && <Dropzone />}
    </Modal>
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

function BoardPage({ issues, members, boardId, favorites: defaultFavorites, urlName }: IProps) {
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
  // const [isMoreButton, setIsMoreButton] = React.useState(true)
  const [isMenu, setIsMenu] = React.useState(false)
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
        <Header {...{ favorites, handleDeleteFavorites }} />
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
                    <BoardHeader
                      {...{ members, boardId, isMenu, setIsMenu, favorites, handleChangeFavorites }}
                    />
                    <div id="board-warnings"></div>
                    <div
                      id="board-canvas"
                      className="grow"
                      style={{
                        background:
                          'linear-gradient(to bottom,var(--board-header-background-color),#0000 80px,#0000)',
                      }}
                    >
                      <Board {...{ issues }} />
                    </div>
                  </div>
                  <BoardMenu isMenu={isMenu} setIsMenu={setIsMenu} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {breadcrumbs[0] === 'c' && <CardDetailWindow issue={issues[0]} />}
    </div>
  )
}

export default BoardPage
