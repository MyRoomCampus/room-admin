import React from 'react'
import styles from './index.module.less'
import { Layout } from '@douyinfe/semi-ui'
import { Outlet } from 'react-router-dom'
import { Nav } from '@douyinfe/semi-ui'
import { IconUser, IconStar } from '@douyinfe/semi-icons'
import {
  NavItemPropsWithItems,
  NavItems
} from '@douyinfe/semi-ui/lib/es/navigation'
import { useNavigate } from 'react-router-dom'

const menuItem: NavItems = [
  {
    itemKey: '/dashboard',
    text: <span className={styles['layout-sider-item']}>房源卡片</span>,
    icon: <IconStar />
  },
  {
    itemKey: '/dashboard/user-info',
    text: <span className={styles['layout-sider-item']}>个人信息</span>,
    icon: <IconUser />
  }
]

const LayOut: React.FC = () => {
  const navigator = useNavigate()

  const { Header, Sider, Content } = Layout
  return (
    <Layout>
      <Header className={styles['layout-header-container']}>
        MYROOM麦荣经纪人子系统
      </Header>
      <Layout>
        <Sider className={styles['layout-sider-container']}>
          <Nav
            mode="vertical"
            className={styles['layout-sider-container']}
            defaultSelectedKeys={[
              (menuItem[0] as NavItemPropsWithItems).itemKey!
            ]}
            items={menuItem}
            onClick={(item) => navigator(item.itemKey as string)}
          />
        </Sider>
        <Content className={styles['layout-content-container']}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayOut
