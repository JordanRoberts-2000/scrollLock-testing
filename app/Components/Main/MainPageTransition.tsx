'use client'

import { useStore } from "@/zustand/store"
import { useRef, useLayoutEffect, useEffect } from "react"

const MainPageTransition = ({children}: {children : React.ReactNode}) => {
    const { homeImageLoaded } = useStore()
    let transitionDiv = useRef<HTMLDivElement>(null)
    let wrapperRef = useRef<HTMLDivElement>(null)
    const transitionPage = () => {
        transitionDiv.current!.style.height = '0px'
        wrapperRef.current!.style.top = '-50px'
    }
    useEffect(() => {
        if(homeImageLoaded)transitionPage()
    },[homeImageLoaded])
    return (
        <>
            <div className='relative overflow-hidden w-full h-[35vh] lg:h-[100lvh]'>
                <div ref={wrapperRef} className="absolute duration-1000 top-0 w-full left-0">
                {children}
                </div>
            </div>
            <div ref={transitionDiv} className={`h-[100lvh] bg-gray-200 z-40 duration-500 fixed bottom-0 left-0 w-full`}></div>
        </>
    )
}

export default MainPageTransition