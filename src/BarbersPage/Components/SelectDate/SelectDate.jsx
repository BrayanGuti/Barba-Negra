import { useState, useEffect } from 'react'
import { addDays } from 'date-fns'
import './SelectDate.css'
import './SelectDateMobile.css'

export function SelectDate ({ cart, handleHoursSelection, barber, setBarber }) {
  const reservations = barber.reserved_hours

  const spanishMonths = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [selectedHour, setSelectedHour] = useState(null)
  const [selectedInterval, setSelectedInterval] = useState(null)
  const [dateArray, setDateArray] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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

  const handleCloseAside = () => {
    const asideElemnt = document.querySelector('.aside')
    asideElemnt.classList.add('close-aside')
    setTimeout(() => { setBarber(null) }, 400)
  }

  return (
    <>
      {
            windowWidth <= 768
              ? (
                <aside className='aside'>
                  <svg
                    className='close-icon' onClick={handleCloseAside}
                    xmlns='http://www.w3.org/2000/svg'
                    x='0px'
                    y='0px'
                    width='30'
                    height='30'
                    viewBox='0 0 256 256'
                    fill='#777474'
                    fillRule='nonzero'
                    stroke='none'
                    strokeWidth='1'
                    strokeLinecap='butt'
                    strokeLinejoin='miter'
                    strokeMiterlimit='10'
                    fontFamily='none'
                    fontWeight='none'
                    fontSize='none'
                    textAnchor='none'
                    style={{ mixBlendMode: 'normal' }}
                  >
                    <g transform='scale(5.12,5.12)'>
                      <path d='M9.15625,6.3125l-2.84375,2.84375l15.84375,15.84375l-15.9375,15.96875l2.8125,2.8125l15.96875,-15.9375l15.9375,15.9375l2.84375,-2.84375l-15.9375,-15.9375l15.84375,-15.84375l-2.84375,-2.84375l-15.84375,15.84375z' />
                    </g>
                  </svg>
                  <section className='aside-content'>
                    <h2 className='title'>Selecciona tu fecha y hora con </h2>
                    <h2 className='title-barber'>{barber.name}</h2>
                    {selectedDate && <h3 className='titulo3-SelecDate'>{spanishMonths[selectedDate.month]}</h3>}
                    <div className='all-days'>
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
                </aside>
                )
              : (
                <section className='shift-left-date'>
                  <h2>Selecciona tu fecha y hora con </h2>
                  <h2 className='barber-name'>{barber.name}</h2>
                  {selectedDate && <h3 className='titulo3-SelecDate'>{spanishMonths[selectedDate.month]}</h3>}
                  <div className='all-days'>
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
    </>

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
    reservation => reservation.day === selectedDate.day && (reservation.month - 1) === selectedDate.month
  )

  const notAvailableReservations = selectedDayReservations ? selectedDayReservations.Reservations : []
  console.log(notAvailableReservations)
  const serviceDuration = cart.duration

  const timeSlots = generateTimeSlots(serviceDuration, notAvailableReservations)

  const hoursOptions = Array.from(new Set(timeSlots.map(slot => slot[0]))).map(hour => (
    <option key={hour} value={hour}>{`${String(hour).padStart(2, '0')}:00`}</option>
  ))

  const intervalsOptions = timeSlots.find(slot => slot[0] === selectedHour)?.[1] || []

  return (
    <div className='hours'>
      <h4>Horas disponibles</h4>
      {timeSlots.length > 0
        ? (
          <>
            <h3 className='titulo3-SelecDate'>Selecciona la hora de tu cita</h3>
            <div className='select-container'>
              <select id='hour-select' onChange={handleHourChange} value={selectedHour || ''}>
                <option value='' disabled>-- Selecciona una hora --</option>
                {hoursOptions}
              </select>

              <select disabled={!selectedHour} id='interval-select' onChange={handleIntervalChange} value={selectedInterval || ''}>
                <option value='' disabled>-- Selecciona un intervalo --</option>
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
