'use client'

import { usePreventScroll } from '@/utils/hooks/usePreventScroll';
import { useStore } from '@/zustand/store'
import { useEffect, useLayoutEffect, useRef } from 'react';

const TermsPageTransition = ({children}: {children : React.ReactNode}) => {
    usePreventScroll()
    const { termsImageLoaded, bodyLocked } = useStore()
    let transitionDiv = useRef<HTMLDivElement>(null)
    if(!bodyLocked)useStore.setState((set: { bodyLocked: boolean }) => ({bodyLocked: true}))
    let wrapperRef = useRef<HTMLDivElement>(null)
    const transitionPage = () => {
        requestAnimationFrame(() => {
            transitionDiv.current!.style.height = '0px'
            wrapperRef.current!.style.transform = 'translate(0,-50px)'
        })
    }
    useLayoutEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    },[])
    useLayoutEffect(() => {
        console.log(termsImageLoaded)
        if(termsImageLoaded)transitionPage()
    },[termsImageLoaded])
    return (
        <>
            <div ref={wrapperRef} className=' duration-1000 translate-y-[0]'>
                {children}
            </div>
            <div ref={transitionDiv} className={`h-[100lvh] bg-gray-200 duration-500 fixed bottom-0 left-0 w-full`}></div>
        </>
    )
}

export default TermsPageTransition