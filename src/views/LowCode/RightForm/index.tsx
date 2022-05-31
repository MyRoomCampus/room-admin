import React, { useContext } from 'react'
import styles from './index.module.less'
import AppContext from '@//store'
import { findCompFromJson } from '@//utils/jsonSchemaUtils'
import { ComponentName } from '@//types/lowCodeComp.type'
import { ImageFormComponent, TextFormComponent } from '@//components/CompRightForm'
const RightForm: React.FC = () => {
  const { store } = useContext(AppContext)
  const { lowCodeInfo } = store
  console.log('curId:', lowCodeInfo?.curSelectCompId)
  if (lowCodeInfo) {
    const { JSONSchema, curSelectCompId } = lowCodeInfo
    const curSelectComp = findCompFromJson(curSelectCompId, JSONSchema.data)
    if (curSelectComp?.name === ComponentName.TextComponent) {
      return (
        <div className={styles['right-panel-container']}>
          <TextFormComponent comp={curSelectComp}></TextFormComponent>
        </div>
      )
    } else if (curSelectComp?.name === ComponentName.ImageComponent) {
      return (
        <div className={styles['right-panel-container']}>
          <ImageFormComponent comp={curSelectComp}></ImageFormComponent>
        </div>
      )
    } else {
      return <div className={styles['right-panel-container']}>未选中元素</div>
    }
  } else {
    return <div className={styles['right-panel-container']}>未选中元素</div>
  }
}

export default RightForm
