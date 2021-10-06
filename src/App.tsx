import { useState } from 'react'
import { NewItem } from './components/NewItem'
import { List } from './components/List'
import { useList } from './useList'
import { iList } from './types'

import './App.css'

function App() {
  const { loading, list, add, remove, toggle, edit } = useList()
  const [ animation, setAnimation] = useState<null|number>(null)

  const handleAdd = (product: iList['product']) => {
    const added = add(product)
    if (added > -1) {
      setAnimation(added)
      return false
    }
    return true
  }

  return (
    <main>
      <h1>Super<span>List</span></h1>
      {
        loading
        ? <p>Loading...</p>
        : <>
        <NewItem add={handleAdd}/>
        <List edit={edit} toggle={toggle} remove={remove} list={list} animate={animation} endAnimation={() => setAnimation(null)}/>
      </>}
    </main>
  )
}

export default App
