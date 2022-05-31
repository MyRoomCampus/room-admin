import React, { useRef, useState } from 'react'
import { Form, Modal, Button, Row, Col, Toast } from '@douyinfe/semi-ui'
import ProgramListApi from '@//api/programList'
import { useNavigate } from 'react-router'
import { getAccessToken } from '@//utils/token'
export default function AddProject() {
  const navigator = useNavigate()
  const [visible, setvisible] = useState(false)
  const message = '该项为必填项'
  const api: object = useRef()
  const showDialog = () => {
    setvisible(true)
  }
  const handleAddProject = () => {
    api.current
      .validate()
      .then(async (value: object) => {
        const name = value['projectName']
        let accessToken: string | null = ''
        await getAccessToken().then((result) => {
          console.log(result)
          accessToken = result
        })
        console.log({ name })
        const res = await ProgramListApi.AddProgramRequest(accessToken, { name })
        if (res) {
          Toast.success('添加成功')
          navigator('/dashboard')
        } else {
          Toast.error('添加失败')
        }
      })
      .catch((errors: string) => {
        console.log(errors)
      })
  }
  const handleCancel = () => {
    setvisible(false)
  }

  return (
    <>
      <Button theme="solid" onClick={showDialog}>
        新建项目
      </Button>
      <Modal title="新建项目" visible={visible} onOk={handleAddProject} style={{ width: 600 }} onCancel={handleCancel}>
        <Form
          getFormApi={(formApi: object) => {
            api.current = formApi
          }}
        >
          <Row>
            <Col span={15} offset={2}>
              <Form.Input field="projectName" label="项目名称" trigger="blur" rules={[{ required: true, message }]} />
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}
