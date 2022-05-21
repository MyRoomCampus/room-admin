import { useState } from 'react'
import { Input, Button, Toast } from '@douyinfe/semi-ui'
import { setToken } from '@//utils/token'
import LoginApi from '@//api/login'
import styles from './index.module.less'
interface IProps {
  someProps?: number
}

const LoginPage: React.FC<IProps> = (props) => {
  const { someProps } = props

  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')

  const onRegister = () => {
    LoginApi.registerRequest({ account, password })
      .then((res) => {
        console.log(res)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const onLogin = async () => {
    try {
      const res = await LoginApi.loginRequest({ account, password })
      if (res.code === 200) {
        const { data } = res;
        setToken(data.token);
        Toast.success('登录成功');
      } else {
        Toast.error('登录失败')
      }
    } catch (e) {
      console.log(e)
    }
  }

  const onGetHttp = async () => {
    try {
      const res = await LoginApi.testGetBadRequest({ account, password })
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  const onPostHttp = async () => {
    try {
      const res = await LoginApi.testPostBadRequest({ account, password })
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={styles.container}>
      <div>
        account: <Input type="text" onChange={(v) => setAccount(v)} />
      </div>
      <div>account: {account}</div>
      <div>
        password: <Input type="password" onChange={(v) => setPassword(v)} />
      </div>
      <div>password: {password}</div>

      <div>
        <Button onClick={onRegister}>Register</Button>
        <Button onClick={onLogin}>Login</Button>
        <Button onClick={onGetHttp}>invalid bad get req</Button>
        <Button onClick={onPostHttp}>invalid bad post req</Button>
      </div>

      <div> props: {someProps}</div>
    </div>
  )
}

export default LoginPage
