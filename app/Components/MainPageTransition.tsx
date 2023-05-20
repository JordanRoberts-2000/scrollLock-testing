'use client'

import { useStore } from "@/zustand/store"
import { useRef, useLayoutEffect } from "react"

const MainPageTransition = ({children}: {children : React.ReactNode}) => {
    const { homeImageLoaded } = useStore()
    let transitionDiv = useRef<HTMLDivElement>(null)
    let wrapperRef = useRef<HTMLDivElement>(null)
    const transitionPage = () => {
        transitionDiv.current!.style.height = '0px'
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
           });
    }
    useLayoutEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 100;
        transitionDiv.current!.style.height = '100lvh'
    },[])
    useLayoutEffect(() => {
        if(homeImageLoaded)transitionPage()
    },[homeImageLoaded])
    return (
        <>
            <div ref={wrapperRef} className=' duration-1000'>
                {children}
            </div>
            <div ref={transitionDiv} className={`h-[100lvh] bg-gray-200 z-40 duration-500 fixed bottom-0 left-0 w-full`}></div>
        </>
    )
}

export default MainPageTransition