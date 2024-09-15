import { useState, useEffect } from 'react'

export function useServices () {
  const [data, setData] = useState(null) // Estado para los datos
  const [loading, setLoading] = useState(true) // Estado para indicar si está cargando
  const [error, setError] = useState(null) // Estado para manejar errores

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/services/')
        if (!response.ok) {
          throw new Error('Error al realizar el fetch')
        }
        const result = await response.json()
        setData(result)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error } // Retorna los datos, estado de carga y error
}