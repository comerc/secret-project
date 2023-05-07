import React from 'react'
import {
  UserOutlined,
  CheckOutlined,
  PlusOutlined,
  DownOutlined,
  ClockCircleOutlined,
  UserAddOutlined,
  EllipsisOutlined,
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
import { Tooltip, Avatar, Button, Input, Checkbox, Modal, Space, Progress } from 'antd'
// TODO: import Image from 'next/image'
import MemberIcon from '.../components/MemberIcon'
import CustomButton from '.../components/CustomButton'
import EditCloseButton from '.../components/EditCloseButton'
import { useOnClickOutside, useIsFirstRender } from 'usehooks-ts'
import cx from 'classnames'
import dayjs from 'dayjs'
import ColorThief from 'colorthief'
import { ClickScrollPlugin } from 'overlayscrollbars'
import generateSentence from '.../utils/generateSentence'
import labelColors from '.../utils/labelColors'
import convertRGBToHSL from '.../utils/convertRGBToHSL'
import isHTMLControl from '.../utils/isHTMLControl'
import getDueDateMode from '.../utils/getDueDateMode'
import actionRecords from '.../utils/actionRecords'
import getLiteralDate from '.../utils/getLiteralDate'

// TODO: почикать префиксы *

function ChecklistNewItem() {
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
      <CustomButton
        onClick={() => {
          setIsExpanded(false)
          setTimeout(() => {
            setIsExpanded(true)
            setIsEdit(true)
          })
        }}
      >
        Добавить элемент
      </CustomButton>
    </div>
  )
}

