import { switchMode } from '@//utils/colorMode'
import { Button } from '@douyinfe/semi-ui'
import React, { CSSProperties } from 'react'

const ModeSwitch: React.FC<{ style?: CSSProperties }> = ({ style = {} }) => {
  return (
    <Button onClick={switchMode} style={{ position: 'fixed', right: 20, top: 9, ...style }}>
      Switch Mode
    </Button>
  )
}

export default ModeSwitch
