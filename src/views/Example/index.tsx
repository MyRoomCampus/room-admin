import React from 'react'
import { AddTodoForm } from './components/AddTodoForm'
import TodoItem from './components/TodoItem'
import useTodoList from './hooks/useTodoList'

const TodoList: React.FC = () => {
  const [todos, { addTodo, deleteCompleted, toggleTodo }] = useTodoList([])

  return (
    <>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
      <AddTodoForm addTodo={addTodo} />
      <button onClick={deleteCompleted}>删除选中</button>
    </>
  )
}

export default TodoList
