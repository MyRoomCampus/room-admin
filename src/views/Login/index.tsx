import { useEffect, useState } from 'react'
import { Input, Button, Toast } from '@douyinfe/semi-ui'
import { setToken } from '@//utils/token'
import LoginApi from '@//api/login'
import styles from './index.module.less'
import { useNavigate } from 'react-router'

const LoginPage: React.FC = () => {
  const navigator = useNavigate();

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    setTimeout(() => {
      setErrMsg('Account Error')
    }, 2000)
  }, [])
  const onRegister = () => {
    LoginApi.registerRequest({ username, password })
      .then((res) => {
        console.log(res)
      })
  }

  const onLogin = async () => {
    const res = await LoginApi.loginRequest({ username, password })
    if (res) {
      setToken(res.accessToken, 'access');
      setToken(res.refreshToken, 'refresh');
      Toast.success('登录成功')
    } else {
      Toast.error('登录失败')
    }
    navigator('/dashboard')
  }

  return (
    <div className={styles['login-page_container']}>
      <div className={styles['login-form_container']}>
        <div className={styles['login-form_title']}>欢迎进入MYROOM麦荣系统</div>

        <div className={styles['login-form_input']}>
          <div className={styles['login-form_input__label']}>Username：</div>
          <Input type="text" size="large" onChange={(v) => setUsername(v)} />
        </div>

        <div className={styles['login-form_input']}>
          <div className={styles['login-form_input__label']}>Password：</div>
          <Input
            type="password"
            size="large"
            onChange={(v) => setPassword(v)}
          />
          <div className={styles['login-form_input__error']}>
            {Boolean(errMsg) && `*${errMsg}`}
          </div>
        </div>

        <div className={styles['login-form_submit']}>
          <Button
            onClick={onRegister}
            size="large"
            className={styles['login-form_submit__btn']}
          >
            注册
          </Button>
          <Button
            onClick={onLogin}
            size="large"
            className={styles['login-form_submit__btn']}
          >
            登录
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
