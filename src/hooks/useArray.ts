import { useState } from 'react'

// 封装了数组基本操作的hook
export const useArray = <T>(
  initialList: T[] = []
): [T[], typeof operations] => {
  const [list, set] = useState(initialList)

  const operations = {
    set,
    push: (item: T) => set((list) => [...list, item]),
    empty: () => set([]),
    filter: (filterFn: (item: T) => boolean) =>
      set((list) => list.filter(filterFn)),
    remove: (item: T) => {
      const index = list.indexOf(item)
      if (index < 0) {
        return
      }
      set((list) => [...list.slice(0, index), ...list.slice(index + 1)])
    },
    update: (oldItem: T, item: T) => {
      console.log(oldItem)
      const index = list.indexOf(oldItem)
      console.log(index)
      if (index < 0) {
        return
      }
      set((list) => [...list.slice(0, index), item, ...list.slice(index + 1)])
      console.log(list)
    },
    updateAt: (index: number, item: T) => {
      if (index < 0) {
        return
      }
      set((list) => [...list.slice(0, index), item, ...list.slice(index + 1)])
    },
    setAt: (index: number, value: T) =>
      set((list) => [...list.slice(0, index), value, ...list.slice(index + 1)]),
    removeAt: (index: number) =>
      set((list) => [...list.slice(0, index), ...list.slice(index + 1)]),
    map: (mapFn: (item: T) => T) => set((l) => [...l].map(mapFn))
  }

  return [list, operations]
}
