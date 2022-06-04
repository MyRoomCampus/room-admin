import React, { useContext } from 'react'
// import styles from './index.module.less'
import { ComponentSchema } from '@//types/lowCodeComp.type'
import AppContext from '@//store'
import ACTIONS from '@//reducer/actions'
import _ from 'lodash'
import { Button, Form, TextArea, Upload } from '@douyinfe/semi-ui'
import { IconUpload } from '@douyinfe/semi-icons'
import MediaApi from '@//api/media'

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
const getUpToken =async () => {
  const res = await MediaApi.getUpToken()
    return res
}
const ImageDataComponent: React.FC<Props> = (props) => {
  const { dispatch } = useContext(AppContext)
  const { comp } = props
  //   const [preview, setPreview] = useState()
  // const style = { width: '100%' }
  const { Section } = Form
  let mediatoken = ''
  const res = getUpToken()
  res.then(function(value){
    console.log('res:成功:', value);
    mediatoken = value.data
  })
  .catch(function(err){
    console.error('err:', err);
  });
  const time = new Date().getTime()
  const key = time.toString()
  return (
    <Section text={'图片内容'}>
      <Upload
        action='https://upload-z2.qiniup.com/'
        data={(file:File)=>{
          return {
            token:mediatoken,
            type:'image',
            file:file,
            key:key,
          }
        }}
        onPreviewClick={(e) => {
          console.log('e:', e)
          const newSchema = _.cloneDeep(comp)
          newSchema.data = e.response?`https://x.saicem.top/${e.response.key}`:''
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
    </Section>
  )
}

const VideoDataComponent: React.FC<Props> = (props) => {
  const { dispatch } = useContext(AppContext)
  const { comp } = props
  //   const [preview, setPreview] = useState()
  // const style = { width: '100%' }
  const { Section } = Form
  let mediatoken = ''
  const res = getUpToken()
  res.then(function(value){
    console.log('res:成功:', value);
    mediatoken = value.data
  })
  .catch(function(err){
    console.error('err:', err);
  });
  const time = new Date().getTime()
  const key = time.toString()
  return (
    <Section text={'视频内容'}>
      <Upload
       action='https://upload-z2.qiniup.com/'
       data={(file:File)=>{
         return {
           token:mediatoken,
           type:'video',
           file:file,
           key:key,
         }
       }}
       onPreviewClick={(e) => {
         console.log('e:', e)
         const newSchema = _.cloneDeep(comp)
         newSchema.data = e.response?`https://x.saicem.top/${e.response.key}`:''
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
    </Section>
  )
}

const AudioDataComponent: React.FC<Props> = (props) => {
  const { dispatch } = useContext(AppContext)
  const { comp } = props
  //   const [preview, setPreview] = useState()
  // const style = { width: '100%' }
  const { Section } = Form
  let mediatoken = ''
  const res = getUpToken()
  res.then(function(value){
    console.log('res:成功:', value);
    mediatoken = value.data
  })
  .catch(function(err){
    console.error('err:', err);
  });
  const time = new Date().getTime()
  const key = time.toString()
  return (
    <Section text={'录音内容'}>
      <Upload
        action='https://upload-z2.qiniup.com/'
        data={(file:File)=>{
          return {
            token:mediatoken,
            type:'audio',
            file:file,
            key:key,
          }
        }}
        onPreviewClick={(e) => {
          console.log('e:', e)
          const newSchema = _.cloneDeep(comp)
          newSchema.data = e.response?`https://x.saicem.top/${e.response.key}`:''
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
    </Section>
  )
}

export { TextDataComponent, ImageDataComponent, VideoDataComponent, AudioDataComponent }
