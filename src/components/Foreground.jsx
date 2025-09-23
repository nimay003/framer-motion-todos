import React, {useRef} from 'react'
import Card from './Card'


function Foreground() {
    const ref = useRef(null);

    const data = [
        {
            heading: "Go to gym",
            desp: "At 10am",
            isDone: true
        },
        {
            heading: "Go to class",
            desp: "At 12noon",
            isDone: false
        },
        {
            heading: "Go to market",
            desp: "At 8pm on 26 may",
            isDone: undefined
        },
        {
            heading: "Go to park",
            desp: "Daily at 6am",
            isDone: undefined
        },
    ];

    return (
        <div ref={ref} className='z-[3] fixed top-30 left-0 h-screen w-full gap-10 flex p-5'>
            {data.map((item, index) => (
                <Card data={item} reference={ref} />
            ))}
        </div>
    )
}

export default Foreground
