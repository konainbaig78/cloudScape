import Navbar from './Navbar'
import CloudBackground from '../background/CloudBackground'

export default function PageBackground({
  children,
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#070a12] text-white">
      <CloudBackground />

      <div className="relative z-10">
        <Navbar />

        {children}
      </div>
    </div>
  )
}