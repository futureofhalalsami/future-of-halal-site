import React from 'react'

export default function Button({ text, icon, theme, classNameCustom = '' }) {
  return (
    <button
      className={`
        px-2
        lg:px-6
        py-2
        min-w-[120px]
        flex
        jusitfy-center
        items-center
        gap-1
        text-center
        font-extrabold
        text-md
        md:text-lg
        lg:text-2xl
        rounded-tl-xl
        rounded-br-xl 
        h-fit 
        uppercase 
        ${
          theme === 'light'
            ? 'bg-white text-blue-900'
            : 'bg-blue-900 text-white'
        } 
        hover:bg-opacity-90 
        transition-all
        cursor-pointer
        ultimate-z-index
        ${classNameCustom}
      `}
    >
      <span className="m-auto flex justify-center items-center gap-1">
        {icon ? icon : ''} {text}
      </span>
    </button>
  )
}
