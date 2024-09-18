import './Services.css'

export function Services ({ groupedServices, addToCart, cart, removeFromCart, formatPrice }) {
  const isServiceInCart = (service) => cart.some(item => item.id === service.id)

  return (
    <div className='scrollable-div'>
      {Object.keys(groupedServices).map(category => (
        <div id={category} key={category} className='service-category'>
          <h2>{category}</h2>
          <ul>
            {groupedServices[category].map(service => {
              const inCart = isServiceInCart(service)

              return (
                <li key={service.id} className='service-item'>
                  <div className='service-details'>
                    <h3>{service.name}</h3>
                    <p><span>Precio:</span> {formatPrice(service.price)}</p>
                    <p><span>Duracion:</span> {service.duration}min</p>
                    <p className='description'>{service.description}</p>
                  </div>
                  <button
                    onClick={() => inCart ? removeFromCart(service) : addToCart(service)}
                    className='reserve-button'
                  >
                    {inCart ? 'Quitar' : 'Reservar'}
                  </button>
                </li>
              )
            })}
          </ul>

        </div>
      ))}
    </div>
  )
}
