'use client'

import { usePreventScroll } from '@/utils/hooks/usePreventScroll';
import { useStore } from '@/zustand/store'
import { useLayoutEffect, useRef } from 'react';

const TermsPageTransition = ({children}: {children : React.ReactNode}) => {
    const { termsImageLoaded } = useStore()
    let transitionDiv = useRef<HTMLDivElement>(null)
    let wrapperRef = useRef<HTMLDivElement>(null)
    const transitionPage = () => {
        requestAnimationFrame(() => {
            transitionDiv.current!.style.height = '0px'
            wrapperRef.current!.style.transform = 'translate(0,-50px)'
        })
    }
    useLayoutEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        document.documentElement.style.touchAction = 'none'
        document.documentElement.style.overflow = 'hidden'
        return () => {
            document.documentElement.style.touchAction = 'auto'
            document.documentElement.style.overflow = 'auto'
        }
    },[])
    useLayoutEffect(() => {
        if(termsImageLoaded)transitionPage()
        useStore.setState(() => ({ 
            footerExtended: false,
            categoryClicked: '',}))
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