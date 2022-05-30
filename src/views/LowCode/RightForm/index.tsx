import { Form } from '@douyinfe/semi-ui'
import React, { useContext, useMemo } from 'react'
import styles from './index.module.less'
import AppContext from '@//store'
import { findSchemaById } from '@//utils/jsonSchemaUtils'
import ACTIONS from '@//reducer/actions'
import _ from 'lodash'

const numberStyles = ['left', 'top', 'width', 'height']
// const colorStyles = ['backgroundColor', 'color']
const RightForm: React.FC = () => {
  const { store, dispatch } = useContext(AppContext)
  const selectedSchema = useMemo(() => {
    console.log(store)
    return findSchemaById(store.lowCodeInfo?.JSONSchema.data, store.lowCodeInfo?.curSelectCompId)
  }, [store])
  const handleValueChange = (values: Record<string, unknown>) => {
    const newSchema = _.cloneDeep(selectedSchema)
    newSchema && (newSchema.style = { ...newSchema.style, ...values } as typeof newSchema.style)
    dispatch({
      type: ACTIONS.UPDATE_COMPONENT,
      payload: newSchema
    })
  }
  return (
    <div className={styles['right-panel-container']}>
      <Form
        onValueChange={handleValueChange}
        labelPosition="left"
        labelAlign="right"
        labelWidth={120}
        style={{ padding: '10px', maxWidth: 380 }}
      >
        {Object.entries(selectedSchema?.style ?? []).map(([style, value]) => {
          if (style === 'position') return
          if (numberStyles.includes(style)) {
            return (
              <Form.InputNumber
                key={style}
                innerButtons={true}
                suffix={'px'}
                initValue={parseInt(value)}
                field={style}
              ></Form.InputNumber>
            )
          } else {
            return (
              <Form.Input key={style} initValue={value} placeholder={style} label={style} field={style}></Form.Input>
            )
          }
        })}
      </Form>
    </div>
  )
}

export default RightForm
