import React, { useContext, useRef, useState } from 'react'
import { Form, Modal, Button, Row, Col, Toast } from '@douyinfe/semi-ui'
import ProgramListApi from '@//api/programList'
import AppContext from '@//store'
import ACTIONS from '@//reducer/actions'
import baseRequest from '@//api'
import { IHouseDataOfHouse } from '@//api/home'
import { useNavigate } from 'react-router'
// import ProgramListApi from '@//api/programList'
interface HouseInfoDataList {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HouseIdData: any[]
}
interface DataforAddProject {
  houseId: number
  projectName: string
}
export default function AddProject(props: HouseInfoDataList) {
  const navigator = useNavigate()
  const { HouseIdData } = props
  const [visible, setVisible] = useState(false)
  const api = useRef<{ validate: () => Promise<DataforAddProject> }>()
  const {store,dispatch} = useContext(AppContext)
  const handleAddProject = () => {
    void api.current?.validate().then(async (values:DataforAddProject)=>{
        const houseId = values.houseId
        const name = values.projectName
        const data = null
        const id = houseId
        const houseCardData = await baseRequest.get<IHouseDataOfHouse>('/house/'+houseId.toString(),{id})
        const res = await ProgramListApi.AddProgramRequest({houseId,name,data})
        if(res){
          Toast.success('添加项目成功！')
          dispatch({
            type:ACTIONS.INITIAL_LOW_CODE,
            payload:{
              houseId:houseId,
              projectName: name,
              author: store.userInfo?.username,
              data:data,
              houseCardData: {
                image:
                  'https://p1.haoduofangs.com/f100-image/SZvX8zYCKzbRod~tplv-u148heywkg-default-v3:0:424:0:0.jpeg?sig=YZTrZrfP-RZia8BOtbQnc5Ic_rA=',
                listingName: houseCardData.data.listingName,
                cityName: houseCardData.data.cityName,
                neighborhoodName: houseCardData.data.neighborhoodName,
                squaremeter: houseCardData.data.squaremeter,
                tags: ['南北通透', '绿化率高'],
                pricing: houseCardData.data.pricing
              } 
            }
          }
        )
        navigator('/low-code-platform')
      } else {
        Toast.error('添加项目失败')
      }
    })
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
          getFormApi={(formApi: { validate: () => Promise<DataforAddProject> }) => {
            api.current = formApi
          }}
        >
          <Row>
            <Col span={15} offset={2}>
            <Form.Select field="houseId" filter placeholder='请选择房产(支持直接输入名称搜索)' style={{ width: 340 }} optionList={HouseIdData}>
            </Form.Select>
            </Col>
          </Row>
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
