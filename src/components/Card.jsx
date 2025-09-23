import React from 'react'
import { LuListTodo } from "react-icons/lu";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { IoReloadOutline } from "react-icons/io5";
import { motion } from "motion/react"

function Card({ data, reference }) {
    return (
        <motion.div drag dragConstraints={reference} whileDrag={{ scale: 1.2 }} dragElastic={0.2} dragTransition={{bounceStiffness: 100, bounceDamping: 10}} className='relative w-60 h-70 bg-zinc-900/90 rounded-[25px] text-white py-10 px-5 flex flex-col overflow-hidden'>
            <span className='flex items-center font-semibold gap-1 text-xl'><LuListTodo /> {data.heading}</span>
            <p className='mt-3 text-sm leading-tight overflow-auto h-[55%]'>{data.desp}</p>
            <div className='footer absolute bottom-0 left-0 w-full flex justify-center flex-col'>
                {(() => {
                    let statusTag;
                    if (data.isDone === true) {
                        statusTag = (
                            <>
                                <div className='flex justify-center items-center mb-3 gap-8'>
                                    <div className='w-8 h-8 bg-sky-200/10 rounded-full flex justify-center items-center'>
                                        <IoReloadOutline size='1em' color='#fff' />
                                    </div>
                                </div>
                                <div className='tag w-full h-10 bg-green-500 flex justify-center items-center'>
                                    <h3 className='text-xl font-semibold'>Completed</h3>
                                </div>
                            </>
                        );
                    } else if (data.isDone === false) {
                        statusTag = (
                            <>
                                <div className='flex justify-center items-center mb-3 gap-8'>
                                    <div className='w-8 h-8 bg-sky-200/10 rounded-full flex justify-center items-center'>
                                        <IoReloadOutline size='1em' color='#fff' />
                                    </div>
                                </div>
                                <div className='tag w-full h-10 bg-red-500 flex justify-center items-center'>
                                    <h3 className='text-xl font-semibold'>Stopped</h3>
                                </div>
                            </>
                        );
                    } else {
                        statusTag = (
                            <>
                                <div className='flex justify-center items-center mb-3 gap-8'>
                                    <div className='w-8 h-8 bg-sky-200/10 rounded-full flex justify-center items-center'>
                                        <IoCheckmarkDoneSharp size='1em' color='#fff' />
                                    </div>
                                    <div className='w-8 h-8 bg-sky-200/10 rounded-full flex justify-center items-center'>
                                        <ImCross size='0.8em' color='#fff' />
                                    </div>
                                </div>
                                <div className='tag w-full h-10 bg-blue-500 flex justify-center items-center'>
                                    <h3 className='text-xl font-semibold'>Processing...</h3>
                                </div>
                            </>
                        );
                    }
                    return statusTag;
                })()}
            </div>
        </motion.div>
    )
}

export default Card
