import './SelectBarber.css'
import React, { useEffect, useState } from 'react'
import { SelectDate } from '../../Components/SelectDate/SelectDate'

export function SelectBarber ({ cart, handleHoursSelection, setBarber, barber }) {
  const [isSingle, setIsSingle] = useState(false)

  const handleBarberSelection = (person) => {
    setBarber(person)
  }

  useEffect(() => {
    if (cart.personnel.length === 1) {
      setIsSingle(true)
    } else {
      setIsSingle(false)
    }
  }, [cart.personnel.length]) //

  return (
    <div className='main-container'>
      <div className={`shadow-container ${barber ? 'shift-left' : ''}`}>
        <section className={`barbersGalery ${isSingle ? 'single' : ''}`}>
          {cart.personnel.map((person, index) => (
            <img
              key={index}
              onClick={() => handleBarberSelection(person)}
              className='barbersGalery-thubmnail'
              src={person.thumbnail_url}
              alt={person.name}
            />
          ))}
        </section>
      </div>
      {barber && (
        <SelectDate
          setBarber={setBarber}
          handleHoursSelection={handleHoursSelection}
          cart={cart}
          barber={barber}
        />
      )}
    </div>
  )
}
