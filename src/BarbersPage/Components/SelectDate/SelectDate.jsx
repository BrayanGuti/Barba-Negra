import { useState, useEffect } from 'react'
import { addDays } from 'date-fns'
import './SelectDate.css'

export function SelectDate ({ cart, handleHoursSelection, barber }) {
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

  const spanishMonths = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  const [dateArray, setDateArray] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)

  useEffect(() => {
    const now = new Date()
    const futureDate = addDays(now, 5)

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

    const initialDateArray = generateDateArray(now, futureDate)
    setDateArray(initialDateArray)
    setSelectedDate(initialDateArray[0])
  }, [])

  const handleSelectedDay = (date) => {
    setSelectedDate(date)
  }

  return (
      <section>
        <h2>Selecciona tu fecha y hora con {barber.name}</h2>
        {selectedDate && <h3>{spanishMonths[selectedDate.month]}</h3>}
        <div className="all-days">
          {dateArray.map((date, index) => (
            <button
              onClick={() => handleSelectedDay(date)}
              className={`days ${selectedDate && selectedDate.day === date.day ? 'selected-day' : ''}`}
              key={index}
            >
              {date.day}
            </button>
          ))}
        </div>

        {selectedDate && (
          <SelectedHour
            handleHoursSelection={handleHoursSelection}
            cart={cart}
            selectedDate={selectedDate}
            reservations={reservations}
          />
        )}
      </section>
  )
}

function SelectedHour ({ cart, selectedDate, reservations, handleHoursSelection }) {
  const [selectedHour, setSelectedHour] = useState(null)

  const handleHourIsSelected = (slot) => {
    setSelectedHour(slot)
  }

  const selectedDayReservations = reservations.find(
    reservation => reservation.day === selectedDate.day && reservation.month === selectedDate.month
  )

  const notAvailableReservations = selectedDayReservations ? selectedDayReservations.Reservations : []
  const serviceDuration = cart.duration

  const timeSlots = generateTimeSlots(serviceDuration, notAvailableReservations)

  return (
    <div className="hours">
      <h4>Horas disponibles</h4>
      <div className="hours-available">
        {timeSlots.length > 0
          ? (
            <>
              {timeSlots.map((slot, index) => (
                <button
                  onClick={() => handleHourIsSelected(slot)}
                  key={index}
                  className={selectedHour && selectedHour.start === slot.start && selectedHour.end === slot.end ? 'selected-hour' : ''}
                >
                  {slot.start} - {slot.end}
                </button>
              ))}
              <button
                onClick={() => selectedHour && handleHoursSelection({ setSelectedHour })}
                disabled={!selectedHour}
              >
                Confirmar Hora
              </button>
            </>
            )
          : (
            <p>No hay horas disponibles</p>
            )
        }
      </div>
    </div>
  )
}

const generateTimeSlots = (serviceDuration, notAvailableReservations) => {
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }

  const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
  }

  const startMinutes = timeToMinutes('09:00')
  const endMinutes = timeToMinutes('19:00')
  const timeSlots = []

  for (let i = startMinutes; i + serviceDuration <= endMinutes; i += serviceDuration) {
    const slotStart = i
    const slotEnd = i + serviceDuration

    const isAvailable = notAvailableReservations.every(reservation => {
      const reservationStart = timeToMinutes(reservation.start)
      const reservationEnd = timeToMinutes(reservation.end)
      return slotEnd <= reservationStart || slotStart >= reservationEnd
    })

    if (isAvailable) {
      timeSlots.push({
        start: minutesToTime(slotStart),
        end: minutesToTime(slotEnd)
      })
    }
  }

  return timeSlots
}
