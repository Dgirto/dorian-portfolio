import { useEffect, useState } from 'react'

/** Hora actual en una zona horaria IANA, actualizada cada 30 s. */
export function useLocalTime(timeZone: string): string {
  const format = () =>
    new Intl.DateTimeFormat('es-PE', { hour: '2-digit', minute: '2-digit', timeZone }).format(new Date())
  const [time, setTime] = useState(format)

  useEffect(() => {
    const id = window.setInterval(() => setTime(format()), 30_000)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeZone])

  return time
}
