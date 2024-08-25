import { useState, useEffect, useRef } from 'react'
import { AppointmentScheduler } from './Components/AppointmentScheduler/AppointmentScheduler'
import './BarbersMain.css'

export default function Barbers () {
  const [cart, setCart] = useState([])
  const [selectedCartIndex, setSelectedCartIndex] = useState(0)
  const [lastServicePage, setLastServicePage] = useState(0)
  const [barber, setBarber] = useState(null)
  const [serviceChangeNotification, setServiceChangeNotification] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const allServicesInformation = useRef({})

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || []
    setCart(savedCart)
  }, [])

  const handleHoursSelection = ({ setSelectedInterval, selectedDate, selectedInterval }) => {
    const currentService = cart[selectedCartIndex]?.name

    if (allServicesInformation.current[currentService]) {
      setServiceChangeNotification(true)
      setTimeout(() => setShowNotification(true), 1)
      setTimeout(() => setShowNotification(false), 2500)
      setTimeout(() => setServiceChangeNotification(false), 3000)
    }

    allServicesInformation.current = {
      ...allServicesInformation.current,
      [currentService]: {
        barber: barber?.name,
        selectedDate,
        selectedInterval
      }
    }
    setSelectedInterval(false)
    setBarber(null)
    setLastServicePage(selectedCartIndex + 1)
    if (selectedCartIndex < cart.length - 1) {
      setSelectedCartIndex(selectedCartIndex + 1)
    } else {
      handleServicesSelection(selectedCartIndex)
      console.log('Cita agendada')
    }
  }

  const handleServicesSelection = (index) => {
    if (lastServicePage >= index) {
      setBarber(null)
      setSelectedCartIndex(index)
    }
  }

  return (
    <>
      {serviceChangeNotification && (
        <div className={showNotification ? 'notification show' : 'notification'}>
          Su cita se ha cambiado con exito
        </div>
      )}
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
