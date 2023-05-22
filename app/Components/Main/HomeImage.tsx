'use client'

import Image from "next/image"
import { useStore } from "@/zustand/store"
import { usePathname } from "next/navigation"
import { useRef, useEffect } from "react"

const HomeImage = () => {
    let imageRef = useRef<any>(null)
    let imageWrapperRef = useRef<HTMLDivElement>(null)
    let titleWrapperRef = useRef<HTMLDivElement>(null)
    let subtitleRef = useRef<HTMLHeadingElement>(null)
    let throttle = useRef(true)
    const imageLoaded = () => {
        useStore.setState(() => ({homeImageLoaded: true}))
    }
    const pageScroll = () => {
        if(!imageRef.current)return
        if((!throttle.current || window.scrollY > imageWrapperRef.current!.getBoundingClientRect().height) || window.screenY < 0)return
        throttle.current = false
        document.body.style.setProperty('--scroll', `${1 + (window.scrollY/imageWrapperRef.current!.getBoundingClientRect().bottom)}`);
        setTimeout(() => {
            throttle.current = true
        }, 20)
        requestAnimationFrame(() => {
            let percentage = window.scrollY / imageRef.current!.getBoundingClientRect().height
            if(percentage < 0)percentage = 0
            // imageRef.current.style.transform = `scale(${1 + (percentage * .3)})`
        })
    }
    useEffect(() => {
        window.addEventListener('scroll', pageScroll)
        return () => {
            window.removeEventListener('scroll', pageScroll);
          }
    },[])
    return (
        <>
            <div ref={imageWrapperRef} className="h-[calc(35vh+50px)] fixed top-0 w-full overflow-hidden lg:h-[calc(100vh+50px)] -z-20">
                <div className='absolute flex flex-col-reverse lg:flex-col top-[20%] lg:top-[10%] left-[50%] translate-x-[-50%] z-30 items-center justify-center'>
                    <div ref={titleWrapperRef} className=" text-lg font-playfairDisplay italic font-[800] lg:text-8xl 
                                    whitespace-nowrap w-fit translate-y-[-8px] text-center">
                        <div>
                            <h1>The Best Beach in the<br className="hidden lg:block"/> Sutton West</h1>
                        </div>
                    </div>
                    <h2 ref={subtitleRef} className="font-playfairDisplay lg:backdrop-blur-sm px-4 font-bold lg:border-black 
                                lg:border-4 whitespace-nowrap italic text-[2.5rem] lg:mt-4">
                        Pocahontas Beach
                    </h2>
                </div>
                <Image ref={imageRef} alt='beach' priority fill src={'http://res.cloudinary.com/dewhcvhvq/image/upload/v1684577988/x1jrk2yk0lctz0iy8t6b.webp'} quality={75} onLoadingComplete={() => imageLoaded()} className=' scale-scroll duration-75 transition-transform object-cover'/>
            </div>
        </>
    )
}

export default HomeImage