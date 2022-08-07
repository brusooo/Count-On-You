import React from 'react'

//60px

const Column = ({children}) => {
  return (
    <div className='w-[370px] short:w-[300px] h-[530px] lg:h-[300px] border-[#333333]  border-[10px] flex flex-col relative m-1 mx-3'>{children}</div>
  )
}

export default Column