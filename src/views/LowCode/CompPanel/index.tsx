import React, { useContext, useState } from 'react'
import styles from './index.module.less'
import { Nav, Tree } from '@douyinfe/semi-ui'
import { IconAppCenter, IconAscend, IconComponent } from '@douyinfe/semi-icons'
import { NavItems, NavItemPropsWithItems } from '@douyinfe/semi-ui/lib/es/navigation'
import { BASE_COMPS, HIGHER_COMPS } from '@//constants/lowCodeComp'
import CompCard from '@//components/CompCard'
import AppContext from '@//store'
import ACTIONS from '@//reducer/actions'
import { findCompFromJson, genTreeFromJson } from '@//utils/jsonSchemaUtils'
import { ComponentName } from '@//types/lowCodeComp.type'
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
  const { store, dispatch } = useContext(AppContext)
  const [curItem, setCurItem] = useState('baseComp')

  const onMenuClick = (item: NavItemPropsWithItems) => {
    setCurItem(item.itemKey as string)
  }

  // 层级目录下点击每个tree节点所发生的回调
  const onSelectLayer = (key: string) => {
    if (key === 'root') {
      dispatch({
        type: ACTIONS.UPDATE_SELECTED_LAYWER,
        payload: ''
      })
      return
    }

    const { id, name } = JSON.parse(key)
    const { lowCodeInfo } = store
    if (lowCodeInfo != null) {
      const { JSONSchema, curSelectCompId, curSelectLayerId } = lowCodeInfo

      // 更新目前选择的层级， 如果是容器组件，直接更新，如果不是，查找parentId
      if (name === ComponentName.BoxComponent) {
        dispatch({
          type: ACTIONS.UPDATE_SELECTED_LAYWER,
          payload: id
        })
      } else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const comp = findCompFromJson(id, JSONSchema.data)!
        const parentComp = findCompFromJson(comp.parentid, JSONSchema.data)

        if (parentComp == null) {
          dispatch({
            type: ACTIONS.UPDATE_SELECTED_LAYWER,
            payload: ''
          })
        } else {
          if (parentComp.id !== curSelectLayerId) {
            dispatch({
              type: ACTIONS.UPDATE_SELECTED_LAYWER,
              payload: parentComp.id
            })
          }
        }
      }

      // 更新目前选择的组件
      if (id !== curSelectCompId) {
        dispatch({
          type: ACTIONS.UPDATE_SELECTED_COMP,
          payload: id
        })
      }
    }
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
    const { lowCodeInfo } = store
    if (lowCodeInfo != null) {
      const { data } = lowCodeInfo.JSONSchema
      const treeData = [
        {
          label: 'root',
          key: 'root',
          value: 'root',
          children: genTreeFromJson(data)
        }
      ]

      return (
        <Tree
          treeData={treeData}
          defaultExpandAll
          onSelect={onSelectLayer}
          value={store.lowCodeInfo?.curSelectCompId ?? 'root'}
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      )
    }
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
