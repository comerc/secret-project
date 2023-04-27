import React from 'react'
import { CloseOutlined, BarsOutlined, EllipsisOutlined, ProjectOutlined } from '@ant-design/icons'
import {
  Drawer,
  Button,
  // TODO: renderCloseIcon,
} from 'antd'
import { MENU_WIDTH } from '.../constants'

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

function BoardMenu({ hasMenu, toggleMenu }) {
  return (
    <Drawer
      className="relative bg-[var(--ds-surface-overlay,#f4f5f7)]"
      bodyStyle={{
        padding: '0 12px',
      }}
      placement="right"
      open={hasMenu}
      // mask={false}
      // getContainer={false} // если отключить, то надо обернуть в <div className="fixed bottom-0 right-0 top-[44px] z-10"></div>
      width={MENU_WIDTH}
      closable={false}
      onClose={toggleMenu}
    >
      <div tabIndex="-1" className="flex h-12 items-center justify-center px-9">
        <h3 className="board-title">Меню</h3>
      </div>
      <button
        className="absolute right-0 top-0 m-1 flex h-10 w-10 items-center justify-center text-[var(--ds-icon-subtle,#6b778c)]  hover:text-[var(--ds-icon,#172b4d)]"
        onClick={(event) => {
          event.preventDefault()
          toggleMenu()
        }}
      >
        <CloseOutlined className="scale-125" />
      </button>
      <hr className="horizontal-divider mb-2" />
      <MenuButton icon={<ProjectOutlined />} subtitle="Добавьте описание для доски">
        О доске
      </MenuButton>
      <MenuButton>Сменить фон</MenuButton>
      <MenuButton icon={<EllipsisOutlined />}>Ещё</MenuButton>
      <hr className="horizontal-divider my-2" />
      <MenuButton icon={<BarsOutlined />}>Действия</MenuButton>
    </Drawer>
  )
}

export default BoardMenu
