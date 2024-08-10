import './CartForMobile.css'
import { useEffect } from 'react';

export function CartForMobile({ fail, cart, removeFromCart, formatPrice }) {
    const total = cart.reduce((acc, product) => acc + parseFloat(product.price), 0);
    const isSomethingInTheCart = cart.length > 0;
    const TotalTime = cart.reduce((totalTime, service) => totalTime + service.duration, 0);

    const handleSubmit = () => {
        const inputElement = document.getElementById('CartForMobile');    
        inputElement.checked = true;    
    }

    const handleReservation = () => {
        const clonedCart = structuredClone(cart);

        localStorage.setItem('cart', JSON.stringify(clonedCart));

        window.location.href = '/barbers.html'
    }


    useEffect(() => {
        const inputElement = document.getElementById('CartForMobile');

        if (cart.length === 0) {
            inputElement.checked = false;
        }
    }, [cart]); 

    return(
        <>
            <label className='cart-view' htmlFor={isSomethingInTheCart ? 'pepe' : null}>
                <div className="cart-view-container">
                    <div className='cart-view-information'>
                        <h3>Total: {formatPrice(total)}</h3>
                        <h4>{cart.length} servicios - {TotalTime} min</h4>
                    </div>

                    <button onClick={isSomethingInTheCart ? handleSubmit : null}>Continuar</button>
                    
                    {fail && 
                        <div className="error">
                            No es posible añadir dos servicios de la misma categoría en una única reserva
                        </div>
                    }
                </div>
            </label>
            <input className="inputForCart" id="CartForMobile" type="checkbox" />
        
            <aside className='full-cart'>
                <label className='close-icon' htmlFor="CartForMobile">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 256 256">
                      <g fill="#777474" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: "normal" }}>
                        <g transform="scale(5.12,5.12)">
                          <path d="M9.15625,6.3125l-2.84375,2.84375l15.84375,15.84375l-15.9375,15.96875l2.8125,2.8125l15.96875,-15.9375l15.9375,15.9375l2.84375,-2.84375l-15.9375,-15.9375l15.84375,-15.84375l-2.84375,-2.84375l-15.84375,15.84375z"></path>
                        </g>
                      </g>
                    </svg>
                </label>
                
                <div className='logo-container'>
                    <img className='logo-container-img' src="../../../images/FullLogo.jpg" alt="Logo" />
                </div>

                <section className='cart-services'>
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
                </section>

                { isSomethingInTheCart &&
                    <button onClick={handleReservation} className='reservar-button'>Reservar</button>
                }

            </aside>
        </>
    );
}
