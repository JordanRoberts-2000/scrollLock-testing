'use client'

import { useState } from "react"
import pageData from '@/Data.json'
import Link from "next/link"

const Bookings = () => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <button onClick={() => setOpen((prev) => !prev)} className="lg:pointer-events-none">
                <span className='flex items-center justify-center relative py-1'>
                    Bookings
                    <svg className={`${open && 'rotate-180'} duration-200 w-6 h-6 mt-1 absolute left-[100%] top-[50%] translate-y-[-50%] lg:hidden`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                </span>
            </button>
            <div className={`${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] lg:grid-rows-[1fr]'} w-full lg:w-auto grid transition-[grid-template-rows,500ms]`}>
                <ul className={` transition duration-500 text-white gap-8 flex flex-col text-center ml-1 overflow-hidden
                                text-lg lg:gap-2 lg:text-left`}>
                    {pageData.map(({title}, index) => (
                        <li key={title} className={`${open && 'scale-110 delay-75'} duration-200 ${index === 0 && 'mt-4 lg:mt-0'} ${index === pageData.length - 1 && 'mb-4 lg:mb-0'}`}>
                            <Link href={{pathname: '/Booking', query: { activity: title }}}>{`${title}`}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Bookings