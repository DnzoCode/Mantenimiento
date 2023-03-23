import React from 'react'

function Layout({children}) {
  return (
    <div className='flex h-screen w-screen bg-blue-400'>
        <div className='my-auto w-screen h-5/6 md:m-auto bg-slate-50 md:rounded-md md:w-3/5 md:h-3/4 grid lg:grid-cols-2 transition ease-in-out delay-150'>
            <div className='left flex flex-col justify-evenly items-center m-auto w-full h-full'>
                <h1 className='font-extrabold text-5xl'>Manteni<span className='text-red-400'>Sense</span></h1>
            </div>

            <div className='right flex flex-col justify-evenly'>
                <div className='text-center py-10'>
                    {children}
                </div>
            </div>  
        </div>
        
    </div>
  )
}

export default Layout