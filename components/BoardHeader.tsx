import React from 'react'
import {
  StarOutlined,
  StarFilled,
  LockTwoTone,
  LockOutlined,
  TeamOutlined,
  GlobalOutlined,
  CheckOutlined,
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  DownOutlined,
  FilterOutlined,
  CloseOutlined,
  UserAddOutlined,
  MoreOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { Modal, Avatar, Input, Form, Checkbox, Space, Button } from 'antd'
import cx from 'classnames'
import HeaderButton from '.../components/HeaderButton'
import CustomDropdown from '.../components/CustomDropdown'
import MemberIcon from '.../components/MemberIcon'

function MoreButton({ onClick }) {
  return (
    <HeaderButton className="float-left" icon={<MoreOutlined />} {...{ onClick }}></HeaderButton>
  )
}

function ShareButton() {
  const [isOpen, setIsOpen] = React.useState(false)
  const close = () => {
    setIsOpen(false)
  }
  return (
    <>
      <HeaderButton
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
      </HeaderButton>
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

function MembersButton({ members }) {
  const maxCount = 5
  // TODO: нет фокуса для элементов
  return (
    <Avatar.Group
      className={cx(
        'z-0 float-left mb-1 mr-1 inline-flex h-8 items-center px-1',
        members.length > maxCount &&
          'select-none [&>:last-child]:bg-[var(--dynamic-button)] [&>:last-child]:text-[var(--dynamic-text)] hover:[&>:last-child]:bg-[var(--dynamic-button-hovered)] active:[&>:last-child]:bg-[var(--dynamic-button-pressed)]',
      )}
      size="small"
      maxPopoverPlacement="bottomLeft"
      maxPopoverTrigger="click"
      {...{ maxCount }}
    >
      {members.map((member, index, a) => (
        <MemberIcon key={member.login.uuid} {...member} zIndex={a.length - index} />
      ))}
    </Avatar.Group>
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
          layout="vertical"
          // initialValues={{ requiredMarkValue: requiredMark }}
          // onValuesChange={onRequiredTypeChange}
          // requiredMark={requiredMark}
          {...{ form }}
        >
          <Form.Item
            label="Ключевое слово"
            help="Поиск карточек, участников, меток и т. д."
            // TODO: label var(--ds-text-subtle, #5e6c84)
          >
            <Input
              placeholder="Введите ключевое слово…"
              className="mt-[-2px] rounded-[3px] bg-[var(--ds-background-input,#fafbfc)] text-[var(--ds-text,#172b4d)] placeholder:text-[var(--ds-text-subtle,#6b778c)] hover:bg-[var(--ds-background-input-hovered,#ebecf0)] focus:bg-[var(--ds-background-input,#ffffff)]"
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
        <HeaderButton
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
        </HeaderButton>
        {isFilter && (
          <HeaderButton
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
      <CustomDropdown.Item>
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
      </CustomDropdown.Item>
    ),
  }))
  const value = map[selected]
  return (
    <CustomDropdown
      header="Изменение видимости"
      onClick={(event) => {
        setSelected(event.key)
      }}
      {...{ items }}
    >
      <HeaderButton
        aria-label="Изменить уровень доступа к доске"
        title={value.title}
        onClick={(event) => {
          event.preventDefault()
        }}
        icon={value.buttonIcon}
        className="float-left"
      >
        {value.buttonText || value.itemText}
      </HeaderButton>
    </CustomDropdown>
  )
}

function HeaderDivider() {
  return (
    <div className="float-left mb-3 ml-1 mr-2 mt-2 inline-block h-4 border-l border-[var(--dynamic-text-transparent)]" />
  )
}

// TODO: Using <Button> results in "findDOMNode is deprecated in StrictMode" warning
// https://github.com/ant-design/ant-design/issues/22493

function FavoriteButton({ boardId, favorites, onChange }) {
  const switchState = favorites.findIndex((item) => item.boardId === boardId) > -1
  return (
    <div id="favorite-button-tab-wrapper" tabIndex="-1">
      <HeaderButton
        className={cx(
          'float-left',
          '[&:focus>.anticon]:scale-125 [&:hover>.anticon]:scale-125',
          switchState && '[&>.anticon]:text-[#f2d600]',
        )}
        aria-label="Добавить или удалить доску из избранного"
        title="Нажмите, чтобы добавить или удалить доску из избранного. Избранные доски отображаются вверху вашего списка досок."
        icon={switchState ? <StarFilled /> : <StarOutlined />}
        onClick={() => {
          onChange(!switchState)
        }}
      />
    </div>
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
        'relative float-left mb-1 mr-1 h-[32px] rounded-[3px] text-[18px] font-bold leading-8',
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
          'absolute bottom-0 left-0 right-0 top-0',
          'h-[32px] rounded-[3px] px-3 py-0 text-[18px] font-bold leading-5',
          'bg-[var(--ds-background-input,#fff)] text-[var(--ds-text,#172b4d)]',
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
        onKeyDown={(event) => {
          event.stopPropagation()
          if (event.key === 'Escape') {
            document.getElementById('favorite-button-tab-wrapper').focus()
          }
        }}
      />
    </div>
  )
}

function BoardHeader({
  members,
  boardId,
  hasMenu,
  toggleMenu,
  right,
  favorites,
  handleChangeFavorites,
}) {
  return (
    <div
      className={cx(
        'bg-[var(--board-header-background-color)]',
        hasMenu && 'pr-[var(--menu-width)]',
      )}
    >
      <div className="flex flex-wrap pb-1 pl-2.5 pr-1 pt-2">
        <BoardNameButton
          defaultValue="Minsk4"
          onEndEdit={(value) => {
            console.log(value)
          }}
        />
        <FavoriteButton onChange={handleChangeFavorites} {...{ favorites, boardId }} />
        <HeaderDivider />
        <PermisionLevelButton />
        <div className="inline-block min-w-[8px] grow" />
        <div className="flex flex-wrap">
          <FilterButton />
          <HeaderDivider />
          <MembersButton {...{ members }} />
          <ShareButton />
          {hasMenu || (
            <>
              <HeaderDivider />
              <MoreButton
                onClick={() => {
                  toggleMenu()
                }}
              />
            </>
          )}
        </div>
      </div>
      <div id="board-warnings"></div>
    </div>
  )
}

export default BoardHeader
