import { SelectBarber } from '../../Components/SelectBarber/SelectBarber'
import './AppointmentScheduler.css'

export function AppointmentScheduler ({ cart, handleHoursSelection, setBarber, barber }) {
  return (
    <section className='All-Scheduler'>
      <h1>
        ¿Quién le gustaría que se encargara de su servicio de {cart.name}?
      </h1>

      <SelectBarber
        barber={barber}
        setBarber={setBarber}
        cart={cart}
        handleHoursSelection={handleHoursSelection}
      />

    </section>
  )
}