function ChecklistItemButton({ icon, circle, transparent, onClick }) {
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
        cursor: 'all', // TODO: см. ColumnHeader - не надо, т.к. дублирует .select() в .onFocus() и не отрабатывает по [TAB]
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
    'mouseup', // TODO: надо отслеживать target от mousedown, т.к. можно нажать-переместить-отпустить мышку (в оригинале такой же косяк)
  )
  return (
    <div {...{ className }}>
      <div ref={ref}>
        <Input.TextArea
          className={cx(
            isNew
              ? 'input-border-focused min-h-[32px] resize-y bg-[var(--ds-background-input,#fff)] placeholder:text-[var(--ds-text-subtle,#5e6c84)]'
              : 'input-border bg-[var(--ds-background-input,#091e420a)]',
            isTitle ? 'text-[16px] font-semibold' : 'text-[14px]',
            'focus-borderless overflow-hidden rounded-[3px] px-3 py-2 leading-5 text-[var(--ds-text,#172b4d)]',
          )}
          placeholder={isNew && 'Добавить элемент'}
          bordered={false}
          ref={inputRef}
          autoSize={{ minRows: 2 }}
          onKeyDown={(event) => {
            event.stopPropagation()
          }}
          {...{ value, onChange }}
        />
      </div>
      <div className="mt-2 flex gap-1">
        <CustomButton
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
        </CustomButton>
        {/* // TODO: сбрасывать defaultValue по кнопке Отмена/Close */}
        {isNew ? (
          <CustomButton ghost onClick={close}>
            Отмена
          </CustomButton>
        ) : (
          <EditCloseButton onClick={close} />
        )}
        {isTitle || (
          <>
            <div className="ml-[-4px] grow" />
            <CustomButton
              truncated
              asLink
              icon={<UserAddOutlined />}
              onClick={() => {
                console.log('3333')
              }}
            >
              Назначить
            </CustomButton>
            {/* // HACK: из-за truncated, требуется отдельный div */}
            <div className="min-w-[96px]">
              <CustomButton
                truncated
                asLink
                icon={<ClockCircleOutlined />}
                onClick={() => {
                  console.log('4444')
                }}
              >
                Срок
              </CustomButton>
            </div>
            <CustomButton
              className="min-w-[32px]"
              asLink
              icon={<FireOutlined />}
              onClick={() => {
                console.log('5555')
              }}
            />
            <CustomButton
              className="min-w-[32px]"
              asLink
              icon={<SmileOutlined />}
              onClick={() => {
                console.log('6666')
              }}
            />
            {isNew || (
              <CustomButton
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

function ChecklistItem({ text }) {
  const complete = true // TODO: complete
  const { setIsExpanded } = React.useContext(ChecklistListContext)
  const [isEdit, setIsEdit] = React.useState(false)
  const [value, setValue] = React.useState(text)
  return (
    //transition-[background-color] duration-300
    <div className="relative cursor-pointer rounded-[3px] pl-10 hover:bg-[var(--ds-background-neutral,#091e420a)] [&:hover>.checklist-item-text-and-controls>.checklist-item-controls]:z-0">
      <Checkbox className="absolute left-[4px] top-[8px] m-[-6px] box-content h-5 w-5 justify-center p-[6px]" />
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
            <ChecklistItemButton
              icon={<ClockCircleOutlined />}
              onClick={(event) => {
                event.stopPropagation()
              }}
            />
            <ChecklistItemButton
              icon={<UserAddOutlined />}
              circle
              onClick={(event) => {
                event.stopPropagation()
              }}
            />
            <ChecklistItemButton
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

function Checklist({ title, items }) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const checkedCount = 1
  const percent = 80
  // TODO: у Checklist тоже есть drag'n'drop
  return (
    <Section
      getCustomTitleBox={getChecklistTitleBox}
      icon={<CheckSquareOutlined className="scale-125" />}
      title={title}
      right
      actions={
        <div className="flex flex-wrap gap-2">
          <CustomButton
            onClick={() => {
              setIsExpanded(!isExpanded)
            }}
          >
            {isExpanded
              ? `Показать отмеченные элементы (${checkedCount})`
              : 'Скрывать отмеченные элементы'}
          </CustomButton>
          <CustomButton onClick={() => {}}>Удалить</CustomButton>
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
          <ChecklistItem key={item.id} {...item} />
        ))}
      </div>
      <div className="ml-10">
        <ChecklistNewItem />
      </div>
      {/* // TODO: "В этом списке слишком много элементов. Удалите некоторые из них, чтобы добавить новые." - как минимум, можно добавить 100 элементов (дальше не проверял) */}
    </Section>
  )
}

const ChecklistListContext = React.createContext({})

function ChecklistListState({ children }) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  return (
    <ChecklistListContext.Provider value={{ isExpanded, setIsExpanded }}>
      {children}
    </ChecklistListContext.Provider>
  )
}

function ChecklistList() {
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
        <Checklist key={list.id} {...list} />
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
            <div className="action-comment truncate rounded-[3px] bg-[var(--ds-background-input,#fff)] px-3 py-2 text-[var(--ds-text,#172b4d)]">
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
              className="action-image-preview mb-1 mt-2 max-h-[500px] max-w-full rounded-[3px]"
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

function Action({ id, member, record, args, createdBy, highligted }) {
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
      <div className="absolute left-2 top-2">
        {/* // TODO: надо 32px и без бардюра */}
        <MemberIcon {...member} />
      </div>
      <button
        title={`${member.name.first} ${member.name.last} (${member.login.username})`}
        className="font-bold"
        onClick={(event) => {
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
            onClick={(event) => {
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

const CommentBoxContext = React.createContext({})

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
    useOnClickOutside(
      ref,
      (event) => {
        console.log('useOnClickOutside')
        if (isShowControls || isHTMLControl(event.target, ref.current)) {
          return
        }
        setIsFocused(false)
      },
      'mouseup', // TODO: надо отслеживать target от mousedown, т.к. можно нажать-переместить-отпустить мышку (в оригинале такой же косяк)
    )
  } else {
    React.useEffect(() => {
      inputRef.current.focus({
        preventScroll: true,
        cursor: 'all', // TODO: см. ColumnHeader - не надо, т.к. дублирует .select() в .onFocus() и не отрабатывает по [TAB]
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
        // TODO: заменить на onMouseDown, если useOnClickOutside будет отслеживать 'mousedown'
        onMouseUp={(event) => {
          if (!isNewComment) {
            event.stopPropagation() // для отключения useOnClickOutside
          }
        }}
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
            isFocused ? 'p-0' : 'mx-[-12px] my-[-8px] cursor-pointer px-[12px] py-[8px]',
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
          onKeyDown={(event) => {
            event.stopPropagation()
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
          <CustomButton
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
          </CustomButton>
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

function Actions({ actions }) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  // const [form] = Form.useForm()
  // const [value, setValue] = React.useState('')
  return (
    <Section
      icon={<FileDoneOutlined className="scale-125" />}
      title="Действия"
      right
      actions={
        <CustomButton
          onClick={() => {
            setIsExpanded(!isExpanded)
          }}
        >
          {isExpanded ? 'Скрыть подробности' : 'Показать подробности'}
        </CustomButton>
      }
    >
      <CommentBoxState>
        <div className="relative mb-3 ml-10 pr-0.5">
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
            (isExpanded || action.record === 'comment') && <Action key={action.id} {...action} />,
        )}
      </CommentBoxState>
      {/* <CustomButton
        onClick={() => {
          // TODO: Показать все действия
        }}
      >
        Показать все действия…
      </CustomButton> */}
    </Section>
  )
}

function Section({ icon, title, actions, right = false, getCustomTitleBox, children }) {
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

function Attachment({ id, url, title, createdBy, thumbnail }) {
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
              // TODO: [Quick Ambilight-Effect with CSS](https://codepen.io/saschatoussaine/pen/yaeWmK)
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

function Attachments() {
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
    <Section icon={<PaperClipOutlined className="scale-125" />} title="Вложения">
      <div className="ml-10">
        {(isExpanded ? attachments : attachments.slice(0, shortCount)).map((attachment) => (
          <Attachment key={attachment.id} {...attachment} />
        ))}
        <Space direction="vertical">
          <CustomButton
            // className="mb-1"
            onClick={() => {
              setIsExpanded(!isExpanded)
            }}
          >
            {isExpanded
              ? 'Показать меньше вложений'
              : `Посмотреть все вложения (скрыто ${attachments.length - shortCount})`}
          </CustomButton>
          <CustomButton>Добавить вложение</CustomButton>
        </Space>
      </div>
    </Section>
  )
}

function Dropzone() {
  return (
    // TODO: не больше 50 members из-за z-50 - как создать "локальный контекст наложения z-index"?
    <div className="absolute bottom-0 left-0 right-0 top-0 z-50 flex flex-col justify-center bg-[var(--ds-surface-overlay,#ffffffb3)] text-center text-xl font-bold">
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

function Description() {
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
    <Section
      icon={<ContainerOutlined className="scale-125" />}
      title="Описание"
      actions={
        <CustomButton
          onClick={() => {
            setIsMore(false)
            setIsEdit(true)
          }}
        >
          Изменить
        </CustomButton>
      }
    >
      <div className="relative ml-10">
        {isMore && (
          <div
            role="button"
            onClick={() => {
              setIsMore(false)
            }}
            className="description-content-fade-button absolute left-0 right-0 top-0 h-[432px] pt-[400px] text-[var(--ds-text-subtle,#5e6c84)] hover:text-[var(--ds-text,#172b4d)]"
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
            <CustomButton
              className="h-14 py-2"
              onClick={() => {
                setIsEdit(true)
              }}
            >
              <div className="h-10">Добавить более подробное описание…</div>
            </CustomButton>
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
    </Section>
  )
}

function WindowSidebarButton({ children, ...rest }) {
  return (
    <CustomButton truncated {...rest}>
      {children}
    </CustomButton>
  )
}

function WindowModule({ className, children }) {
  return <div className={cx('relative clear-both mb-6', className)}>{children}</div>
}

function WindowSidebar({ isArchive, setIsArchive }) {
  return (
    <div
      className="float-right overflow-hidden pl-2 pr-4"
      style={{
        width: `calc(100% - ${mainWidth}px)`,
      }}
    >
      <WindowModule
      // TODO: className="u-clearfix"
      >
        <ItemTitle>Добавить на карточку</ItemTitle>
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
        <ItemTitle>Действия</ItemTitle>
        <WindowSidebarButton icon={<ArrowRightOutlined />}>Перемещение</WindowSidebarButton>
        <WindowSidebarButton icon={<CopyOutlined />}>Копирование</WindowSidebarButton>
        {/* <WindowSidebarButton icon={}>// TODO: Создать шаблон</WindowSidebarButton> */}
        {/* <WindowSidebarButton icon={<LikeOutlined />}>// TODO: Голосовать</WindowSidebarButton> */}
        <hr className="horizontal-divider my-2" />
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

// TODO: https://react-component.github.io/calendar/examples/antd-range-calendar.html
function StartDateBadge({ start }) {
  return (
    <CustomButton
      onClick={() => {
        // console.log()
      }}
    >
      {getLiteralDate(start)}
      <DownOutlined />
    </CustomButton>
  )
}

function DueDateBadge({ start, deadline, mode = 'danger' }) {
  const [checked, setChecked] = React.useState(false)
  const currentMode = getDueDateMode({
    deadline,
    mode: checked ? 'success' : mode,
    for: true,
  })
  return (
    <div title={currentMode.title}>
      <Checkbox
        className="mr-1"
        onClick={() => {
          setChecked(!checked)
        }}
      />
      <CustomButton onClick={() => {}}>
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
      </CustomButton>
    </div>
  )
}

function Notifications({ notifications }) {
  const [isChecked, setIsChecked] = React.useState(false)
  const title = isChecked
    ? 'Вы подписаны на уведомления об обновлениях этой карточки. Нажмите, чтобы отменить подписку.'
    : 'Подпишитесь на уведомления об обновлениях этой карточки'
  // TODO: отказался от Tooltip
  return (
    <CustomButton
      className={cx('transition-none', isChecked && 'relative pr-10')}
      icon={<EyeOutlined />}
      onClick={() => {
        setIsChecked(!isChecked)
      }}
      // aria-label={title} // TODO: опасная операция - могут быть невалидные символы
    >
      {isChecked ? (
        <>
          {'Вы подписаны'}
          <span className="absolute right-1 top-1 flex h-6 w-7 justify-center rounded-[3px] bg-[var(--ds-icon-subtle,#42526e)] text-[var(--ds-icon-inverse,#fff)]">
            <CheckOutlined />
          </span>
        </>
      ) : (
        'Подписаться'
      )}
    </CustomButton>
  )
}

function Members({ members }) {
  return (
    <Avatar.Group className="block">
      {members.map((member, index, a) => (
        <MemberIcon key={member.login.uuid} {...member} zIndex={a.length - index} />
      ))}
      <CustomButton icon={<PlusOutlined />} shape="circle" />
    </Avatar.Group>
  )
}

function ItemTitle({ children }) {
  return (
    <h3 className="mb-1 mr-2 truncate text-[12px] font-semibold leading-5 text-[var(--ds-text-subtle,#5e6c84)]">
      {children}
    </h3>
  )
}

function Item({ title, children }) {
  return (
    <div className="mb-4 mr-4 inline-block">
      <ItemTitle>{title}</ItemTitle>
      {children}
    </div>
  )
}

function Label({ id, colorId, name }) {
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
        // aria-label={title} // TODO: опасная операция - могут быть невалидные символы
        // onClick={(event) => {}}
      >
        <>
          <div className="absolute bottom-2 left-2 top-2 h-4 w-4 rounded-[50%] bg-[var(--foreground-color)]" />
          {name}
        </>
      </button>
    </Tooltip>
  )
}

function Labels({ labels }) {
  return (
    <div className="flex flex-wrap gap-1">
      {labels.map((label) => (
        <Label key={label.id} {...label} />
      ))}
      <CustomButton icon={<PlusOutlined />} />
    </div>
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
          <div className="absolute left-2 top-3 flex h-8 w-8 justify-center">
            <DatabaseOutlined className="scale-125" />
          </div>
          <span className="text-[16px] leading-8">Архивная карточка</span>
        </div>
      )}
      <div className="relative px-12 pb-2 pt-3">
        <div className="absolute left-4 top-5 flex h-8 w-8 justify-center">
          <CreditCardOutlined className="scale-125" rotate={180} />
        </div>
        <Input.TextArea
          className="mt-2 min-h-[32px] resize-none overflow-hidden rounded-[3px] bg-transparent px-2 py-1 text-[20px] font-semibold leading-6 text-[var(--ds-text,#172b4d)] focus:bg-[var(--ds-background-input,#fff)]"
          bordered={false}
          // ref={inputRef}
          autoSize
          // aria-label={title} // TODO: опасная операция - могут быть невалидные символы
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
          onKeyDown={(event) => {
            event.stopPropagation()
          }}
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
        className="relative float-left pb-2 pl-4 pr-2"
        style={{
          width: mainWidth,
        }}
      >
        <div className="ml-10 mt-2">
          {/* <Item title="Список"> // TODO: реализовать кнопку "Список" </Item> */}
          <Item title="Участники">
            <Members {...{ members }} />
          </Item>
          <Item title="Метки">
            <Labels {...{ labels }} />
          </Item>
          <Item title="Уведомления">
            <Notifications {...{ notifications }} />
          </Item>
          {deadline ? (
            <Item title={start ? 'Даты' : 'Срок'}>
              <DueDateBadge {...{ start, deadline }} />
            </Item>
          ) : (
            <Item title="Начало">
              <StartDateBadge {...{ start }} />
            </Item>
          )}
          {/* <Item title="Голоса"> // TODO: непонятно </Item> */}
          {/* <Item title="Последнее обновление"> // TODO: непонятно </Item> */}
        </div>
        <Description />
        {/* // TODO: Местоположение */}
        {/* // TODO: Поля пользователя */}
        {/* // TODO: Вложения системы         */}
        <Attachments />
        <ChecklistList />
        <Actions {...{ actions }} />
      </div>
      <WindowSidebar {...{ isArchive, setIsArchive }} />
      {isDrag && <Dropzone />}
    </Modal>
  )
}

export default CardDetailWindow
