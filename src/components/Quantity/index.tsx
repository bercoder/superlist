import { FC } from 'react'
import { iList } from '../../types'

type Props = {
  id: iList['id'];
  edit: (id: iList['id'], quantity: iList['quantity']) => void;
  qty: iList['quantity'];
}

export const Quantity: FC<Props> = ({ id, edit, qty }) => {
  const change = (v: boolean) => {
    if (v) {
      edit(id, qty + 1)
    } else {
      if (qty > 1) edit(id, qty - 1)
    }
  }

  return (
    <div className="quantity">
      <input type="text" value={qty} disabled/>
      <div className="buttons">
        <button title="Add a unit" onClick={() => change(true)}>+</button>
        <button title="Remove a unit" onClick={() => change(false)}>-</button>
      </div>
    </div>
  )
}