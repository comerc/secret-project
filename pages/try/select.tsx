import { Select } from 'antd'

const Option = Select.Option

function TrySelectPage() {
  return (
    <div style={{ margin: 10, overflow: 'scroll', height: 200 }}>
      <h2>修复滚动区域的浮层移动问题 / please try open select and scroll the area</h2>
      <div
        style={{ padding: 100, height: 1000, background: '#eee', position: 'relative' }}
        id="area"
      >
        <h4>可滚动的区域 / scrollable area</h4>
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          getPopupContainer={() => document.getElementById('area')}
        >
          <div>1234</div>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="yiminghe">yiminghe</Option>
        </Select>
      </div>
    </div>
  )
}

export default TrySelectPage
