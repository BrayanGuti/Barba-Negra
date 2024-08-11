import { useEffect, useState } from 'react';
import './Barbers.css';

export default function Barbers() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'))
    setCart(storedCart)
  }, [])
  
  return (
    <>
    {cart && cart.length > 0 && Selection(cart[0])}
    </>
  );
  
}


function Selection (cart) {
  return (
    <>
      <h1>¿Quién le gustaría que se encargara de su servicio de {cart.name}?</h1>
      <div className='main-container'>
        <section className='barber-galery'>
          {cart.personnel.map((person, index) => (
            <div className='barber-container' key={index}>
              <img src='https://i.pinimg.com/736x/63/8b/7f/638b7f45b88a0b0ec5e913b47a031deb.jpg' alt={person.name}/>
              <p>{person.name}</p>
            </div>
          ))}
        </section>

        <section>
          <h2>futuro</h2>
        </section>
      </div>
    </>
  );
}