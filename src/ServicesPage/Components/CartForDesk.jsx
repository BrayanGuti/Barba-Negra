import './CartForDesk.css'


export function CartForDesk ({ fail, cart, removeFromCart, formatPrice }) {
  const total = cart.reduce((acc, product) => acc + parseFloat(product.price), 0)

  const isSomethingInTheCart = cart.length > 0

  const handleSubmit = () => {
    window.location.href('index.html')
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
        <h4>Total: {formatPrice(total)}</h4>
      <button onClick={isSomethingInTheCart ? handleSubmit : null} >Continuar</button>
      </div>
    </aside>
  )
}
