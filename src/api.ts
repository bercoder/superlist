import { iList } from './types'

interface Response {
  status: number
  message: string
}

export default {
  get: (): Promise<iList[]> => new Promise((resolve, reject) => {
    const list = window.localStorage.getItem('superlist')
    setTimeout(() => resolve(list ? JSON.parse(list) : []), 1000)
}),
  save: (list: iList[]): Promise<Response> => new Promise((resolve, reject) => {
    window.localStorage.setItem('superlist', JSON.stringify(list))
    setTimeout(() => resolve({
      status: 201,
      message: 'created',
    }), 1000)
  })
}