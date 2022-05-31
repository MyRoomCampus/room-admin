import React, { useRef, useState } from 'react'
import { Form, Modal, Button, Row, Col, Toast } from '@douyinfe/semi-ui'
import ProgramListApi from '@//api/programList'

export default function AddProject() {
  const [visible, setVisible] = useState(false)
  const api = useRef<{ validate: () => Promise<unknown> }>()
  const handleAddProject = async () => {
    try {
      const value = (await api.current?.validate()) as { projectName: string }
      if (value) {
        const name = value.projectName
        const res = await ProgramListApi.AddProgramRequest({ name })
        if (res) {
          Toast.success('添加成功')
        } else {
          Toast.error('添加失败')
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Button theme="solid" onClick={() => setVisible(true)}>
        新建项目
      </Button>
      <Modal
        title="新建项目"
        visible={visible}
        onOk={handleAddProject}
        style={{ width: 600 }}
        onCancel={() => setVisible(false)}
      >
        <Form
          getFormApi={(formApi: { validate: () => Promise<unknown> }) => {
            api.current = formApi
          }}
        >
          <Row>
            <Col span={15} offset={2}>
              <Form.Input
                field="projectName"
                label="项目名称"
                trigger="blur"
                rules={[{ required: true, message: '该项为必填项' }]}
              />
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}
