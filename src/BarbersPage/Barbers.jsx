import { useEffect, useState } from 'react';
import './Barbers.css';

export default function Barbers() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'))
    setCart(storedCart)
  }, [])

  return (
    <h1>hola pepe</h1>
  )
}
