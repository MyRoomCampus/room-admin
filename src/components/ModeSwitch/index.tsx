import { Button } from '@douyinfe/semi-ui'
import React from 'react'

const ModeSwitch = () => {
  const switchMode = () => {
    const body = document.body
    if (body.hasAttribute('theme-mode')) {
      body.removeAttribute('theme-mode')
    } else {
      body.setAttribute('theme-mode', 'dark')
    }
  }
  return (
    <Button onClick={switchMode} style={{ position: 'fixed', right: 20, top: 10 }}>
      Switch Mode
    </Button>
  )
}

export default ModeSwitch
