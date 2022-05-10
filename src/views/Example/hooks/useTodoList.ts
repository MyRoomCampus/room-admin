import { useArray } from '@/hooks/useArray'
import { TodoListItem } from '@//types/TodoListItem'
import { useCallback } from 'react'

const useTodoList = (
  initalList: TodoListItem[]
): [TodoListItem[], typeof todoActions] => {
  const [todoList, { push, update, filter }] = useArray(initalList)

  const toggleTodo = (item: TodoListItem) => {
    console.log(item)
    update(item, {
      id: item.id,
      text: item.text,
      complete: !item.complete
    })
    console.log(todoList)
  }

  const deleteCompleted = () => {
    filter((item) => !item.complete)
  }
  const todoActions = {
    addTodo: (text: string) =>
      push({
        text,
        id: todoList.length,
        complete: false
      }),
    deleteCompleted,
    toggleTodo
  }
  return [todoList, todoActions]
}

export default useTodoList
