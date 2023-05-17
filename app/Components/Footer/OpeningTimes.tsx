'use client'

import { useState } from 'react'

const OpeningTimes = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <button onClick={() => setOpen((prev) => !prev)} className="lg:pointer-events-none">
                <span className='flex items-center justify-center relative py-1'>
                    Opening Times
                    <svg className={`${open && 'rotate-180'} duration-200 w-6 h-6 mt-1 absolute left-[100%] top-[50%] translate-y-[-50%] lg:hidden`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </span>
            </button>
            <div className={`${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] lg:grid-rows-[1fr]'} w-full lg:w-auto grid transition-[grid-template-rows,500ms]`}>
                <ul className={`text-lg transition duration-500 text-white gap-8 flex flex-col text-center ml-1 overflow-hidden
                                lg:text-lg lg:gap-2 lg:text-left`}>
                    <li className={`${open && 'scale-110 delay-75'} duration-200 mt-4 lg:mt-0 flex lg:flex-col justify-between mx-6 lg:mx-0`}>
                        <div>Mon-Fri</div>
                        <div className='lg:text-base lg:text-footer-secondary'>9:00AM - 5:00PM</div>
                    </li>
                    <li className={`${open && 'scale-110 delay-75'} duration-200 flex lg:flex-col justify-between mx-6 lg:mx-0`}>
                        <div>Sat-Sun</div>
                        <div className='lg:text-base lg:text-footer-secondary'>11:00AM - 3:00PM</div>
                    </li>
                    <li className={`${open && 'scale-110 delay-75'} duration-200 mb-4 lg:flex-col flex justify-between mx-6 lg:mx-0`}>
                        <div>Bank Holiday</div>
                        <div className='lg:text-base lg:text-footer-secondary'>9:00AM - 5:00PM</div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default OpeningTimes