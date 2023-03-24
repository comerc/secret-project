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

export default getDueDateMode
