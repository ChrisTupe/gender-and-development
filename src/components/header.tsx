import { useState, useEffect } from 'react'
import ciacLogo from '../assets/ciaclogo.png'

function Header() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedDate = time.toLocaleString('en-PH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  })

  const formattedTime = time.toLocaleString('en-PH', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })

  return (
    <header className="flex flex-row items-center justify-between w-full bg-[#fff]" style={{ padding: '12px 20px' }}>
      {/* Logo in a white rounded box with clear spacing from header edges */}
      <div className="bg-white rounded-xl" style={{ padding: '8px 16px' }}>
        <img
          src={ciacLogo}
          alt="CIAC Logo"
          className="h-[100px] w-auto"
        />
      </div>

      {/* Time section */}
      <div className="text-right text-[#282974] text-sm leading-relaxed">
        <p className="font-semibold">Philippine Standard Time:</p>
        <p>{formattedDate}, {formattedTime}</p>
      </div>
    </header>
  )
}

export default Header