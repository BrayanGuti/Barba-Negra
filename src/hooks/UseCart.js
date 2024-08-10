import { useState } from 'react'

export function UseCart () {
  const [cart, setCart] = useState([])
  const [fail, setFail] = useState(false)

  const formatPrice = (price) => {
    return '$' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  const addToCart = (product) => {
    setCart(prevCart => {
      const categoryExists = prevCart.some(item => item.category === product.category)

      if (categoryExists) {
        setFail(true)
        setTimeout(() => setFail(false), 2500)
        return prevCart
      } else {
        return [...prevCart, product]
      }
    })
  }

  const removeFromCart = (product) => {
    const newCart = structuredClone(cart)
    return setCart(newCart.filter(item => item.id !== product.id))
  }

  return { fail, addToCart, removeFromCart, cart, formatPrice }
}
