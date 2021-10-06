import React from 'react'

interface Form extends HTMLFormElement {
  product: HTMLInputElement
}

type Props = {
  add: (product: string) => boolean
}

export const NewItem: React.FC<Props> = ({ add }) => {
  const [message, setMessage] = React.useState<string>('')
  const handleSubmit = (e: React.ChangeEvent<Form>) => {
    e.preventDefault()
    const value = e.target.product.value
    if (!value) {
      setMessage(`Product cannot be empty`)
      setTimeout(() => setMessage(''), 2000)
      e.target.product.focus()
      return
    }
    const added = add(value)
    if (added) e.target.reset()
    else {
      e.target.product.focus()
      setMessage(`${value} already exists.`)
      setTimeout(() => setMessage(''), 2000)
    }
  }

  return (
    <>
      <h2>Add product</h2>
      <form onSubmit={handleSubmit}>
        <input autoFocus type="search" name="product" placeholder="Add a new product" />
        <button title="Add the product to the list">ADD</button>
      </form>
      <div className={`message ${message !== '' && 'show'}`}>{message}</div>
    </>
  )
}
