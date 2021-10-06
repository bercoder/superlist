import { useEffect, useState } from 'react'
import { iList } from './types'
import api from './api'

export const useList = () => {
  const [list, setList] = useState<iList[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    api
      .get()
      .then(setList)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    api
      .save(list)
  }, [list])

  const add = (product: iList['product']): number => {
    const exist = list.find(item => item.product.toLowerCase() === product.toLowerCase())
    if (exist) {
      return exist.id
    }

    setList([...list, {
      id: Date.now(),
      product,
      quantity: 1,
      completed: null
    }])

    return -1
  }

  const remove = (id: iList['id']) => {
    setList(list.filter(item => item.id !== id))
  }

  const toggle = (id: iList['id']) => {
    setList(list.map(item => item.id === id 
      ? {
        ...item,
        completed: item.completed === null ? new Date() : null
      }
      : item))
  }

  const edit = (id: iList['id'], quantity: iList['quantity']) => {
    setList(list.map(item => item.id === id 
      ? {
        ...item,
        quantity
      }
      : item))
  }

  return {
    list,
    loading,
    edit,
    add,
    remove,
    toggle
  }
}