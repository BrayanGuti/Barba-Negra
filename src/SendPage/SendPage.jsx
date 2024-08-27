import React, { useState, useEffect } from 'react'
import './SendPage.css'

export default function SendPage () {
  const [services, setServices] = useState({})
  const [userData, setUserData] = useState({ name: '', email: '', phone: '' })

  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem('services') || '{}')
    setServices(storedServices)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const combinedData = {
      services,
      userData
    }
    console.log(combinedData)
  }

  return (
    <>
        <div className="background">
            <img className='logo' src="../../images/LOGO.jpeg" alt="" />
            <h1>Rellena con tu informacion</h1>
        </div>

        <div className="appointment-page">
          <div className="services-list">
            {Object.entries(services).map(([service, details]) => (
              <div key={service} className="service-item">
                <h2>{service}</h2>
                <p>Barber: {details.barber}</p>
                <p>Fecha: {details.selectedDate.day}/{details.selectedDate.month}</p>
                <p>Horas: {details.selectedInterval.replace(',', ' - ')}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="user-form">
            <h2>Completa con tu informacion</h2>
            <input
              type="text"
              name="name"
              placeholder="Tu Nombre"
              value={userData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Tu Email"
              value={userData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Tu Telefono"
              value={userData.phone}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Confirmar</button>
          </form>
        </div>
    </>
  )
}
