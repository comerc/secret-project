import { Button, DatePicker, Form, InputNumber, Select, Slider, Switch, Modal } from 'antd'
import type { DatePickerProps } from 'antd'
import { SmileFilled } from '@ant-design/icons'
import Link from 'next/link'
import React from 'react'

const FormItem = Form.Item

const content = {
  marginTop: '100px',
}
function TryAntdPage() {
  const onDatePickerChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString)
  }
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <div style={content}>
        <div className="mb-5 text-center">
          <Link href="#" className="logo mr-0">
            <div className="h-20">
              <SmileFilled style={{ fontSize: 48 }} />
            </div>
          </Link>
          <p className="text-disabled mb-3 mt-3">Welcome to the world !</p>
          <Button type="primary" onClick={() => setOpen(true)}>
            Open Modal of 1000px width
          </Button>
        </div>
        <div>
          <Form layout="horizontal" size={'large'} labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
            <FormItem label="Input Number">
              <InputNumber
                min={1}
                max={10}
                style={{ width: 100 }}
                defaultValue={3}
                name="inputNumber"
              />
            </FormItem>

            <FormItem label="Switch">
              <Switch defaultChecked />
            </FormItem>

            <FormItem label="Slider">
              <Slider defaultValue={70} />
            </FormItem>

            <FormItem label="Select">
              <Select
                defaultValue="lucy"
                style={{ width: 192 }}
                options={[
                  {
                    value: 'jack',
                    label: 'Jack',
                  },
                  {
                    value: 'lucy',
                    label: 'Lucy',
                  },
                  {
                    value: 'disabled',
                    disabled: true,
                    label: 'Disabled',
                  },
                  {
                    value: 'Yiminghe',
                    label: 'yiminghe',
                  },
                ]}
              />
            </FormItem>

            <FormItem label="DatePicker">
              <DatePicker showTime onChange={onDatePickerChange} />
            </FormItem>
            <FormItem style={{ marginTop: 48 }} wrapperCol={{ offset: 8 }}>
              <Button type="primary" htmlType="submit">
                OK
              </Button>
              <Button
                style={{ marginLeft: 8 }}
                onClick={() =>
                  Modal.confirm({
                    content: 'Are you sure you want to clear the editor?',
                    maskClosable: true,
                    afterClose() {},
                    onOk() {},
                  })
                }
              >
                Cancel
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
      <Modal
        title="Modal 1000px width"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  )
}

export default TryAntdPage
