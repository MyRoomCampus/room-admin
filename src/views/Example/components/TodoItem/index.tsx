import React from 'react'
import { TodoListItem } from '@//types/TodoListItem'

type TodoItemProps = {
  todo: TodoListItem
  toggleTodo: (item: TodoListItem) => void
}
const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo }) => {
  return (
    <li>
      <label
        style={{ textDecoration: todo.complete ? 'line-through' : undefined }}
      >
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={() => toggleTodo(todo)}
        />{' '}
        {todo.text}
      </label>
    </li>
  )
}

export default TodoItem
