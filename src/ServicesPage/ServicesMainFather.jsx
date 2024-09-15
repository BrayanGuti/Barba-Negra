import { Services } from './Components/Servicess/Services.jsx'
import { CartForDesk } from './Components/CartForDesk/CartForDesk.jsx'
import { CartForMobile } from './Components/CartForMobile/CartForMobile.jsx'
import { UseCart } from './Hooks/UseCart.js'
import { useServices } from './Hooks/useBack.js'
import { useState, useEffect } from 'react'
import { Slider } from './Components/Slider/Slider.jsx'
import './ServicesMainFather.css'

export default function ServicesMainFather () {
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
    <div className="services-container">
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
  )
}
