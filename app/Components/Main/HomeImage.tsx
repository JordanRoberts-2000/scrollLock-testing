'use client'

import Image from "next/image"
import { useStore } from "@/zustand/store"
import { usePathname } from "next/navigation"
import { useRef, useEffect } from "react"

const HomeImage = () => {
    const pathname = usePathname()
    let imageRef = useRef<any>(null)
    let titleWrapperRef = useRef<HTMLDivElement>(null)
    let subtitleRef = useRef<HTMLHeadingElement>(null)
    let throttle = useRef(true)
    let currentPathname = useRef(pathname)
    const imageLoaded = () => {
        useStore.setState(() => ({homeImageLoaded: true}))
    }
    const pageScroll = () => {
        if(!throttle.current || window.scrollY > imageRef.current!.getBoundingClientRect().height)return
        if(!imageRef.current || currentPathname.current !== '/')return
        throttle.current = false
        setTimeout(() => {
            throttle.current = true
        }, 20)
        requestAnimationFrame(() => {
            let percentage = window.scrollY / imageRef.current!.getBoundingClientRect().height
            if(percentage < 0)percentage = 0
            imageRef.current.style.transform = `scale(${1 + (percentage * .3)})`
            // titleWrapperRef.current!.style.transform = `scale(${1 - (percentage * .15)}) translate(-50%, 0)`
            // subtitleRef.current!.style.transform = `scale(${1 - (percentage * .15)}) translate(-50%, 0)`
        })
    }
    useEffect(() => {
        window.addEventListener('scroll', pageScroll)
        currentPathname.current = pathname
    },[pathname])
    return (
        <div className="h-[calc(35vh+50px)] fixed top-0 w-full overflow-hidden lg:h-[calc(100vh+50px)] -z-20">
            <Image ref={imageRef} alt='beach' priority fill src={'http://res.cloudinary.com/dewhcvhvq/image/upload/v1684577988/x1jrk2yk0lctz0iy8t6b.webp'} quality={100} onLoadingComplete={() => imageLoaded()} className=' object-cover'/>
        </div>
    )
}

export default HomeImage