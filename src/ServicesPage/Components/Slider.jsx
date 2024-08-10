import { useState, useEffect } from 'react'
import './Slider.css'

export function Slider ({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0])
    }
  }, [])

  const handleClick = (category) => {
    setSelectedCategory(category)
    document.getElementById(category).scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="slider">
      {categories.map((category) => (
        <a
          href={`#${category}`}
          key={category}
          className={`slider-item ${selectedCategory === category ? 'selected' : ''}`}
          onClick={() => handleClick(category)}
        >
          {category}
        </a>
      ))}
    </div>
  )
}
