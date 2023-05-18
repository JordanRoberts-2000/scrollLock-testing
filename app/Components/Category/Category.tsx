'use client'

import { useStore } from "@/zustand/store"
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
// import CategoryImage from "./CategoryImage"
import { motion } from "framer-motion"
import CategoryImage from "./CategoryImage"
import { usePreventScroll } from "@/utils/hooks/usePreventOriginal"
// import RiseFade from "@/utils/components/Animation/RiseFade"
// import Galllery from "./Galllery"

type PriceOptions = {
    title: string,
    price: number,
    included: string[]
}

type GalleryImageUrls = {
    url: string,
    placeholder: string,
    blurImageUrl: string
}

type Props = {
    children: React.ReactNode
    imageUrl: string,
    blurImageUrl?: string,
    title: string,
    subtitle: string,
    priceOptions: PriceOptions[],
    index: number,
    galleryImageUrls: GalleryImageUrls[]
}

const Category = ({children, imageUrl, title, subtitle, priceOptions, galleryImageUrls, blurImageUrl, index}: Props) => {
    let categoryRef = useRef<HTMLLIElement>(null)
    let scrollUpRef = useRef<HTMLDivElement>(null)
    let imageRef = useRef<any>(null)
    let imageWrapperRef = useRef<HTMLDivElement>(null)
    let categoryScrollRef = useRef<HTMLDivElement>(null)
    let transitioning = useRef(false)
    const { categoryClicked } = useStore()
    const [active, setActive] = useState(false)
    const [priceActive, setPriceActive] = useState(true)
    const imageAdjust = () => {
        let percentagePassed = ((imageWrapperRef.current!.getBoundingClientRect().top - window.innerHeight)*-1)/(window.innerHeight + imageWrapperRef.current!.getBoundingClientRect().height)
        let defaultPosition = (imageWrapperRef.current!.getBoundingClientRect().height * -.25)
        return imageRef.current.style.transform = `translate(0, ${(defaultPosition + (percentagePassed * imageWrapperRef.current!.getBoundingClientRect().height * .5))}px) scale(1.5)`
    }
    const handleSelected = () => {
        if(active || transitioning.current)return
        console.log('activated', transitioning.current, active)
        transitioning.current = true
        // Stage one
        requestAnimationFrame(() => {
            document.documentElement.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}`
            document.documentElement.style.overflow = 'hidden'
            document.documentElement.style.touchAction = 'none'
        })
        useStore.setState(() => ({ categoryClicked: title }))
        setPriceActive(false)
        // Stage 2
        setTimeout(() => {
            categoryScrollRef.current!.scrollIntoView({ behavior: "smooth"})
            let timer = 0
            const checkTop = setInterval(() => {
                timer += 10
                const categoryTopPosition = categoryScrollRef.current!.getBoundingClientRect().top 
                if(categoryTopPosition < 1 && categoryTopPosition > -1){
                    // Stage 3 - success
                    setActive(true)
                    imageRef.current.style.transform = `translate(0, 0) scale(1)`
                    imageRef.current.style.transitionDuration = `700ms`
                    document.documentElement.style.paddingRight = `0px`
                    document.documentElement.style.overflow = 'hidden'
                    document.documentElement.style.touchAction = 'none'
                    setTimeout(() => {
                        transitioning.current = false
                    },700)
                }
                if(timer >= 600){
                    // Stage 3 - cancel
                    clearInterval(checkTop)
                    transitioning.current = false
                }
            }, 10)
        }, 10)
    }
    const handleExit = () => {
        console.log('tried', categoryClicked) 
        if(categoryClicked === "" || transitioning.current)return
        transitioning.current = true
        console.log('deactivated', transitioning.current, active)
        setTimeout(() => {
            categoryScrollRef.current!.scrollTo({ top: 0, behavior: 'smooth' })
            let timer = 0
            const checkTop = setInterval(() => {
                timer += 10
                const categoryTopPosition = categoryScrollRef.current!.scrollTop
                if(categoryTopPosition < 1 && categoryTopPosition > -1){
                    // Stage 3 - success
                    setActive(false)
                    clearInterval(checkTop)
                    setPriceActive(true)
                    scrollUpRef.current!.scrollIntoView({ behavior: "smooth"})
                    setTimeout(() => {
                        document.documentElement.style.paddingRight = `0px`
                        document.documentElement.style.overflow = 'auto'
                        document.documentElement.style.touchAction = 'auto'
                        useStore.setState(() => ({categoryClicked: ""}))
                        transitioning.current = false
                    },150)
                }
                if(timer >= 600){
                    // Stage 3 - cancel
                    clearInterval(checkTop)
                    transitioning.current = false
                }
            }, 10)
        }, 10)
    }
    return (
        <li ref={categoryRef} className={`${active && 'pointer-events-none'} bg-white relative lg:pointer-events-none lg:border-b-2 lg:border-black overscroll-contain select-none`} onClick={() => handleSelected()}>
            <div ref={scrollUpRef} className="absolute opacity-0 pointer-events-none top-[-50px] h-[1px] w-full"></div>
            <button className={`bg-black ${active ? "opacity-100 pointer-events-auto  duration-300" : "opacity-0 pointer-events-none"} p-2 lg:hidden rounded-full fixed bottom-0 right-0 m-4 z-40`} onClick={() => handleExit()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div ref={categoryScrollRef} className={`
                    ${!active ? "aspect-[3/2] w-[95%]": "w-full aspect-auto"} 
                    ${categoryClicked !== title && categoryClicked !== '' ? 'opacity-50 duration-200' : 'opacity-100 duration-500'} 
                    overscroll-contain select-none grid-cols-[2fr,1fr] auto-rows-min mx-auto
                    lg:grid lg:pt-4`}>
                {/* Image/Gallery */}
                <div className={`${active ? "pointer-events-auto" : 'pointer-events-none'} w-[100%] lg:w-full aspect-[3/2] lg:aspect-auto lg:h-[100%] mx-auto relative`} onClick={() => handleExit()}>
                    <CategoryImage imageUrl={imageUrl} active={active} title={title} subtitle={subtitle} index={index} blurImageUrl={blurImageUrl} imageRef={imageRef} imageWrapperRef={imageWrapperRef}/>
                    <div className="absolute top-0 w-full h-full bg-white/40"></div>
                    
                    {/* <Galllery active={active} galleryImageUrls={galleryImageUrls}/> */}
                </div>
                {/* Info Section */}
                <div className={`grid transition-[grid-template-rows,500ms] ${!active ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'}`}>
                    <div className="overflow-hidden">
                        {/* <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur laudantium magni odit repudiandae, maxime, nemo quos voluptatum dignissimos vitae, aperiam quidem necessitatibus id at voluptas beatae illum labore impedit ad.</div> */}
                        {children}
                    </div>
                </div>
            </div>
            {/* <div className={`${!priceActive ? "translate-x-[-100%]" : "translate-x-0"} ${categoryClicked !== title && categoryClicked !== '' && 'opacity-0 lg:opacity-100'}
                           duration-200 z-30 absolute bottom-0 left-[-2rem] mb-4 pl-12 py-1 bg-black text-white px-4 text-xl font-playfairDisplay italic`}>
                {`from £${priceOptions[0].price}`}
            </div> */}
        </li>
    )
}

export default Category