import React from 'react'
import styles from './index.module.less'
import { Layout } from '@douyinfe/semi-ui'
import { Outlet } from 'react-router-dom'
import { Nav } from '@douyinfe/semi-ui'
import { IconUser, IconStar } from '@douyinfe/semi-icons'
import { NavLink } from 'react-router-dom'

const LayOut: React.FC = () => {
  const { Header, Sider, Content } = Layout
  return (
    <Layout>
      <Header className={styles['layout-header_container']}>1112222</Header>
      <Layout>
        <Sider className={styles['layout-sider_container']}>
          <Nav
            bodyStyle={{
              height: 'calc(100vh - 49px)'
            }}
            defaultSelectedKeys={['house']}
            items={[
              {
                itemKey: 'house',
                text: (
                  <NavLink
                    // className={styles['layout-sider_item']}
                    to="/dashboard"
                  >
                    房源卡片
                  </NavLink>
                ),
                icon: <IconStar />
              },
              {
                itemKey: 'user',
                text: (
                  <NavLink
                    to="/dashboard/user-info"
                    // className={styles['layout-sider_item']}
                  >
                    个人信息
                  </NavLink>
                ),
                icon: <IconUser />
              }
            ]}
          />
        </Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayOut
