import React from 'react'

function Background() {
    return (
        <div className='w-full h-screen fixed z-[2]'>
            <div className='absolute top-[1%] w-full py-10 flex justify-center text-[3vw] text-zinc-400 font-semibold'>Lists</div>
            <h1 className='absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-[18vw] leading-none tracking-tighter font-semibold text-zinc-900'>ToDo.</h1>
        </div>
    )
}

export default Background
