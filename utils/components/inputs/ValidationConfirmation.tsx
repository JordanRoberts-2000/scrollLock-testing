'use client'

import { motion } from "framer-motion"
import { forwardRef } from "react"

type ValidationComfirmationProps = React.HTMLAttributes<HTMLDivElement> & {
    valid: boolean | null,
}

const ValidationConfirmation = forwardRef<HTMLDivElement ,ValidationComfirmationProps>(({valid, className}, ref) => {
    const varients = {
        errorActive1: { width: ['0rem', '1rem', '1rem', '1rem'], rotate: [0, 0, 0, 45], y: [2], transition: {duration: 0.6, times: [0, 0.3]}},
        errorActive2: { width: ['0rem', '1rem', '1rem', '1rem'], rotate: [0, 0, 0, -45], transition: {duration: 0.6, times: [0, 0.3]}},
        inActive1: { width: ['1rem', '1rem', '1rem', '0rem'], rotate: [-45, 0, 0, 0], transition: {duration: 0.6, times: [0, 0.3]}},
        inActive2: { width: ['1rem', '1rem', '1rem', '0rem'], rotate: [-45, 0, 0, 0], transition: {duration: 0.6, times: [0, 0.3]}},
        valid: { pathLength: [0,1], opacity: [1, 1], transition: {duration: 0.5, times: [0, 0.6]}},
        Notvalid: { pathLength: 0, opacity: 0, transition: {duration: 0.3}},
    }
    return (
        <div ref={ref} className={`absolute ${className}`}>
            <div className='absolute top-[50%] translate-y-[-50%] right-0 flex flex-col w-4 h-4 mr-2 justify-center items-center overflow-hidden'>
                <motion.div variants={varients} animate={(valid === false) ? 'errorActive1' : 'inActive1'} className={`h-[2px] bg-black`}></motion.div>
                <motion.div variants={varients} animate={(valid === false) ? 'errorActive2' : 'inActive2'} className={`h-[2px] bg-black`}></motion.div>
            </div>
            <svg className="w-5 h-5 stroke-black absolute top-[50%] translate-y-[-50%] right-0 flex flex-col mr-2 justify-center items-center overflow-hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}>
                <motion.path variants={varients} animate={valid ? 'valid' : 'Notvalid'} strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
        </div>
    )
})

export default ValidationConfirmation