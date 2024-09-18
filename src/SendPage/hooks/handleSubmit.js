export async function post (e, userData, services) {
  e.preventDefault()

  const serviceKeys = Object.keys(services)

  for (let i = 0; i < serviceKeys.length; i++) {
    const service = services[serviceKeys[i]]

    const dayStr = formatNumberWithZero(service.selectedDate.day)
    const monthStr = formatNumberWithZero(service.selectedDate.month + 1)
    const startInterval = service.selectedInterval.split(',')[0]
    const endInterval = service.selectedInterval.split(',')[1]

    const combinedData = {
      start: `2024-${monthStr}-${dayStr}T${startInterval}:00Z`,
      end: `2024-${monthStr}-${dayStr}T${endInterval}:00Z`,
      service: service.currentServiceId,
      personnel: service.barberId,
      client_phone: userData.phone,
      client_email: userData.email === '' ? null : userData.email,
      client_name: userData.name
    }

    await postTheservice(combinedData)
  }
}

async function postTheservice (combinedData) {
  // Hacer solicitud POST
  try {
    const response = await fetch('https://uniform-noni-brayanguti-8c8ba7ad.koyeb.app/api/scheduledservices/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(combinedData)
    })

    if (response.ok) {
      console.log('Cita enviada correctamente')
    } else {
      console.error('Error al enviar la cita')
    }
  } catch (error) {
    console.error('Error en la solicitud:', error)
  }
}

function formatNumberWithZero (number) {
  return number < 10 ? '0' + number : number.toString()
}
