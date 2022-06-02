import React, { useState } from 'react'
import styles from './index.module.less'
import { Button, Form, Toast } from '@douyinfe/semi-ui'
import { useNavigate } from 'react-router-dom'
import UserInfoApi from '@//api/userInfo'
import { getUserName } from '@//utils/token'

const UserInfo: React.FC = () => {
  const navigator = useNavigate()
  const [userName] = useState(getUserName())
  const [newPassWord, SetNewPassword] = useState('')
  const [confirmNewPassword, SetConfirmNewPassword] = useState('')
  const returnHome = () => {
    navigator('/dashboard')
  }
  const validateNewPassword = () => {
    if (newPassWord && newPassWord.length < 6) {
      return '密码长度应大于6位'
    } else {
      return ''
    }
  }
  const validateConfirmNewPassword = () => {
    if (confirmNewPassword && confirmNewPassword !== newPassWord) {
      return '两次输入的新密码不一致，请重新输入！'
    } else {
      return ''
    }
  }
  const changeUserInfo = async () => {
    if(!userName){
      Toast.error('未获取到当前登录用户的用户名，请重新登录！')
    }
    else{
      const password = newPassWord
      const res = await UserInfoApi.changeUserInfoRequest({ password })
      if (res) {
        console.log(res)
        Toast.success('修改成功')
      } else {
        Toast.error('修改失败')
      }
    }
  }
  return (
    <div>
      <div className={styles['user-info-form-title']}>
        <p>个人信息</p>
      </div>
      <Form>
        <Form.Input
          field="UserName"
          label="用户名"
          style={{ width: 300 }}
          initValue={getUserName()}
          disabled
        />
        <Form.Input
          field="NewPassword"
          label="新密码"
          mode="password"
          style={{ width: 300 }}
          placeholder="请输入新密码"
          initValue={newPassWord}
          onChange={(e) => SetNewPassword(e)}
          trigger="blur"
          validate={validateNewPassword}
        />
        <Form.Input
          field="ConfirmNewPassword"
          label="确认新密码"
          mode="password"
          style={{ width: 300 }}
          placeholder="请再次输入新密码"
          initValue={confirmNewPassword}
          onChange={(e) => SetConfirmNewPassword(e)}
          trigger="blur"
          validate={validateConfirmNewPassword}
        />
        <div className={styles['user-info-form-submit']}>
          <Button theme="solid" onClick={changeUserInfo}>
            更改
          </Button>
          <Button theme="solid" onClick={returnHome}>
            返回
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default UserInfo
