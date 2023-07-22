const labelColors = [
  {
    id: '1-1',
    name: 'светло-зелёный',
    // value: 'green_light',
    style: {
      '--background-color': 'var(--ds-background-accent-green-subtlest, #EEF6EC)',
      '--foreground-color': 'var(--ds-background-accent-green-subtler, #B7DDB0)',
    },
  },
  {
    id: '1-2',
    name: 'зелёный',
    // value: 'green',
    style: {
      '--background-color': 'var(--ds-background-accent-green-subtler, #D6ECD2)',
      '--foreground-color': 'var(--ds-background-accent-green-subtle, #7BC86C)',
    },
  },
  {
    id: '1-3',
    name: 'тёмно-зелёный',
    // value: 'green_dark',
    style: {
      '--background-color': 'var(--ds-background-accent-green-subtle, #B7DDB0)',
      '--foreground-color': 'var(--ds-background-accent-green-bolder, #5AAC44)',
    },
  },
  {
    id: '2-1',
    name: 'светло-жёлтый',
    // value: 'yellow_light',
    style: {
      '--background-color': 'var(--ds-background-accent-yellow-subtlest, #FDFAE5)',
      '--foreground-color': 'var(--ds-background-accent-yellow-subtler, #F5EA92)',
    },
  },
  {
    id: '2-2',
    name: 'жёлтый',
    // value: 'yellow',
    style: {
      '--background-color': 'var(--ds-background-accent-yellow-subtler, #FAF3C0)',
      '--foreground-color': 'var(--ds-background-accent-yellow-subtle, #F5DD29)',
    },
  },
  {
    id: '2-3',
    name: 'тёмно-жёлтый',
    // value: 'yellow_dark',
    style: {
      '--background-color': 'var(--ds-background-accent-yellow-subtle, #F5EA92)',
      '--foreground-color': 'var(--ds-background-accent-yellow-bolder, #E6C60D)',
    },
  },

  {
    id: '3-1',
    name: 'светло-оранжевый',
    // value: 'orange_light',
    style: {
      '--background-color': 'var(--ds-background-accent-orange-subtlest, #FDF4E7)',
      '--foreground-color': 'var(--ds-background-accent-orange-subtler, #FAD29C)',
    },
  },
  {
    id: '3-2',
    name: 'оранжевый',
    // value: 'orange',
    style: {
      '  --background-color': 'var(--ds-background-accent-orange-subtler, #FCE6C6)',
      '  --foreground-color': 'var(--ds-background-accent-orange-subtle, #FFAF3F)',
    },
  },
  {
    id: '3-3',
    name: 'тёмно-оранжевый',
    // value: 'orange_dark',
    style: {
      '--background-color': 'var(--ds-background-accent-orange-subtle, #FAD29C)',
      '--foreground-color': 'var(--ds-background-accent-orange-bolder, #E79217)',
    },
  },
  {
    id: '4-1',
    name: 'светло-красный',
    // value: 'red_light',
    style: {
      '--background-color': 'var(--ds-background-accent-red-subtlest, #FBEDEB)',
      '--foreground-color': 'var(--ds-background-accent-red-subtler, #EFB3AB)',
    },
  },
  {
    id: '4-2',
    name: 'красный',
    // value: 'red',
    style: {
      '--background-color': 'var(--ds-background-accent-red-subtler, #F5D3CE)',
      '--foreground-color': 'var(--ds-background-accent-red-subtle, #EF7564)',
    },
  },
  {
    id: '4-3',
    name: 'тёмно-красный',
    // value: 'red_dark',
    style: {
      '--background-color': 'var(--ds-background-accent-red-subtle, #EFB3AB)',
      '--foreground-color': 'var(--ds-background-accent-red-bolder, #CF513D)',
    },
  },
  {
    id: '5-1',
    name: 'светло-фиолетовый',
    // value: 'purple_light',
    style: {
      '--background-color': 'var(--ds-background-accent-purple-subtlest, #F7F0FA)',
      '--foreground-color': 'var(--ds-background-accent-purple-subtler, #DFC0EB)',
    },
  },
  {
    id: '5-2',
    name: 'фиолетовый',
    // value: 'purple',
    style: {
      '--background-color': 'var(--ds-background-accent-purple-subtler, #EDDBF4)',
      '--foreground-color': 'var(--ds-background-accent-purple-subtle, #CD8DE5)',
    },
  },
  {
    id: '5-3',
    name: 'тёмно-фиолетовый',
    // value: 'purple_dark',
    style: {
      '--background-color': 'var(--ds-background-accent-purple-subtle, #DFC0EB)',
      '--foreground-color': 'var(--ds-background-accent-purple-bolder, #A86CC1)',
    },
  },
  {
    id: '1-4',
    name: 'светло-синий',
    // value: 'blue_light',
    style: {
      '--background-color': 'var(--ds-background-accent-blue-subtlest, #E4F0F6)',
      '--foreground-color': 'var(--ds-background-accent-blue-subtler, #8BBDD9)',
    },
  },
  {
    id: '1-5',
    name: 'синий',
    // value: 'blue',
    style: {
      '--background-color': 'var(--ds-background-accent-blue-subtler, #BCD9EA)',
      '--foreground-color': 'var(--ds-background-accent-blue-subtle, #5BA4CF)',
    },
  },
  {
    id: '1-6',
    name: 'тёмно-синий',
    // value: 'blue_dark',
    style: {
      '--background-color': 'var(--ds-background-accent-blue-subtle, #8BBDD9)',
      '--foreground-color': 'var(--ds-background-accent-blue-bolder, #026AA7)',
    },
  },
  {
    id: '2-4',
    name: 'светло-небесный',
    // value: 'sky_light',
    style: {
      '--background-color': 'var(--ds-background-accent-teal-subtlest, #E4F7FA)',
      '--foreground-color': 'var(--ds-background-accent-teal-subtler, #8FDFEB)',
    },
  },
  {
    id: '2-5',
    name: 'небесный',
    // value: 'sky',
    style: {
      '--background-color': 'var(--ds-background-accent-teal-subtler, #BDECF3)',
      '--foreground-color': 'var(--ds-background-accent-teal-subtle, #29CCE5)',
    },
  },
  {
    id: '2-6',
    name: 'тёмно-небесный',
    // value: 'sky_dark',
    style: {
      '--background-color': 'var(--ds-background-accent-teal-subtle, #8FDFEB)',
      '--foreground-color': 'var(--ds-background-accent-teal-bolder, #00AECC)',
    },
  },
  {
    id: '3-4',
    name: 'светло-лаймовый',
    // value: 'lime_light',
    style: {
      '--background-color': 'var(--tr-background-accent-lime-subtlest, #ECFBF3)',
      '--foreground-color': 'var(--tr-background-accent-lime-subtler, #B3F1D0)',
    },
  },
  {
    id: '3-5',
    name: 'лаймовый',
    // value: 'lime',
    style: {
      '--background-color': 'var(--tr-background-accent-lime-subtler, #D3F6E4)',
      '--foreground-color': 'var(--tr-background-accent-lime-subtle, #6DECA9)',
    },
  },
  {
    id: '3-6',
    name: 'тёмно-лаймовый',
    // value: 'lime_dark',
    style: {
      '--background-color': 'var(--tr-background-accent-lime-subtle, #B3F1D0)',
      '--foreground-color': 'var(--tr-background-accent-lime-bolder, #4ED583)',
    },
  },
  {
    id: '4-4',
    name: 'светло-розовый',
    // value: 'pink_light',
    style: {
      '--background-color': 'var(--ds-background-accent-magenta-subtlest, #FEF1F9)',
      '--foreground-color': 'var(--ds-background-accent-magenta-subtler, #F9C2E4)',
    },
  },
  {
    id: '4-5',
    name: 'розовый',
    // value: 'pink',
    style: {
      '--background-color': 'var(--ds-background-accent-magenta-subtler, #FCDCEF)',
      '--foreground-color': 'var(--ds-background-accent-magenta-subtle, #FF8ED4)',
    },
  },
  {
    id: '4-6',
    name: 'тёмно-розовый',
    // value: 'pink_dark',
    style: {
      '--background-color': 'var(--ds-background-accent-magenta-subtle, #F9C2E4)',
      '--foreground-color': 'var(--ds-background-accent-magenta-bolder, #E568AF)',
    },
  },
  {
    id: '5-4',
    name: 'серый',
    // value: 'black_light',
    style: {
      '--background-color': 'var(--ds-background-accent-gray-subtlest, #EBECF0)',
      '--foreground-color': 'var(--ds-background-accent-gray-subtler, #505F79)',
    },
  },
  {
    id: '5-5',
    name: 'чёрный',
    // value: 'black',
    style: {
      '--background-color': 'var(--ds-background-accent-gray-subtler, #DFE1E6)',
      '--foreground-color': 'var(--ds-background-accent-gray-subtle, #344563)',
    },
  },
  {
    id: '5-6',
    name: 'глубоко-чёрный',
    // value: 'black_dark',
    style: {
      '--background-color': 'var(--ds-background-accent-gray-subtle, #C1C7D0)',
      '--foreground-color': 'var(--ds-background-accent-gray-bolder, #091E42)',
    },
  },
]

export default labelColors.reduce((accumulator, currentValue, index) => {
  accumulator[currentValue.id] = { ...currentValue, index }
  return accumulator
}, {})
