import './CartForDesk.css'

export function CartForDesk ({ fail, cart, removeFromCart, formatPrice }) {
  const TotalTime = cart.reduce((totalTime, service) => totalTime + service.duration, 0)
  const total = cart.reduce((acc, product) => acc + parseFloat(product.price), 0)

  const isSomethingInTheCart = cart.length > 0

  const handleSubmit = () => {
    const clonedCart = structuredClone(cart)

    localStorage.setItem('cart', JSON.stringify(clonedCart))

    window.location.href = '/barbers.html'
  }

  return (
    <aside className="cart">
      <div className="background">
        <img src="../../images/FullLogo.jpg" alt="Barba Negra" />
      </div>

      <div className="cart-items">
        {cart.map((product) => (
          <div key={product.id} className="cart-item">
            <div>
              <h3 className="product-name">{product.name}</h3>
              <p><span>Precio:</span> {formatPrice(product.price)}</p>
              <p><span>Duración:</span> {product.duration} min</p>
            </div>
            <button onClick={() => removeFromCart(product)}>
              Quitar
            </button>
          </div>
        ))}

        {fail && (
          <div className='error'>
            No es posible añadir dos servicios de la misma categoría en una única reserva
          </div>
        )}

      </div>

      <div className="send-part">
        <h4>Total: <span>{formatPrice(total)}</span></h4>
        <h4>Tiempo: <span>{TotalTime} min</span></h4>
      <button onClick={isSomethingInTheCart ? handleSubmit : null} >Continuar</button>
      </div>
    </aside>
  )
}
