import React, { useState } from 'react'
import { getItem } from '../../contexts/LocalStorageFuncs'

 const Cart = () => {
    const [data, setData] = useState( getItem('carrinhoBf') || [])
  return (
    <div>
        <h1>Carrinho</h1>
        <div>
            {
                data.map((e) => (
                    <div key={e.id}>
                        <h4>{e.title}</h4>
                        <h4>${e.price}</h4>
                        <img src={e.thumbnail} alt={e.title} />
                    </div>
                ))
            }
        </div>
    </div>
  )
}
 export default Cart;
