import React from 'react'

const Container = ({children}) => {
  return (
    <div className="relative w-full h-[550px] lg:h-[670px] p-4 top-8 lg:translate-y-4 lg:-translate-x-3 lg:gap-5 flex overflow-hidden lg:overflow-y-scroll lg:flex-col" >{children}</div>
  )
}

export default Container