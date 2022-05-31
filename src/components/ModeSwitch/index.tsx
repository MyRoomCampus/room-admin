import { switchMode } from '@//utils/colorMode'
import { Button } from '@douyinfe/semi-ui'
import React from 'react'

const ModeSwitch = () => {
  return (
    <Button onClick={switchMode} style={{ position: 'fixed', right: 20, top: 10 }}>
      Switch Mode
    </Button>
  )
}

export default ModeSwitch
