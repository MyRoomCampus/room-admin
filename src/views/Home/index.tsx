import React, { useState, useEffect } from 'react'
import styles from './index.module.less'
import { Button, Table, Avatar, ButtonGroup } from '@douyinfe/semi-ui'
import AddProject from './AddProject'
import { AvatarColor } from '@douyinfe/semi-ui/lib/es/avatar'
const figmaIconUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/figma-icon.png'
const pageSize = 5
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
    render: (text: string, record: { avatarBg: AvatarColor | undefined }) => {
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
    sorter: (a, b) => (a.updateTime - b.updateTime > 0 ? 1 : -1),
    render: (value) => {
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

const getData = () => {
  const data = []
  for (let i = 0; i < 46; i++) {
    const isSemiDesign = i % 2 === 0
    const randomNumber = (i * 1000) % 199
    data.push({
      key: '' + i,
      name: isSemiDesign ? `Semi Design 设计稿${i}.fig` : `Semi Pro 设计稿${i}.fig`,
      owner: isSemiDesign ? '姜鹏志' : '郝宣',
      size: randomNumber,
      updateTime: '111',
      avatarBg: isSemiDesign ? 'grey' : 'red'
    })
  }
  return data
}

const data = getData()

const HomePage: React.FC = () => {
  const [dataSource, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setPage] = useState(1)

  const fetchData = (currentPage = 1) => {
    setLoading(true)
    setPage(currentPage)
    return new Promise((res) => {
      setTimeout(() => {
        const data = getData()
        const dataSource = data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        res(dataSource)
      }, 300)
    }).then((dataSource) => {
      setLoading(false)
      setData(dataSource)
    })
  }

  const handlePageChange = (page: unknown) => {
    fetchData(page)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="programList-Container">
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
            total: data.length,
            onPageChange: handlePageChange
          }}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default HomePage
