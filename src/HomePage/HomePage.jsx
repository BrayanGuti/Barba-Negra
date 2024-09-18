import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'

export function HomePage () {
  useEffect(() => {
    // Selecciona todos los enlaces con la clase 'nav-horizontal-a'
    const navLinks = document.querySelectorAll('.nav-horizontal-a')

    // Añade el evento de clic a cada enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const lateralBar = document.getElementById('lateral-bar')
        if (lateralBar) lateralBar.checked = false
      })
    })

    // Añade el evento de cambio al checkbox
    const lateralBar = document.getElementById('lateral-bar')
    const aside = document.querySelector('.aside-home')
    const handleLateralBarChange = () => {
      if (lateralBar.checked) {
        aside.classList.remove('no-animation')
      }
    }
    if (lateralBar) lateralBar.addEventListener('change', handleLateralBarChange)

    // Limpia los eventos cuando el componente se desmonte
    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', () => {
          if (lateralBar) lateralBar.checked = false
        })
      })
      if (lateralBar) lateralBar.removeEventListener('change', handleLateralBarChange)
    }
  }, [])

  return (
    <>
        <header className='header-home' id="Head">
          <img className="logo-home" src="./LOGO.jpeg" alt="" />
          <nav className="titulos">
            <Link className="Inicio" to="/">INICIO</Link>
            <Link to="/services">SERVICIOS</Link>
            {/* <a href="#Shop">TIENDA</a> */}
          </nav>

          <label className="menu-button" htmlFor="lateral-bar">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60" height="60" viewBox="0 0 72 72"
                style={{ fill: '#FFFFFF' }}>
              <path d="M56 48c2.209 0 4 1.791 4 4 0 2.209-1.791 4-4 4-1.202 0-38.798 0-40 0-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4C17.202 48 54.798 48 56 48zM56 32c2.209 0 4 1.791 4 4 0 2.209-1.791 4-4 4-1.202 0-38.798 0-40 0-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4C17.202 32 54.798 32 56 32zM56 16c2.209 0 4 1.791 4 4 0 2.209-1.791 4-4 4-1.202 0-38.798 0-40 0-2.209 0-4-1.791-4-4 0-2.209 1.791-4 4-4C17.202 16 54.798 16 56 16z"></path>
            </svg>
          </label>
          <input className="lateral-bar" type="checkbox" id="lateral-bar" style={{ display: 'none' }} />

          <aside className="aside-home no-animation">
            <input type="checkbox" id="lateral-bar" style={{ display: 'none' }} />
            <label className="close-icon" htmlFor="lateral-bar">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 256 256">
                <g fill="#777474" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}>
                  <g transform="scale(5.12,5.12)">
                    <path d="M9.15625,6.3125l-2.84375,2.84375l15.84375,15.84375l-15.9375,15.96875l2.8125,2.8125l15.96875,-15.9375l15.9375,15.9375l2.84375,-2.84375l-15.9375,-15.9375l15.84375,-15.84375l-2.84375,-2.84375l-15.84375,15.84375z"></path>
                  </g>
                </g>
              </svg>
            </label>
            <div className="nav-horizontal">
              <label htmlFor="lateral-bar">
                <Link id="link-inicio" className="nav-horizontal-a" to="/">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50" style={{ fill: '#FFFFFF' }}>
                    <path d="M 25 1.0507812 C 24.7825 1.0507812 24.565859 1.1197656 24.380859 1.2597656 L 1.3808594 19.210938 C 0.95085938 19.550938 0.8709375 20.179141 1.2109375 20.619141 C 1.5509375 21.049141 2.1791406 21.129062 2.6191406 20.789062 L 4 19.710938 L 4 46 C 4 46.55 4.45 47 5 47 L 19 47 L 19 29 L 31 29 L 31 47 L 45 47 C 45.55 47 46 46.55 46 46 L 46 19.710938 L 47.380859 20.789062 C 47.570859 20.929063 47.78 21 48 21 C 48.3 21 48.589063 20.869141 48.789062 20.619141 C 49.129063 20.179141 49.049141 19.550938 48.619141 19.210938 L 25.619141 1.2597656 C 25.434141 1.1197656 25.2175 1.0507812 25 1.0507812 z M 35 5 L 35 6.0507812 L 41 10.730469 L 41 5 L 35 5 z"></path>
                  </svg>
                  INICIO
                </Link>
              </label>
              <label htmlFor="lateral-bar">
                <Link className="nav-horizontal-a" id="link-servicios" to="/services">
                  <svg width="35px" height="35px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--emojione-monotone" preserveAspectRatio="none" fill="#fffafa" stroke="#fffafa">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M45 19.449c1.104 0 2-.824 2-1.84v-1.943c0-1.018-.896-1.842-2-1.842c0-15.766-26-15.766-26 0c-1.104 0-2 .824-2 1.842v1.943c0 1.016.896 1.84 2 1.84V49.43c0 1.017.896 1.842 2 1.842c0 15.766 26 15.766 26 0c1.104 0 2-.825 2-1.842V19.449zM24 16.786c6.627 0 12 5.373 12 12s-5.373 12-12 12s-12-5.373-12-12s5.373-12 12-12z"></path>
                    </g>
                  </svg>
                  SERVICIOS
                </Link>
              </label>
              {/* <label htmlFor="lateral-bar">
                <Link className="nav-horizontal-a" id="link-tienda" href="/Shop">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="35" height="35" viewBox="0 0 24 24" fill="#FFFFFF">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M21.679 16.31L18.682 5.985A1 1 0 0017.729 5H6.181a1 1 0 00-.953.985L2.321 16.31A1 1 0 003 17h14v2H6a1 1 0 00-1 1v1a1 1 0 001 1h14a1 1 0 001-1v-1a1 1 0 00-1-1H9v-2h12a1 1 0 00.679-.69zM10 6h4v2h-4V6zm5.5 12a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-2zM12 7V5h3v2h-3z"></path>
                    </g>
                  </svg>
                  TIENDA
                </Link>
              </label> */}
            </div>
          </aside>
        </header>
        <section className='main'>
          <span className='shadow'>
            <h2 className='h2-HomePage fade-in titulo2'>
              Bríndate el cuidado que mereces y disfruta de un buen corte.
            </h2>
            <Link to="/services" type='button' className='main-button fade-in delay'>
              HACER RESERVA
            </Link>
          </span>
        </section>
    </>
  )
}
