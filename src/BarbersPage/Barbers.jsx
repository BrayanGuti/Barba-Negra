import { useEffect, useState } from 'react'
import { addDays } from 'date-fns'
import './Barbers.css'

export default function Barbers () {
  const [cart, setCart] = useState([])

  const reservations = [
    {
      day: 11,
      month: 7,
      Reservations: [
        { start: '09:00', end: '09:30' },
        { start: '10:00', end: '10:45' },
        { start: '11:00', end: '11:30' },
        { start: '12:00', end: '12:50' },
        { start: '14:00', end: '14:30' },
        { start: '15:00', end: '15:50' },
        { start: '16:00', end: '16:45' }
      ]
    },
    {
      day: 12,
      month: 7,
      Reservations: [
        { start: '09:15', end: '09:45' },
        { start: '10:30', end: '11:20' },
        { start: '12:00', end: '12:30' },
        { start: '13:00', end: '13:40' },
        { start: '15:00', end: '15:30' },
        { start: '16:00', end: '16:50' }
      ]
    },
    {
      day: 13,
      month: 7,
      Reservations: [
        { start: '09:00', end: '09:30' },
        { start: '10:00', end: '10:50' },
        { start: '11:00', end: '11:30' },
        { start: '12:00', end: '12:40' },
        { start: '14:00', end: '14:50' },
        { start: '15:30', end: '16:00' }
      ]
    },
    {
      day: 14,
      month: 7,
      Reservations: [
        { start: '09:30', end: '10:00' },
        { start: '10:30', end: '11:20' },
        { start: '12:00', end: '12:45' },
        { start: '13:00', end: '13:30' },
        { start: '14:00', end: '14:50' },
        { start: '15:00', end: '15:30' },
        { start: '16:00', end: '16:50' }
      ]
    },
    {
      day: 15,
      month: 7,
      Reservations: [
        { start: '09:00', end: '09:40' },
        { start: '10:00', end: '10:50' },
        { start: '11:00', end: '11:30' },
        { start: '12:00', end: '12:50' },
        { start: '13:30', end: '14:00' },
        { start: '15:00', end: '15:40' },
        { start: '16:00', end: '16:30' }
      ]
    },
    {
      day: 16,
      month: 7,
      Reservations: [
        { start: '09:00', end: '09:30' },
        { start: '10:00', end: '10:50' },
        { start: '11:00', end: '11:30' },
        { start: '12:00', end: '12:40' },
        { start: '14:00', end: '14:50' },
        { start: '15:30', end: '16:00' }
      ]
    }
  ]

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'))
    setCart(storedCart)
  }, [])

  return (
    <>
      {cart && cart.length > 0 && <Selection cart={cart[0]} reservations={reservations} />}
    </>
  )
}

function Selection ({ cart, reservations }) {
  const now = new Date()
  const today = now
  const futureDate = addDays(today, 5)

  const generateDateArray = (startDate, endDate) => {
    const dates = []
    let currentDate = startDate

    while (currentDate <= endDate) {
      dates.push({
        day: currentDate.getDate(),
        month: currentDate.getMonth()
      })
      currentDate = addDays(currentDate, 1)
    }

    return dates
  }

  const dateArray = generateDateArray(today, futureDate)

  const [selectedDate, setSelectedDate] = useState(dateArray[0])

  const handleSelectedDay = (date) => {
    setSelectedDate(date)
  }

  return (
    <>
      <h1>¿Quién le gustaría que se encargara de su servicio de {cart.name}?</h1>
      <div className='main-container'>
        <section className='barber-galery'>
          {cart.personnel.map((person, index) => (
            <div className='barber-container' key={index}>
              <img src='https://i.pinimg.com/736x/63/8b/7f/638b7f45b88a0b0ec5e913b47a031deb.jpg' alt={person.name} />
              <p>{person.name}</p>
            </div>
          ))}
        </section>
        <SelcetDate selectedDate={selectedDate} dateArray={dateArray} handleSelectedDay={handleSelectedDay} reservations={reservations} />
      </div>
    </>
  )
}

function SelcetDate ({ selectedDate, dateArray, handleSelectedDay, reservations }) {
  const spanishMonths = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ]

  return (
    <section>
      <h2>Selecciona tu fecha y hora</h2>
      <h3>{spanishMonths[selectedDate.month]}</h3>
      {dateArray.map((date, index) => (
        <button
          onClick={() => handleSelectedDay(date)}
          className={`days ${selectedDate && selectedDate.day === date.day ? 'selected-day' : ''}`}
          key={index}
        >
          {date.day}
        </button>
      ))}

      <div className='hours'>
        <SelectedHour selectedDate={selectedDate} reservations={reservations} />
      </div>
    </section>
  )
}

function SelectedHour ({ selectedDate, reservations }) {
  const selectedDayReservations = reservations.find(
    reservation => reservation.day === selectedDate.day && reservation.month === selectedDate.month
  )

  const notAvailableReservations = selectedDayReservations ? selectedDayReservations.Reservations : []

  return (
    <div>
      <h4>Horas disponibles</h4>
      <ul>
        {notAvailableReservations.map((reservation, index) => (
          <li key={index}>
            {reservation.start} - {reservation.end}
          </li>
        ))}
      </ul>
    </div>
  )
}
