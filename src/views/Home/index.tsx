import React, { useState, useEffect } from 'react'
import styles from './index.module.less'
import { Button, Table, Avatar, ButtonGroup } from '@douyinfe/semi-ui'
import AddProject from './AddProject'
import { getHouseRequest, IHouse } from '@//api/home'
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
    render: (text: string, record: Record<string, any>) => {
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

const HomePage: React.FC = () => {
  const [dataSource, setData] = useState<IHouse[]>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setPage] = useState(1)

  const fetchData = async (currentPage = 1) => {
    setPage(currentPage)
    setLoading(true)
    const data = await getHouseRequest({ currentPage })
    setData(data)
    setLoading(false)
  }

  const handlePageChange = (page: number) => {
    fetchData(page)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="program-list-Container">
      <div className={styles['program-list-title']}>项目列表</div>

      <div className={styles['program-list-addbtn']}>
        <AddProject></AddProject>
      </div>

      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            currentPage,
            showQuickJumper: true,
            showSizeChanger: true,
            total: 46,
            onPageChange: handlePageChange
          }}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default HomePage
