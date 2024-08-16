import './SelectBarber.css'
import { SelectDate } from '../../Components/SelectDate/SelectDate'
import { useState } from 'react'

export function SelectBarber ({ cart, handleHoursSelection }) {
  const [barber, setBarber] = useState(null)

  const handleBarberSelection = (person) => {
    setBarber(person)
  }

  return (
    <div className="main-container">
      <section className='barber-galery'>
        {cart.personnel.map((person, index) => (
          <div onClick={() => handleBarberSelection(person)} className='barber-container' key={index}>
            <img src='https://i.pinimg.com/736x/63/8b/7f/638b7f45b88a0b0ec5e913b47a031deb.jpg' alt={person.name} />
            <p>{person.name}</p>
          </div>
        ))}
      </section>
      {barber && (
        <SelectDate
          handleHoursSelection={handleHoursSelection}
          cart={cart}
          barber={barber}
        />
      )}
    </div>
  )
}
