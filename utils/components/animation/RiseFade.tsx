'use client'

import { useStore } from '@/zustand/store'
import { motion } from 'framer-motion'

type Props = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode,
    duration: number,
    delay?: number,
    awaitPreload: boolean,
    wrapperClassName?: string
}

const RiseFade = ({children, duration, delay, awaitPreload, className, wrapperClassName}: Props) => {
    const { homeImageLoaded } = useStore()
    return (
        <div className={`overflow-hidden ${wrapperClassName}`}>
            {awaitPreload ?
            <motion.div className={`overflow-hidden ${className}`} initial="hidden" animate={homeImageLoaded && "visible"} transition={{ duration: duration, delay: delay }}
                        variants={{ visible: { opacity: 1, y: 0}, hidden: { opacity: 0, y:20} }}>
                    {children}
            </motion.div>
            :
            <motion.div className={`overflow-hidden ${className}`} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: duration, delay: delay }}
                        variants={{ visible: { opacity: 1, y: 0}, hidden: { opacity: 0, y:20} }}>
                    {children}
            </motion.div>
            }
        </div>
    )
}

export default RiseFade