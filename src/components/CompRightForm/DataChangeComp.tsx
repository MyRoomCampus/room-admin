import React, { useContext, useState } from 'react'
// import styles from './index.module.less'
import { ComponentSchema } from '@//types/lowCodeComp.type'
import AppContext from '@//store'
import ACTIONS from '@//reducer/actions'
import _ from 'lodash'
import { Button, Form, TextArea, Upload } from '@douyinfe/semi-ui'
import { IconUpload } from '@douyinfe/semi-icons'
import { FileItem } from '@douyinfe/semi-ui/lib/es/upload'

interface Props {
  comp: ComponentSchema
}
const TextDataComponent: React.FC<Props> = (props) => {
  const { dispatch } = useContext(AppContext)
  const { comp } = props
  // const style = { width: '100%' }
  console.log('comp:', comp)
  const { Section } = Form
  return (
    <Section text={'文本内容'}>
      <TextArea
        style={{ width: '100%', height: 60 }}
        value={comp.data}
        onChange={(e) => {
          const newSchema = _.cloneDeep(comp)
          newSchema.data = `${e}`
          dispatch({
            type: ACTIONS.UPDATE_COMPONENT,
            payload: newSchema
          })
        }}
      />
    </Section>
  )
}

const ImageDataComponent: React.FC<Props> = (props) => {
  const { dispatch } = useContext(AppContext)
  const { comp } = props
  //   const [preview, setPreview] = useState()
  // const style = { width: '100%' }
  const [list, updateList] = useState([comp.data])

  //   const onChange = ({ fileList, currentFile }) => {
  //     console.log('onChange')
  //     console.log(fileList)
  //     console.log(currentFile)
  //     const newFileList = [...fileList] // spread to get new array
  //     updateList(newFileList)
  //   }
  console.log('comp:', list)
  const { Section } = Form
  return (
    <Section text={'图片内容'}>
      <Upload
        action="http://127.0.0.1:4523/mock/956583/resource?ContentType=multipart/form-data"
        onChange={(e) => updateList(e.fileList.map((value: FileItem) => (value.url ? value.url : '')))}
        onPreviewClick={(e) => {
          console.log(e)
          const newSchema = _.cloneDeep(comp)
          newSchema.data = e.url ? e.url : ''
          dispatch({
            type: ACTIONS.UPDATE_COMPONENT,
            payload: newSchema
          })
        }}
      >
        <Button icon={<IconUpload />} theme="light">
          点击上传
        </Button>
      </Upload>
      {/* {list.map((upFile, index) => {
        return (
          <div key={index}>
            <img
              src={upFile}
              className={styles['previewImage']}
              alt="preview"
              onClick={() => {
                console.log(index, list)
                const newSchema = _.cloneDeep(comp)
                newSchema.data = list[index]
                dispatch({
                  type: ACTIONS.UPDATE_COMPONENT,
                  payload: newSchema
                })
              }}
            />
          </div>
        )
      })} */}
    </Section>
  )
}

export { TextDataComponent, ImageDataComponent }
