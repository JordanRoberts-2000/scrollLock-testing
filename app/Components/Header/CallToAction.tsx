'use client'

import { useStore } from "@/zustand/store"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const CallToAction = () => {
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)
    const { navActive } = useStore()
    useEffect(() => {
        const pageScroll = () => {
            if(window.scrollY >= 100 && !scrolled)setScrolled(true)
            if(window.scrollY < 100 && scrolled)setScrolled(false)
        }
        window.addEventListener("scroll", pageScroll, { passive: true });
        return () => window.removeEventListener("scroll", pageScroll);
    },[scrolled])
    return(
        <>
            <div className={`${((scrolled || navActive) || pathname !== '/') ? "opacity-100" : "opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto"} flex gap-2 ml-auto items-center`}>
                {pathname !== '/' &&
                    <Link href={'/'} className="ml-auto mr-2 z-10"><svg className="h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg></Link>
                }
                <Link className={` duration-500 bg-yellow-400 px-8 py-[2px] rounded-md shadow-xl font-bold mr-2 lg:mr-4 ml-auto lg:ml-0 z-10`} href={'/Bookings'}>Book</Link>
            </div>

        </>
    )
}

export default CallToAction