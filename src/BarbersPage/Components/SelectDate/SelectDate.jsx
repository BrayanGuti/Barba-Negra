import { useState, useEffect } from 'react'
import { addDays } from 'date-fns'
import './SelectDate.css'

export function SelectDate ({ cart, handleHoursSelection, barber }) {
  const reservations = [
    {
      day: 17,
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
      day: 18,
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
      day: 19,
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
      day: 20,
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
      day: 21,
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
      day: 22,
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

  const [selectedHour, setSelectedHour] = useState(null)
  const [selectedInterval, setSelectedInterval] = useState(null)
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
    setSelectedHour(null)
    setSelectedInterval(null)
  }

  return (
      <section className="shift-left-date">
        <h2>Selecciona tu fecha y hora con </h2>
        <h2 className='barber-name'>{barber.name}</h2>
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
            setSelectedInterval={setSelectedInterval}
            selectedInterval={selectedInterval}
            selectedHour={selectedHour}
            setSelectedHour={setSelectedHour}
          />
        )}
      </section>
  )
}

function SelectedHour ({ cart, selectedDate, reservations, handleHoursSelection, setSelectedHour, selectedHour, setSelectedInterval, selectedInterval }) {
  const handleHourChange = (event) => {
    const hour = parseInt(event.target.value, 10)
    setSelectedHour(hour)
    setSelectedInterval(null)
  }

  const handleIntervalChange = (event) => {
    const interval = event.target.value
    setSelectedInterval(interval)
  }

  const selectedDayReservations = reservations.find(
    reservation => reservation.day === selectedDate.day && reservation.month === selectedDate.month
  )

  const notAvailableReservations = selectedDayReservations ? selectedDayReservations.Reservations : []
  const serviceDuration = cart.duration

  const timeSlots = generateTimeSlots(serviceDuration, notAvailableReservations)

  const hoursOptions = Array.from(new Set(timeSlots.map(slot => slot[0]))).map(hour => (
    <option key={hour} value={hour}>{`${String(hour).padStart(2, '0')}:00`}</option>
  ))

  const intervalsOptions = timeSlots.find(slot => slot[0] === selectedHour)?.[1] || []

  return (
    <div className="hours">
      <h4>Horas disponibles</h4>
      {timeSlots.length > 0
        ? (
        <>
          <h3>Selecciona la hora de tu cita</h3>
          <div className="select-container">
            <select id="hour-select" onChange={handleHourChange} value={selectedHour || ''}>
              <option value="" disabled>-- Selecciona una hora --</option>
              {hoursOptions}
            </select>

            <select disabled={!selectedHour} id="interval-select" onChange={handleIntervalChange} value={selectedInterval || ''}>
              <option value="" disabled>-- Selecciona un intervalo --</option>
              {intervalsOptions.map((interval, index) => (
                <option key={index} value={[interval.start, interval.end]}>{`${interval.start} - ${interval.end}`}</option>
              ))}
            </select>

            <button
              onClick={() => selectedInterval && handleHoursSelection({ setSelectedInterval, selectedDate, selectedInterval })}
              disabled={!selectedInterval}
            >
              Confirmar Hora
            </button>
          </div>
        </>
          )
        : (
        <p>No hay horas disponibles</p>
          )}
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
  const timeSlots = {}

  for (let i = startMinutes; i + serviceDuration <= endMinutes; i += serviceDuration) {
    const slotStart = i
    const slotEnd = i + serviceDuration

    const isAvailable = notAvailableReservations.every(reservation => {
      const reservationStart = timeToMinutes(reservation.start)
      const reservationEnd = timeToMinutes(reservation.end)
      return slotEnd <= reservationStart || slotStart >= reservationEnd
    })

    if (isAvailable) {
      const hour = Math.floor(slotStart / 60)
      if (!timeSlots[hour]) {
        timeSlots[hour] = []
      }
      timeSlots[hour].push({
        start: minutesToTime(slotStart),
        end: minutesToTime(slotEnd)
      })
    }
  }

  return Object.keys(timeSlots).map(hour => [parseInt(hour, 10), timeSlots[hour]])
}
