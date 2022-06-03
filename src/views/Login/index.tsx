import React, { useContext, useEffect, useState } from 'react'
import { Input, Button, Toast } from '@douyinfe/semi-ui'
import { getAccessToken, setToken } from '@//utils/token'
import LoginApi from '@//api/login'
import styles from './index.module.less'
import { useNavigate } from 'react-router'
import ModeSwitch from '@//components/ModeSwitch'
import AppContext from '@//store'
import ACTIONS from '@//reducer/actions'

const LoginPage: React.FC = () => {
  const navigator = useNavigate()
  const { dispatch } = useContext(AppContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg] = useState('')
  const doAuth = async () => {
    const res = await getAccessToken()
    if (res) {
      const { UserName } = JSON.parse(Buffer.from(res.split('.')[1], 'base64').toString())
      if (!UserName) {
        Toast.error('非法Token')
        return
      }
      dispatch({
        type: ACTIONS.INITIAL_USER,
        payload: { username: UserName }
      })

      navigator('/dashboard')
    }
  }
  useEffect(() => {
    void doAuth()
  }, [])

  const onRegister = async () => {
    const res = await LoginApi.registerRequest({ username, password })
    if (res) {
      Toast.success(res.msg)
    } else {
      Toast.error('注册失败')
    }
  }

  const onLogin = async () => {
    const res = await LoginApi.loginRequest({ username, password })
    if (res) {
      setToken(res.accessToken, 'access')
      setToken(res.refreshToken, 'refresh')
      const { UserName } = JSON.parse(atob(res.accessToken.split('.')[1]))
      if (!UserName) {
        Toast.error('非法Token')
        return
      }
      dispatch({
        type: ACTIONS.INITIAL_USER,
        payload: { username: UserName }
      })
      navigator('/dashboard')
      Toast.success('登录成功')
    } else {
      Toast.error('登录失败')
    }
  }

  return (
    <div className={styles['login-page-container']}>
      <div className={styles['login-form-container']}>
        <div className={styles['login-form-title']}>欢迎进入MYROOM麦荣系统</div>

        <div className={styles['login-form-input']}>
          <div className={styles['login-form-input--label']}>Username：</div>
          <Input type="text" size="large" onChange={(v) => setUsername(v)} />
        </div>

        <div className={styles['login-form-input']}>
          <div className={styles['login-form-input--label']}>Password：</div>
          <Input type="password" size="large" onChange={(v) => setPassword(v)} />
          <div className={styles['login-form-input--error']}>{Boolean(errMsg) && `*${errMsg}`}</div>
        </div>

        <div className={styles['login-form-submit']}>
          <Button onClick={onRegister} size="large" className={styles['login-form-submit--btn']}>
            注册
          </Button>
          <Button onClick={onLogin} size="large" className={styles['login-form-submit--btn']}>
            登录
          </Button>
        </div>
      </div>
      <ModeSwitch />
    </div>
  )
}

export default LoginPage
