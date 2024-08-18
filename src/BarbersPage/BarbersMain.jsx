import { useState, useEffect, useRef } from 'react'
import { AppointmentScheduler } from './Components/AppointmentScheduler/AppointmentScheduler'
import './BarbersMain.css'

export default function Barbers () {
  const [cart, setCart] = useState([])
  const [selectedCartIndex, setSelectedCartIndex] = useState(0)
  const [lastServicePage, setLastServicePage] = useState(0)
  const [barber, setBarber] = useState(null)
  const allServicesInformation = useRef()

  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem('cart')) || []
      setCart(savedCart)
    } catch (error) {
      console.log('Error al obtener el carrito del localStorage:', error)
      setCart([])
    }
  }, [])

  const handleHoursSelection = ({ setSelectedInterval, selectedDate, selectedInterval }) => {
    allServicesInformation.current = {
      ...allServicesInformation.current,
      [cart[selectedCartIndex].name]: {
        barber: barber.name,
        selectedDate,
        selectedInterval
      }
    }
    console.log(allServicesInformation.current)

    setSelectedInterval(false)
    setBarber(null)
    setLastServicePage(selectedCartIndex + 1)
    if (selectedCartIndex < cart.length - 1) {
      return setSelectedCartIndex(selectedCartIndex + 1)
    }

    handleServicesSelection(selectedCartIndex)

    console.log('Cita agendada')
  }

  const handleServicesSelection = (index) => {
    if (lastServicePage >= index) {
      setBarber(null)
      setSelectedCartIndex(index)
    }
  }

  return (
    <>
      {cart.length > 0 && (
        <>
          <ServicesPages
            lastServicePage={lastServicePage}
            selectedCartIndex={selectedCartIndex}
            cart={cart}
            handleServicesSelection={handleServicesSelection}
          />

          <AppointmentScheduler
            barber={barber}
            setBarber={setBarber}
            cart={cart[selectedCartIndex]}
            handleHoursSelection={handleHoursSelection}
          />
        </>
      )}
    </>
  )
}

function ServicesPages ({ cart, handleServicesSelection, lastServicePage, selectedCartIndex }) {
  return (
    <div className="all-pages">
      {cart.map((item, index) => (
        <button
          className={`cart-pages ${selectedCartIndex === index ? 'selected' : ''}`}
          key={index}
          onClick={() => handleServicesSelection(index)}
        >
          {lastServicePage > index ? '✅' : ''} {item.name}
        </button>
      ))}
    </div>
  )
}
