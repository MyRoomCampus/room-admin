import ACTIONS from '@//reducer/actions'
import AppContext from '@//store'
import { clearToken } from '@//utils/token'
import { Button, Modal } from '@douyinfe/semi-ui'
import React, { CSSProperties, useContext } from 'react'
import { useNavigate } from 'react-router'

const LogoutBtn: React.FC<{ style?: CSSProperties }> = ({ style = {} }) => {
  const navigator = useNavigate()
  const { dispatch } = useContext(AppContext)
  const handleLogOut = () => {
    Modal.warning({
      title: '注销',
      content: '是否确认退出登录',
      onOk: () => {
        clearToken()
        dispatch({
          type: ACTIONS.LOGOUT_USER
        })
        navigator('/login')
      }
    })
  }
  return (
    <Button style={{ position: 'fixed', right: 150, top: 15, ...style }} onClick={handleLogOut}>
      注销
    </Button>
  )
}

export default LogoutBtn
