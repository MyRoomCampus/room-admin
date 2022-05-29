import React, { useState } from 'react'
import styles from './index.module.less'
import { Nav } from '@douyinfe/semi-ui'
import { IconAppCenter, IconAscend, IconComponent } from '@douyinfe/semi-icons'
import { NavItems, NavItemPropsWithItems } from '@douyinfe/semi-ui/lib/es/navigation'
import { BASE_COMPS, HIGHER_COMPS } from '@//constants/lowCodeComp'
import CompCard from '@//components/CompCard'
const menuItem: NavItems = [
  {
    itemKey: 'baseComp',
    text: '基础组件',
    icon: <IconAppCenter />
  },
  {
    itemKey: 'complexComp',
    text: '容器组件',
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

  const renderCompList = () => {
    const compsList = curItem === 'baseComp' ? BASE_COMPS : HIGHER_COMPS

    return (
      <>
        {compsList.map((comp) => {
          return <CompCard icon={comp.icon} text={comp.text} compKey={comp.compKey} key={comp.compKey} />
        })}
      </>
    )
  }

  const renderLayerContent = () => {
    return <>layer</>
  }
  const renderMenuContent = () => {
    switch (curItem) {
      case 'baseComp':
      case 'complexComp':
        return renderCompList()
      case 'layInspect':
        return renderLayerContent()
      default:
        return <>...</>
    }
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
      <div className={styles['left-panel-detail']}>{renderMenuContent()}</div>
    </div>
  )
}

export default CompPanel
