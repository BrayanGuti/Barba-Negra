import { Services } from './Components/Servicess/Services.jsx'
import { CartForDesk } from './Components/CartForDesk/CartForDesk.jsx'
import { CartForMobile } from './Components/CartForMobile/CartForMobile.jsx'
import { UseCart } from './Hooks/UseCart.js'
import { useState, useEffect } from 'react'
import { Slider } from './Components/Slider/Slider.jsx'
import './ServicesMainFather.css'

export default function ServicesMainFather () {
  const listOfServices = [
    {
      id: 1,
      name: 'Corte de Cabello',
      price: '25000',
      category: 'Cortes',
      description: 'Corte de cabello profesional adaptado a tu estilo.',
      duration: 30, // minutos
      personnel: [
        { name: 'Juan Pérez', thumbnail: 'url/to/juan-thumbnail.jpg' },
        { name: 'María Gómez', thumbnail: 'url/to/maria-thumbnail.jpg' }
      ]
    },
    {
      id: 2,
      name: 'Corte de Barba',
      price: '15000',
      category: 'Cortes',
      description: 'Corte de barba preciso que resalta tu estilo.',
      duration: 20, // minutos
      personnel: [
        { name: 'Carlos Ruiz', thumbnail: 'url/to/carlos-thumbnail.jpg' }
      ]
    },
    {
      id: 3,
      name: 'Combo Barba Negra',
      price: '35000',
      category: 'Cortes',
      description: 'Corte y mascarilla para una barba impecable.',
      duration: 45, // minutos
      personnel: [
        { name: 'Pedro Gómez', thumbnail: 'url/to/pedro-thumbnail.jpg' },
        { name: 'Laura Martínez', thumbnail: 'url/to/laura-thumbnail.jpg' }
      ]
    },
    {
      id: 4,
      name: 'Combo Pirata',
      price: '40000',
      category: 'Cortes',
      description: 'Corte, mascarilla y exfoliación para un look único.',
      duration: 60, // minutos
      personnel: [
        { name: 'Ana López', thumbnail: 'url/to/ana-thumbnail.jpg' },
        { name: 'Jorge García', thumbnail: 'url/to/jorge-thumbnail.jpg' }
      ]
    },
    {
      id: 5,
      name: 'Corte y Rayito',
      price: '150000',
      category: 'Cortes',
      description: 'Corte con rayito para un estilo audaz y moderno.',
      duration: 90, // minutos
      personnel: [
        { name: 'Clara Mendoza', thumbnail: 'url/to/clara-thumbnail.jpg' }
      ]
    },
    {
      id: 6,
      name: 'Peinados',
      price: '15000',
      category: 'Peinados',
      description: 'Peinados elegantes para cualquier ocasión.',
      duration: 30, // minutos
      personnel: [
        { name: 'Sara Ríos', thumbnail: 'url/to/sara-thumbnail.jpg' },
        { name: 'Laura Martínez', thumbnail: 'url/to/laura-thumbnail.jpg' }
      ]
    },
    {
      id: 7,
      name: 'Aminoácidos',
      price: '50000',
      category: 'Tratamientos Capilares',
      description: 'Tratamiento capilar con aminoácidos para fortalecer tu cabello.',
      duration: 60, // minutos
      personnel: [
        { name: 'Mario Ramírez', thumbnail: 'url/to/mario-thumbnail.jpg' }
      ]
    },
    {
      id: 8,
      name: 'Keratina',
      price: '50000',
      category: 'Tratamientos Capilares',
      description: 'Alisado con keratina para un cabello suave y brillante.',
      duration: 90, // minutos
      personnel: [
        { name: 'Sofía Gómez', thumbnail: 'url/to/sofia-thumbnail.jpg' }
      ]
    },
    {
      id: 9,
      name: 'Tintura',
      price: '50000',
      category: 'Tratamientos Capilares',
      description: 'Coloración capilar para un cambio de look espectacular.',
      duration: 120, // minutos
      personnel: [
        { name: 'Natalia Herrera', thumbnail: 'url/to/natalia-thumbnail.jpg' }
      ]
    },
    {
      id: 10,
      name: 'Decoloración',
      price: '200000',
      category: 'Tratamientos Capilares',
      description: 'Decoloración profesional para un look radical.',
      duration: 150, // minutos
      personnel: [
        { name: 'Carolina Suárez', thumbnail: 'url/to/carolina-thumbnail.jpg' }
      ]
    },
    {
      id: 11,
      name: 'Mascarilla + Exfoliante',
      price: '15000',
      category: 'Adicionales',
      description: 'Cuidado facial completo con mascarilla y exfoliante.',
      duration: 30, // minutos
      personnel: [
        { name: 'Luis Torres', thumbnail: 'url/to/luis-thumbnail.jpg' }
      ]
    },
    {
      id: 12,
      name: 'Pigmento de Barba',
      price: '15000',
      category: 'Adicionales',
      description: 'Pigmentación de barba para un look más definido.',
      duration: 25, // minutos
      personnel: [
        { name: 'Miguel Fernández', thumbnail: 'url/to/miguel-thumbnail.jpg' }
      ]
    },
    {
      id: 13,
      name: 'Depilación',
      price: '15000',
      category: 'Adicionales',
      description: 'Depilación profesional para una piel suave.',
      duration: 20, // minutos
      personnel: [
        { name: 'Andrea Luna', thumbnail: 'url/to/andrea-thumbnail.jpg' }
      ]
    }
  ]

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

  const groupedServices = listOfServices.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = []
    }
    acc[service.category].push(service)
    return acc
  }, {})

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

          {
            windowWidth <= 768
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
                )
          }
        </>

    </div>
  )
}
