import React, { useState, useEffect, useContext, useRef } from 'react'
import styles from './index.module.less'
import { Button, Table, Avatar, ButtonGroup, Toast, Modal, Form, Row, Col, Tooltip } from '@douyinfe/semi-ui'
import AddProject from './AddProject'
import { AvatarColor } from '@douyinfe/semi-ui/lib/es/avatar'
import { IHouseDataOfHouse } from '@//api/home'
import ProgramListApi, { IAProgramInfo, IProgramInfoDataField } from '@//api/programList'
import baseRequest from '@//api'
import AppContext from '@//store'
import ACTIONS from '@//reducer/actions'
import { useNavigate } from 'react-router'
import moment from 'moment'
interface DataforEditProject {
  houseId: number
  projectName: string
}
interface IHouseListEntity extends IProgramInfoDataField {
  key: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any

const HomePage: React.FC = () => {
  const navigator = useNavigate()
  const [dataSource, setDataSOurce] = useState<IHouseListEntity[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [perpage, setPerpage] = useState(5)
  const [total, setTotal] = useState(0)
  const { store, dispatch } = useContext(AppContext)
  const api = useRef<{ validate: () => Promise<DataforEditProject> }>()

  const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png'

  // 执行删除
  const deleteProject = async (record: IHouseListEntity) => {
    const id = record.houseId
    const res = await baseRequest.del(`/project/${id}`, { id })
    if (res) {
      Toast.success('删除成功！')
      void fetchData(page, perpage)
    } else {
      Toast.error('删除失败！')
    }
  }
  // 执行编辑
  const handleEditProject = (record: IHouseListEntity) => {
    void api.current?.validate().then(async () => {
      const houseId = record.houseId
      const name = record.name
      const projectData = await baseRequest.get<IAProgramInfo>(`/project/${houseId}`, { id: houseId })
      const houseCardData = await baseRequest.get<IHouseDataOfHouse>(`/house/${houseId}`, { id: houseId })
      if (projectData && houseCardData) {
        dispatch({
          type: ACTIONS.INITIAL_LOW_CODE,
          payload: {
            houseId: houseId,
            projectName: name,
            author: store.userInfo?.username,
            data: JSON.parse(projectData.data.data as string).data || [],
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
      } else {
        Toast.error('编辑失败')
      }
    })
  }
  // 点击编辑的回调
  const editProjectHandler = (record: IHouseListEntity) => {
    Modal.info({
      title: '编辑项目',
      content: (
        <>
          <Form
            getFormApi={(formApi: { validate: () => Promise<DataforEditProject> }) => {
              api.current = formApi
            }}
          >
            <Row>
              <Col span={15} offset={2}>
                <Form.Select
                  field="houseId"
                  filter
                  style={{ width: 340 }}
                  initValue={record.houseId}
                  disabled
                ></Form.Select>
              </Col>
            </Row>
            <Row>
              <Col span={15} offset={2}>
                <Form.Input
                  field="projectName"
                  label="项目名称"
                  trigger="blur"
                  initValue={record.name}
                  rules={[{ required: true, message: '该项为必填项' }]}
                />
              </Col>
            </Row>
          </Form>
        </>
      ),
      onOk: () => {
        handleEditProject(record)
      }
    })
  }
  // 点击删除的回调
  const deleteProjectHandler = (record: IHouseListEntity) => {
    Modal.warning({
      title: '删除项目',
      content: '确认是否删除项目',
      onOk: () => {
        void deleteProject(record)
      }
    })
  }
  // 点击发布/取消发布后的回调
  const editProjectStatusHandler = (record: IHouseListEntity) => {
    Modal.warning({
      title: record.isPublished ? '取消发布项目' : '发布项目',
      content: record.isPublished ? '请问是否确认取消发布该项目？' : '请问是否确认发布该项目？',
      onOk: () => {
        if (!record.isPublished) {
          void publishProject(record)
        } else {
          void cancelPublishProject(record)
        }
      }
    })
  }
  // 执行项目发布
  const publishProject = async (record: IHouseListEntity) => {
    const id = record.houseId
    const isPublish = true
    const res = await baseRequest.put(`/project/publish/${id}`, { isPublish })
    console.log(res)
    if (res) {
      Toast.success('发布项目成功！')
      void fetchData(page, perpage)
    } else {
      Toast.error('发布项目失败！')
    }
  }
  // 取消项目发布
  const cancelPublishProject = async (record: IHouseListEntity) => {
    const id = record.houseId
    const isPublish = false
    const res = await baseRequest.put(`/project/publish/${id}`, { isPublish })
    console.log(res)
    if (res) {
      Toast.success('取消发布项目成功！')
      void fetchData(page, perpage)
    } else {
      Toast.error('取消发布项目失败！')
    }
  }
  const columns = [
    {
      title: '项目id',
      dataIndex: 'key',
      width: 100
    },
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
      dataIndex: 'createdAt'
    },
    {
      title: '发布状态',
      dataIndex: 'status',
      render: (published: boolean) => {
        console.log(published)

        if (published) {
          return <div style={{ color: 'rgba(var(--semi-green-5), 1)' }}>已发布</div>
        }
        return <div style={{ color: 'rgba(var(--semi-grey-2), 1)' }}>未发布</div>
      }
    },
    {
      title: '操作',
      render: (text: string, record: IHouseListEntity) => {
        return (
          <ButtonGroup theme="borderless">
            <Button
              onClick={() => {
                editProjectHandler(record)
              }}
            >
              编辑
            </Button>
            <Button
              onClick={() => {
                deleteProjectHandler(record)
              }}
            >
              删除
            </Button>
            <Button
              onClick={() => {
                editProjectStatusHandler(record)
              }}
            >
              {record.isPublished ? '取消发布' : '发布'}
            </Button>
            <Tooltip content={'暂不支持此功能'}>
              <Button disabled>查看在线用户</Button>
            </Tooltip>
          </ButtonGroup>
        )
      }
    }
  ]

  // 获取列表项目
  const fetchData = async (page = 1, perpage = 5) => {
    setPage(page)
    setLoading(true)
    const res = await ProgramListApi.GetAllProgramOfUserRequest({ page, perpage })
    if (res) {
      setTotal(res.data.count)
      const houseData: IHouseListEntity[] = res.data.data.map((item) => {
        return {
          ...item,
          owner: store.userInfo?.username,
          createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm'),
          status: item.isPublished,
          key: item.houseId
        }
      })
      setDataSOurce(houseData)
    } else {
      Toast.error('获取用户项目信息失败')
    }
    setLoading(false)
  }

  useEffect(() => {
    void fetchData(page, perpage)
  }, [page, perpage, total])
  return (
    <div className="program-list-Container">
      <div className={styles['program-list-title']}>项目列表</div>

      <div className={styles['program-list-addbtn']}>
        <AddProject />
      </div>

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
          onPageChange: (page: number) => {
            setPage(page)
          },
          onPageSizeChange: (perpage: number) => {
            setPerpage(perpage)
          }
        }}
        loading={loading}
      />
    </div>
  )
}

export default HomePage
