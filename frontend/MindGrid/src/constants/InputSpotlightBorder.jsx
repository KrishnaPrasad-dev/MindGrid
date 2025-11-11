// InputSpotlightBorder.jsx
import React, { useRef, useState } from 'react'

export default function InputSpotlightBorder({
  placeholder = 'Enter Text Here',
  type = 'text',
  className = '',
  inputProps = {},
}) {
  const overlayRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e) => {
    if (!overlayRef.current || isFocused) return
    const rect = overlayRef.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleFocus = () => {
    setIsFocused(true)
    setOpacity(1)
  }
  const handleBlur = () => {
    setIsFocused(false)
    setOpacity(0)
  }
  const handleMouseEnter = () => setOpacity(1)
  const handleMouseLeave = () => setOpacity(0)

  const overlayStyle = {
    pointerEvents: 'none',
    borderRadius: '0.5rem',
    border: '1px solid rgba(134,120,249,0.9)',
    backgroundColor: 'transparent',
    opacity,
    transition: 'opacity 300ms ease',
    WebkitMaskImage: `radial-gradient(30% 30px at ${pos.x}px ${pos.y}px, black 45%, transparent 60%)`,
    maskImage: `radial-gradient(30% 30px at ${pos.x}px ${pos.y}px, black 45%, transparent 60%)`,
  }

  return (
    <div className="relative w-full">
      <input
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={
          'h-12 w-full rounded-md border border-gray-800 bg-gray-950 px-4 py-3 text-gray-100 placeholder-gray-500 outline-none focus:border-[#8678F9] transition-colors duration-300 ' +
          className
        }
        {...inputProps}
      />

      <div
        ref={overlayRef}
        aria-hidden="true"
        style={overlayStyle}
        className="absolute left-0 top-0 z-10 h-12 w-full rounded-md"
      />
    </div>
  )
}
