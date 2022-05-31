import React from 'react'
import styles from './index.module.less'
import { Input, Button } from '@douyinfe/semi-ui'
import { useNavigate } from 'react-router-dom'

const UserInfo: React.FC = () => {
  const navigator = useNavigate()
  const returnHome = () => {
    navigator('/dashboard')
  }
  return (
    <div>
      <div className={styles['user-info-form-title']}>
        <p>个人信息</p>
      </div>

      <div className={styles['user-info-form-input']}>
        <div className={styles['user-info-form-input-label']}>用户名:</div>
        <Input type="text" size="default" className={styles['user-info-form-input-textinput']} />
      </div>

      <div className={styles['user-info-form-input']}>
        <div className={styles['user-info-form-input-label']}>密码:</div>
        <Input mode="password" size="default" className={styles['user-info-form-input-textinput']} />
      </div>

      <div className={styles['user-info-form-submit']}>
        <Button theme="solid">更改</Button>
        <Button theme="solid" onClick={returnHome}>
          返回
        </Button>
      </div>
    </div>
  )
}

export default UserInfo
