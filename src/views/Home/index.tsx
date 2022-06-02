import React, { useState, useEffect } from 'react'
import styles from './index.module.less'
import { Button, Table, Avatar, ButtonGroup } from '@douyinfe/semi-ui'
import AddProject from './AddProject'
import { AvatarColor } from '@douyinfe/semi-ui/lib/es/avatar'
import HouseApi from '@//api/home'
const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png'
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
    title: '修改日期',
    dataIndex: 'updateTime',
    // sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
    render: (value: string) => {
      return value
    }
  },
  {
    title: '',
    dataIndex: 'operate',
    render: () => {
      return (
        <ButtonGroup theme="borderless">
          <Button>编辑</Button>
          <Button>删除</Button>
          <Button>发布</Button>
          <Button>查看在线用户</Button>
        </ButtonGroup>
      )
    }
  }
]
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tmpList: any[] = []
const getHouseInfoData = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
  const res = await HouseApi.GetAllHouseInfoOfUserRequest()
  console.log('######');
  
  console.log(res)

  if (res) {
    for (let i = 0; i < res.data.length; i++) {
      const data = {
        value: res.data[i].houseId,
        label: res.data[i].listingName,
        otherKey: i
      }
      tmpList.push(data)
    }
  }
}
const HomePage: React.FC = () => {
  // const [dataSource, setData] = useState<IHouse[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [perpage, setPerpage] = useState(5)
  const fetchData = async (page = 1, perpage = 5) => {
    setPage(page)
    setLoading(true)
    // setData([])
    // const data = await getHouseDataRequest({ page,perpage })
    // setData(data)
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
    void fetchData()
    void getHouseInfoData()
  }, [])
  return (
    <div className="program-list-Container">
      <div className={styles['program-list-title']}>项目列表</div>

      <div className={styles['program-list-addbtn']}>
        <AddProject HouseIdData={tmpList}></AddProject>
      </div>

      <div>
        <Table
          columns={columns as []}
          // dataSource={dataSource}
          pagination={{
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
