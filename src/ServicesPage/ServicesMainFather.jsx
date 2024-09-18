import { Services } from './Components/Servicess/Services.jsx'
import { CartForDesk } from './Components/CartForDesk/CartForDesk.jsx'
import { CartForMobile } from './Components/CartForMobile/CartForMobile.jsx'
import { UseCart } from './Hooks/UseCart.js'
import { useServices } from './Hooks/useBack.js'
import { useState, useEffect } from 'react'
import { Slider } from './Components/Slider/Slider.jsx'
import { Link } from 'react-router-dom'
import './ServicesMainFather.css'

export function ServicesMainFather () {
  const { data, loading, error } = useServices()

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const { fail, addToCart, cart, removeFromCart, formatPrice } = UseCart()

  // Mostrar un mensaje de carga o error antes de continuar con el renderizado
  if (loading) {
    return <div>Cargando servicios...</div>
  }

  if (error) {
    return <div>Error al cargar servicios: {error}</div>
  }

  // Asegurarse de que los datos existan antes de manipularlos
  const groupedServices = data?.reduce((acc, service) => {
    if (!acc[service.category.name]) {
      acc[service.category.name] = []
    }
    acc[service.category.name].push(service)
    return acc
  }, {}) || {}

  const categories = Object.keys(groupedServices)

  return (
    <section id="Services" className="Services">
        <div className="container">
          <Link to="/">
            <svg className="back-arrow icon" viewBox="0 0 1024 1024" fill="#262626" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#262626"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z" fill=""></path></g></svg>
          </Link>
          <h2 className="h2">Servicios</h2>
        </div>

    <div className='services-container'>
      <>
        <Slider categories={categories} />
        <Services
          formatPrice={formatPrice}
          removeFromCart={removeFromCart}
          cart={cart}
          addToCart={addToCart}
          groupedServices={groupedServices}
        />

        {windowWidth <= 768
          ? (
            <CartForMobile
              fail={fail}
              formatPrice={formatPrice}
              removeFromCart={removeFromCart}
              cart={cart}
            />
            )
          : (
            <CartForDesk
              fail={fail}
              formatPrice={formatPrice}
              removeFromCart={removeFromCart}
              cart={cart}
            />
            )}
      </>
    </div>
    </section>
  )
}
