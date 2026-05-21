import ciacLogo from '../assets/ciaclogo.png'

export default function Footer() {
  return (
    <footer className="w-full bg-[#282974] flex items-center justify-center" style={{ padding: '48px 80px' }}>
      <img
        src={ciacLogo}
        alt="CIAC Logo"
        className="object-contain rounded-xl"
        style={{ height: '100px' }}
      />
    </footer>
  )
}