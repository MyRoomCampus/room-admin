import React, { useState } from 'react'
import styles from './index.module.less'
import { Nav } from '@douyinfe/semi-ui'
import { IconAppCenter, IconAscend, IconComponent } from '@douyinfe/semi-icons'
import { NavItems, NavItemPropsWithItems } from '@douyinfe/semi-ui/lib/es/navigation'
const menuItem: NavItems = [
  {
    itemKey: 'baseComp',
    text: '基础组件',
    icon: <IconAppCenter />
  },
  {
    itemKey: 'complexComp',
    text: '高级组件',
    icon: <IconComponent />
  },
  {
    itemKey: 'layInspect',
    text: '层级选择',
    icon: <IconAscend />
  }
]
const CompPanel: React.FC = () => {
  const [curItem, setCurItem] = useState('baseComp')

  const onMenuClick = (item: NavItemPropsWithItems) => {
    setCurItem(item.itemKey as string)
  }

  return (
    <div className={styles['left-panel-container']}>
      <Nav
        className={styles['left-panel-nav']}
        defaultSelectedKeys={['baseComp']}
        isCollapsed
        items={menuItem}
        onClick={onMenuClick}
      />
      <div className={styles['left-panel-detail']}>{curItem}</div>
    </div>
  )
}

export default CompPanel
