'use client'

import { useStore } from "@/zustand/store"
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
// import CategoryImage from "./CategoryImage"
import { motion } from "framer-motion"
import CategoryImage from "./CategoryImage"
import { usePreventScroll } from "@/utils/hooks/usePreventOriginal"
import ExitButton from "./ExitButton"
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
    let infoSectionWrapper = useRef<HTMLDivElement>(null)
    let transitioning = useRef(false)
    const { categoryClicked } = useStore()
    const [active, setActive] = useState(false)
    const [priceActive, setPriceActive] = useState(true)
    const [imageFixed, setImageFixed] = useState(false)
    const imageAdjust = () => {
        let percentagePassed = ((imageWrapperRef.current!.getBoundingClientRect().top - window.innerHeight)*-1)/(window.innerHeight + imageWrapperRef.current!.getBoundingClientRect().height)
        let defaultPosition = (imageWrapperRef.current!.getBoundingClientRect().height * -.25)
        return imageRef.current.style.transform = `translate(0, ${(defaultPosition + (percentagePassed * imageWrapperRef.current!.getBoundingClientRect().height * .5))}px) scale(1.5)`
    }
    const handleSelected = () => {
        if(active || transitioning.current)return
        transitioning.current = true
        // Stage one
        requestAnimationFrame(() => {
            document.documentElement.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}`
            document.documentElement.style.overflow = 'hidden'
            document.documentElement.style.touchAction = 'none'
        })
        setPriceActive(false)
        useStore.setState(() => ({ footerExtended: true }))
        // Stage 2
        setTimeout(() => {
            categoryScrollRef.current!.scrollIntoView({ behavior: "smooth"})
            let timer = 0
            const checkTop = setInterval(() => {
                timer += 10
                const categoryTopPosition = categoryScrollRef.current!.getBoundingClientRect().top 
                if(categoryTopPosition < 1 && categoryTopPosition > -1){
                    // Stage 3 - success
                    clearInterval(checkTop)
                    setActive(true)
                    requestAnimationFrame(() => {
                        infoSectionWrapper.current!.style.transitionDuration = `600ms`
                        infoSectionWrapper.current!.style.gridTemplateRows = '1fr'
                        document.documentElement.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
                        document.documentElement.style.overflow = 'hidden'
                        document.documentElement.style.touchAction = 'none'
                    })
                    setTimeout(() => {
                        useStore.setState(() => ({ categoryClicked: title }))
                        setImageFixed(true)
                        imageRef.current.style.transitionDuration = `400ms`
                        imageRef.current.style.transform = `translate(0, 0) scale(1)`
                        transitioning.current = false
                    },700)
                }
                if(timer >= 600){
                    // Stage 3 - cancel
                    useStore.setState(() => ({ footerExtended: false }))
                    clearInterval(checkTop)
                    setPriceActive(true)
                    transitioning.current = false
                    document.documentElement.style.paddingRight = `0px`
                    document.documentElement.style.overflow = 'auto'
                    document.documentElement.style.touchAction = 'auto'
                }
            }, 10)
        }, 10)
    }
    const handleExit = () => {
        if(categoryClicked === "" || transitioning.current)return
        transitioning.current = true
        useStore.setState(() => ({ footerExtended: false }))
        setTimeout(() => {
            categoryScrollRef.current!.scrollTo({ top: 0, behavior: 'smooth' })
            let timer = 0
            const checkTop = setInterval(() => {
                timer += 10
                const categoryTopPosition = categoryScrollRef.current!.scrollTop
                if(categoryTopPosition < 1 && categoryTopPosition > -1){
                    // Stage 3 - success
                    clearInterval(checkTop)
                    setImageFixed(false)
                    requestAnimationFrame(() => {
                        infoSectionWrapper.current!.style.gridTemplateRows = '0fr'
                        infoSectionWrapper.current!.style.transitionDuration = `300ms`
                        imageRef.current.style.transitionDuration = `700ms`
                        imageRef.current.style.transform = `translate(0, 0) scale(1.5)`
                    })
                    setTimeout(() => {
                        setActive(false)
                        setPriceActive(true)
                        scrollUpRef.current!.scrollIntoView({ behavior: "smooth"})
                        setTimeout(() => {
                            document.documentElement.style.paddingRight = `0px`
                            document.documentElement.style.overflow = 'auto'
                            document.documentElement.style.touchAction = 'auto'
                            useStore.setState(() => ({categoryClicked: ""}))
                            transitioning.current = false
                        },150)
                    },400)
                }
                if(timer >= 600){
                    // Stage 3 - cancel
                    useStore.setState(() => ({ footerExtended: true }))
                    clearInterval(checkTop)
                    transitioning.current = false
                }
            }, 10)
        }, 10)
    }
    return (
        <li ref={categoryRef} className={`bg-white relative overscroll-contain select-none max-h-[100dvh] overflow-y-auto`} onClick={() => handleSelected()}>
            <div ref={scrollUpRef} className="absolute opacity-0 pointer-events-none top-[-50px] h-[1px] w-full"></div>
            <ExitButton active={active} onClick={() => handleExit()}/>
            <div ref={categoryScrollRef} className={`
                    ${!active ? "aspect-[3/2] lg:aspect-auto lg:w-[100%] w-[95%]": "w-full aspect-auto"} 
                    ${categoryClicked !== title && categoryClicked !== '' ? 'opacity-50 duration-200' : 'opacity-100 duration-500'} 
                    overscroll-contain select-none grid-cols-[2fr,1fr] auto-rows-min mx-auto`}>
                {/* Image */}
                <div className={`${active ? "pointer-events-auto aspect-[3/3.3]" : 'pointer-events-none aspect-[3/2]'} w-[100%] duration-500 mx-auto relative`} onClick={() => handleExit()}>
                    <CategoryImage imageUrl={imageUrl} active={active} title={title} subtitle={subtitle} index={index} blurImageUrl={blurImageUrl} imageRef={imageRef} imageWrapperRef={imageWrapperRef} imageFixed={imageFixed}/>
                  
                </div>
                {/* Info Section */}
                <div ref={infoSectionWrapper} className={`grid transition-[grid-template-rows,500ms] grid-rows-[0fr] duration-[600ms] bg-white z-20`}>
                    <div className="overflow-hidden z-50 bg-white">
                        {children}
                    </div>
                </div>
            </div>
            {/* Price Preview */}
            <div className={`${!priceActive ? "translate-x-[-100%]" : "translate-x-0"} ${categoryClicked !== title && categoryClicked !== '' && 'opacity-50'}
                           duration-[400ms] z-30 absolute bottom-0 left-[-2rem] mb-4 pl-12 py-1 bg-black text-white px-4 text-xl font-playfairDisplay italic`}>
                {`from £${priceOptions[0].price}`}
            </div>
        </li>
    )
}

export default Category