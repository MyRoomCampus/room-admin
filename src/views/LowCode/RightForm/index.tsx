// <<<<<<< HEAD
import React, { useContext } from 'react'
import styles from './index.module.less'
import AppContext from '@//store'
import { findCompFromJson } from '@//utils/jsonSchemaUtils'
import { ComponentName } from '@//types/lowCodeComp.type'
import {
  AudioFormComponent,
  BoxFormComponent,
  HouseFormComponent,
  ImageFormComponent,
  TextFormComponent,
  VideoFormComponent,
  UnSelectIdComponent
} from '@//components/CompRightForm'
const RightForm: React.FC = () => {
  const { store } = useContext(AppContext)
  const { lowCodeInfo } = store
  console.log('curId:', lowCodeInfo?.curSelectCompId)
  if (lowCodeInfo != null) {
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
    } else if (curSelectComp?.name === ComponentName.VideoComponent) {
      return (
        <div className={styles['right-panel-container']}>
          <VideoFormComponent comp={curSelectComp}></VideoFormComponent>
        </div>
      )
    } else if (curSelectComp?.name === ComponentName.AudioComponent) {
      return (
        <div className={styles['right-panel-container']}>
          <AudioFormComponent comp={curSelectComp}></AudioFormComponent>
        </div>
      )
    } else if (curSelectComp?.name === ComponentName.BoxComponent) {
      return (
        <div className={styles['right-panel-container']}>
          <BoxFormComponent comp={curSelectComp}></BoxFormComponent>
        </div>
      )
    } else if (curSelectComp?.name === ComponentName.HouseComponent) {
      return (
        <div className={styles['right-panel-container']}>
          <HouseFormComponent comp={curSelectComp}></HouseFormComponent>
        </div>
      )
    } else {
      return (
        <div className={styles['right-panel-container']}>
          <UnSelectIdComponent />
        </div>
      )
    }
  } else {
    return (
      <div className={styles['right-panel-container']}>
        <UnSelectIdComponent />
      </div>
    )
  }
}

export default RightForm
