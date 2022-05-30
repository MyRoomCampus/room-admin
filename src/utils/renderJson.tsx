import React, { CSSProperties } from 'react'
import { useDrag } from 'react-dnd'
import { ComponentName, ComponentSchema } from '../types/lowCodeComp.type'

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

const RenderJsonSchema: React.FC<{ schema: ComponentSchema }> = ({ schema }) => {
  const { name, data, style, id } = schema
  const [, drag] = useDrag(
    () => ({
      type: name === ComponentName.BoxComponent ? 'container' : name.toLowerCase().slice(0, name.length - 9),
      item: { schema }
    }),
    [schema]
  )

  if (name === ComponentName.BoxComponent) {
    return (
      <div ref={drag} style={style as CSSProperties} key={id}>
        {schema.children?.map((ch) => {
          return <RenderJsonSchema schema={ch} key={ch.id} />
        })}
      </div>
    )
  }
  const components = {
    TextComponent,
    ImageComponent,
    VideoComponent,
    AudioComponent
  }
  const RenderComponent = components[name]
  return (
    <div ref={drag}>
      <RenderComponent style={style} id={id} data={data ?? null} />
    </div>
  )
}

export default RenderJsonSchema
