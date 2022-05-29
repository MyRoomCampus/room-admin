import React, { CSSProperties } from 'react'
// import { useDrag } from 'react-dnd'
import { ComponentSchema } from '../types/lowCodeComp.type'

// TODO: split components into seperated files
type ComponentProps = {
  data?: string
  style: Record<string, unknown>
  id: string
}

const AudioComponent: React.FC<ComponentProps> = ({ data, style, id }) => {
  return <audio src={data} style={style as CSSProperties} key={id} controls={true} />
}

const ImageComponent: React.FC<ComponentProps> = ({ data, style, id }) => {
  return <img src={data} style={style as CSSProperties} key={id} />
}

const TextComponent: React.FC<ComponentProps> = ({ data, style, id }) => {
  return (
    <div style={style as CSSProperties} key={id}>
      {data}
    </div>
  )
}

const VideoComponent: React.FC<ComponentProps> = ({ data, style, id }) => {
  return <video src={data} style={style as CSSProperties} key={id} controls={true} />
}

const BoxComponent: React.FC<ComponentProps> = ({ data, style, id }) => {
  return <video src={data} style={style as CSSProperties} key={id} controls={true} />
}

const renderJsonSchema = (schema: ComponentSchema): React.ReactNode => {
  const { name, data, style, id } = schema
  // const [, drag] = useDrag(() => ({
  //   type: name
  // }))
  // if (name === ComponentName.BoxComponent) {
  //   return (
  //     <div style={style as CSSProperties} key={id}>
  //       {schema.children?.map((ch) => {
  //         return renderJsonSchema(ch)
  //       })}
  //     </div>
  //   )
  // }
  const components = {
    TextComponent,
    ImageComponent,
    VideoComponent,
    AudioComponent,
    BoxComponent
  }
  const RenderComponent = components[name]
  return <RenderComponent style={style} id={id} data={data ?? null} />
}

export default renderJsonSchema
