import React, { useState, useEffect, useContext, useRef } from 'react'
import styles from './index.module.less'
import { Button, Table, Avatar, ButtonGroup, Toast, Modal, Form, Row, Col } from '@douyinfe/semi-ui'
import AddProject from './AddProject'
import { AvatarColor } from '@douyinfe/semi-ui/lib/es/avatar'
import HouseApi, { IHouseDataOfHouse } from '@//api/home'
import ProgramListApi, { IAProgramInfo, IProgramInfoDataField } from '@//api/programList'
import baseRequest from '@//api'
import AppContext from '@//store'
import ACTIONS from '@//reducer/actions'
import { useNavigate } from 'react-router'
import moment from 'moment'
interface DataforEditProject{
  houseId:number
  projectName:string
}
interface IHouseListEntity extends IProgramInfoDataField {
  key: number
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tmpList: any[] = []
const getHouseInfoData = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
  const res = await HouseApi.GetAllHouseInfoOfUserRequest()
  if(res){
    for(let i=0;i<res.data.length;i++){
      const data = {
        value:res.data[i].houseId,
        label:res.data[i].listingName,
        otherKey:i
      }
      tmpList.push(data)
    }
  }
}
const HomePage: React.FC = () => {
  const navigator = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataSource, setDataSOurce] = useState<IHouseListEntity[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [perpage,setPerpage] = useState(5)
  const [total,setTotal] = useState(0)
  const [delWindowVisible,setDelWindowVisible] = useState(false)
  const [editWindowVisible,setEditWindowVisible] = useState(false)
  const { store, dispatch } = useContext(AppContext)
  const api = useRef<{ validate: () => Promise<DataforEditProject> }>()
  const [houseId,setHouseId] = useState(0)
  const [projectName,setProjectName] = useState('')
  const [key,setKey] = useState(0)
  const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png'
  const confirmDelete = () =>{
    setDelWindowVisible(true)
  }
  const handleDeleteCancel = () => {
    setDelWindowVisible(false)
  }
  const deleteProject = async () => {
    setDelWindowVisible(false)
    const id = houseId
    const res = await baseRequest.del('/project/'+houseId.toString(),{id})
    if(res){
      Toast.success('删除成功！')
      const newDataSource = [...dataSource]
      if (key != null) {
        const idx = newDataSource.findIndex(data => data.key === key)
        if (idx > -1) {
            newDataSource.splice(idx, 1)
            setDataSOurce([...newDataSource])
            setTotal(total-1)
      }
  }
    }else{
      Toast.error('删除失败！')
    }
  }
  const getEditModal = () => {
    setEditWindowVisible(true)
  }
  const handleEditProject = () => {
    void api.current?.validate().then(async (values:DataforEditProject)=>{
        const houseId = values.houseId
        const name = values.projectName
        const id = houseId
        const projectData = await baseRequest.get<IAProgramInfo>('/project/'+houseId.toString(),{id})
        const houseCardData = await baseRequest.get<IHouseDataOfHouse>('/house/'+houseId.toString(),{id})
        if(projectData){
          dispatch({
            type:ACTIONS.INITIAL_LOW_CODE,
            payload:{
              houseId:houseId,
              projectName: name,
              author: store.userInfo?.username,
              data:projectData.data.data,
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
          })
          navigator('/low-code-platform')
        }else{
          Toast.error('编辑失败')
        }
      })
  }
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      width: 400,
      render: (text: string) => {
        return (
          <div>
            <Avatar size="small" shape="square" src={figmaIconUrl} style={{ marginRight: 12 }}></Avatar>
            {text}
          </div>
        )
      }
    },
    {
      title: '创建者',
      dataIndex: 'owner',
      render: (text: string, record: { avatarBg: AvatarColor }) => {
        return (
          <div>
            <Avatar size="small" color={record.avatarBg} style={{ marginRight: 4 }}>
              {typeof text === 'string' && text.slice(0, 1)}
            </Avatar>
            {text}
          </div>
        )
      }
    },
    {
      title: '创建日期',
      dataIndex: 'updateTime',
      // sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
      render: (value: string) => {
        return value
      }
    },
    {
      title: '',
      dataIndex: 'operate',
      render: (text:string,record:{key:number,houseId:number,name:string,updateTime:string,owner:string},index:number) => {
        return (
        <>
          <ButtonGroup theme="borderless">
              <Button onClick={() => {
                setHouseId(record.houseId)
                setProjectName(record.name)
                getEditModal()
              }}>编辑</Button>
              <Button onClick={() => {
                setHouseId(record.houseId)
                setKey(record.key)
                confirmDelete()
              }}>删除</Button>
              <Button>发布</Button>
              <Button>查看在线用户</Button>
            </ButtonGroup>
        </>
        )
      }
    }
  ]

  const fetchData = async (page = 1, perpage = 5) => {
    setPage(page)
    setLoading(true)
    const res = await ProgramListApi.GetAllProgramOfUserRequest({ page, perpage })
    if (res) {
      setTotal(res.data.count)
      console.log(res)

      const houseData: IHouseListEntity[] = res.data.data.map((item) => {
        return {
          ...item,
          owner:store.userInfo?.username,
          updateTime: moment(item.updateTime).format('YYYY-MM-DD HH:mm'),
          key: item.houseId
        }
      })
      setDataSOurce(houseData)
    } else {
      Toast.error('获取用户项目信息失败')
    }
    setLoading(false)
  }

  const handlePageChange = (page: number) => {
    setPage(page)
    void fetchData(page, perpage)
  }
  const handlePageSizeChange = (perpage: number) => {
    setPerpage(perpage)
    void fetchData(page, perpage)
  }
  useEffect(() => {
    void getHouseInfoData()
  }, [])

  useEffect(() => {
    void fetchData(page,perpage)
  }, [total])
  return (
    <div className="program-list-Container">
      <div className={styles['program-list-title']}>项目列表</div>

      <div className={styles['program-list-addbtn']}>
        <AddProject HouseIdData={tmpList}></AddProject>
      </div>
      <div>
        <Modal
            title="删除项目"
            visible={delWindowVisible}
            onOk={deleteProject}
            style={{ width: 600 }}
            onCancel={handleDeleteCancel}
          >请问是否确定删除项目:{projectName}?
        </Modal>
        <Modal
          title="编辑项目"
          visible={editWindowVisible}
          onOk={handleEditProject}
          style={{ width: 600 }}
          onCancel={() => setEditWindowVisible(false)}
      >
        <Form
          getFormApi={(formApi: { validate: () => Promise<DataforEditProject> }) => {
            api.current = formApi
          }}
        >
          <Row>
            <Col span={15} offset={2}>
            <Form.Select field="houseId" filter placeholder='请选择房产(支持直接输入名称搜索)' style={{ width: 340 }} initValue={houseId} disabled>
            </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col span={15} offset={2}>
              <Form.Input
                field="projectName"
                label="项目名称"
                trigger="blur"
                initValue={projectName}
                rules={[{ required: true, message: '该项为必填项' }]}
              />
            </Col>
          </Row>
        </Form>
      </Modal>
      </div>
      <div>
        <Table
          columns={columns as []}
          dataSource={dataSource}
          pagination={{
            total: total,
            pageSize: perpage,
            currentPage: page,
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOpts: [5, 10, 20, 50, 100],
            onPageChange: handlePageChange,
            onPageSizeChange: handlePageSizeChange
          }}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default HomePage
