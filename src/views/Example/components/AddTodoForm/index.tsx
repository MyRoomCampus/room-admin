import React from 'react'
import { useState } from 'react'

type AddTodoFormProps = {
  addTodo: (text: string) => void
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ addTodo }) => {
  const [text, setText] = useState('')

  return (
    <form>
      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value)
        }}
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault()
          addTodo(text)
          setText('')
        }}
      >
        Add Todo
      </button>
    </form>
  )
}
