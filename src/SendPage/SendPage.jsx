import React, { useState, useEffect } from 'react'
import './SendPage.css'
import { post } from './hooks/handleSubmit'

export function SendPage () {
  const [services, setServices] = useState({})
  const [userData, setUserData] = useState({ name: '', email: '', phone: '' })
  const [postResponse, setPostResponse] = useState(false)

  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem('services') || '{}')
    setServices(storedServices)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData(prevData => ({ ...prevData, [name]: value }))
  }

  const handlePhoneChange = (e) => {
    const { name, value } = e.target
    const phone = value
    const phonePattern = /^[0-9]{1,10}$/
    if (phonePattern.test(phone) || phone === '') {
      setUserData(prevData => ({ ...prevData, [name]: value }))
    }
  }

  async function handleSubmit (e) {
    await post(e, userData, services)
    setPostResponse(true)
    setTimeout(() => {
      setPostResponse(false)
      localStorage.removeItem('services')
      window.location.href = '/'
    }, 2000)
  }

  return (
    <>
      <div className='background'>
        <img className='logo' src='./LOGO.jpeg' alt='' />
        <h1 className='h1-sendPage'>Rellena con tu información</h1>
      </div>

      <div className='appointment-page'>
        <div className='service-item-sendPage '>
          {Object.entries(services).map(([service, details]) => (
            <div key={service} className='service-item'>
              <h2>{service}</h2>
              <p>Barber: {details.barber}</p>
              <p>Fecha: {details.selectedDate.day}/{details.selectedDate.month}</p>
              <p>Horas: {details.selectedInterval.replace(',', ' - ')}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className='user-form'>
          <h2>Completa con tu información</h2>
          <input
            className='input-sendPage'
            type='text'
            name='name'
            placeholder='Tu Nombre'
            value={userData.name}
            onChange={handleInputChange}
            required
          />
          <input
            className='input-sendPage'
            type='email'
            name='email'
            placeholder='Tu Email (Opcional)'
            value={userData.email}
            onChange={handleInputChange}
          />
          <input
            className='input-sendPage'
            type='tel'
            name='phone'
            placeholder='Tu Teléfono'
            value={userData.phone}
            onChange={handlePhoneChange}
            required
          />
          <button className='button-sendPage' type='submit'>Confirmar</button>
        </form>
      </div>

      <div className={postResponse ? 'notification show' : 'notification'}>
        Su cita se ha enviado con exito
      </div>

    </>
  )
}
