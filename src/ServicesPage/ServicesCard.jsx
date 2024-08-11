import { Services } from './Components/Services.jsx'
import { CartForDesk } from './Components/CartForDesk.jsx'
import { CartForMobile } from './Components/CartForMobile.jsx'
import { UseCart } from '../hooks/UseCart.js'
import { useState, useEffect } from 'react'
import { Slider } from './Components/Slider.jsx'
import './ServicesCard.css'

export default function ServicesCard () {

  const listOfServices = [
    {
      id: 1,
      name: 'corte de cabello',
      price: '20000',
      category: 'Cortes',
      description: 'Renueva tu estilo con un corte de cabello moderno y profesional que se adapta a tus gustos y necesidades.',
      duration: 30, // minutos
      personnel: [
        { name: 'Juan Pérez', thumbnail: 'url/to/juan-thumbnail.jpg' },
        { name: 'María Gómez', thumbnail: 'url/to/maria-thumbnail.jpg' },
        { name: 'Lucia jaramillo', thumbnail: 'url/to/maria-thumbnail.jpg' }
      ]
    },
    {
      id: 2,
      name: 'Corte de Barba',
      price: '15000',
      category: 'Cortes',
      description: 'Dale forma y definición a tu barba con un corte preciso y cuidado que resalta tu mejor versión.',
      duration: 20, // minutos
      personnel: [
        { name: 'Carlos Ruiz', thumbnail: 'url/to/carlos-thumbnail.jpg' }
      ]
    },
    {
      id: 3,
      name: 'corte de cabello y barba',
      price: '30000',
      category: 'Cortes',
      description: 'Obtén un look completo con un corte de cabello y barba que te dejará impecable y a la moda.',
      duration: 45, // minutos
      personnel: [
        { name: 'Juan Pérez', thumbnail: 'url/to/juan-thumbnail.jpg' },
        { name: 'Carlos Ruiz', thumbnail: 'url/to/carlos-thumbnail.jpg' }
      ]
    },
    {
      id: 4,
      name: 'manicure',
      price: '15000',
      category: 'Manicure',
      description: 'Embellece tus manos con una manicure que incluye corte, limado y cuidado de cutículas para un acabado perfecto.',
      duration: 30, // minutos
      personnel: [
        { name: 'Ana López', thumbnail: 'url/to/ana-thumbnail.jpg' },
        { name: 'Laura Martínez', thumbnail: 'url/to/laura-thumbnail.jpg' }
      ]
    },
    {
      id: 5,
      name: 'manicure con esmalte permanente',
      price: '20000',
      category: 'Manicure',
      description: 'Disfruta de unas uñas perfectas por más tiempo con nuestro esmalte permanente de alta calidad.',
      duration: 40, // minutos
      personnel: [
        { name: 'Ana López', thumbnail: 'url/to/ana-thumbnail.jpg' }
      ]
    },
    {
      id: 6,
      name: 'manicure con diseño',
      price: '25000',
      category: 'Manicure',
      description: 'Exprésate con estilo a través de un diseño único en tus uñas, realizado por nuestros expertos.',
      duration: 45, // minutos
      personnel: [
        { name: 'Laura Martínez', thumbnail: 'url/to/laura-thumbnail.jpg' }
      ]
    },
    {
      id: 7,
      name: 'pedicure',
      price: '20000',
      category: 'Pedicure',
      description: 'Cuida tus pies con un pedicure completo que incluye exfoliación, corte de uñas y tratamiento de cutículas.',
      duration: 40, // minutos
      personnel: [
        { name: 'Carlos Ruiz', thumbnail: 'url/to/carlos-thumbnail.jpg' }
      ]
    },
    {
      id: 8,
      name: 'pedicure con masaje',
      price: '25000',
      category: 'Pedicure',
      description: 'Relájate y disfruta de un pedicure que incluye un masaje revitalizante para tus pies.',
      duration: 50, // minutos
      personnel: [
        { name: 'Carlos Ruiz', thumbnail: 'url/to/carlos-thumbnail.jpg' },
        { name: 'Laura Martínez', thumbnail: 'url/to/laura-thumbnail.jpg' }
      ]
    },
    {
      id: 9,
      name: 'limpieza facial',
      price: '30000',
      category: 'Faciales',
      description: 'Purifica y renueva tu piel con una limpieza facial profunda que elimina impurezas y células muertas.',
      duration: 30, // minutos
      personnel: [
        { name: 'Ana López', thumbnail: 'url/to/ana-thumbnail.jpg' }
      ]
    },
    {
      id: 10,
      name: 'mascarilla hidratante',
      price: '20000',
      category: 'Faciales',
      description: 'Hidrata y nutre tu piel con una mascarilla rica en nutrientes que deja tu rostro radiante.',
      duration: 20, // minutos
      personnel: [
        { name: 'Laura Martínez', thumbnail: 'url/to/laura-thumbnail.jpg' }
      ]
    },
    {
      id: 11,
      name: 'depilación de cejas',
      price: '15000',
      category: 'Depilación',
      description: 'Define y realza la forma de tus cejas con una depilación precisa y profesional.',
      duration: 15, // minutos
      personnel: [
        { name: 'Ana López', thumbnail: 'url/to/ana-thumbnail.jpg' }
      ]
    },
    {
      id: 12,
      name: 'depilación de piernas',
      price: '35000',
      category: 'Depilación',
      description: 'Disfruta de unas piernas suaves y libres de vello con nuestro servicio de depilación profesional.',
      duration: 45, // minutos
      personnel: [
        { name: 'Ana López', thumbnail: 'url/to/ana-thumbnail.jpg' }
      ]
    },
    {
      id: 13,
      name: 'masaje relajante',
      price: '40000',
      category: 'Masajes',
      description: 'Libera el estrés y la tensión con un masaje relajante que revitaliza tu cuerpo y mente.',
      duration: 60, // minutos
      personnel: [
        { name: 'Carlos Ruiz', thumbnail: 'url/to/carlos-thumbnail.jpg' }
      ]
    },
    {
      id: 14,
      name: 'masaje descontracturante',
      price: '45000',
      category: 'Masajes',
      description: 'Alivia los músculos tensos y contracturados con un masaje profundo y terapéutico.',
      duration: 75, // minutos
      personnel: [
        { name: 'Carlos Ruiz', thumbnail: 'url/to/carlos-thumbnail.jpg' }
      ]
    }
  ]
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
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
            windowWidth <= 768 ? (
              <CartForMobile
                fail={fail}
                formatPrice={formatPrice}
                removeFromCart={removeFromCart}
                cart={cart}
              />
            ) : (
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
