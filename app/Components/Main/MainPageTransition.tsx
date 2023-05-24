'use client'

import { useStore } from "@/zustand/store"
import { usePathname } from "next/navigation"
import { useRef, useLayoutEffect, useEffect } from "react"

const MainPageTransition = ({children}: {children : React.ReactNode}) => {
    const { homeImageLoaded } = useStore()
    let transitionDiv = useRef<HTMLDivElement>(null)
    let wrapperRef = useRef<HTMLDivElement>(null)
    const transitionPage = () => {
        transitionDiv.current!.style.transform = 'translate(0, 100vh)'
        // wrapperRef.current!.style.top = '-250px'
       
    }
    const pathname = usePathname()
    useEffect(() => {
        console.log('eggygygyg', pathname)
        if(homeImageLoaded)transitionPage()
    },[homeImageLoaded])
    return (
        <>
            <div ref={wrapperRef} className='relative overflow-hidden w-full h-[35vh] lg:h-[100lvh] -z-50'>
                {children}
            </div>
            <div ref={transitionDiv} className={`h-[100lvh] translate-y-[0] bg-gray-200 z-40 duration-500 will-change-transform fixed bottom-0 left-0 w-full`}></div>
        </>
    )
}

export default MainPageTransition