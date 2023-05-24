'use client'

import { useStore } from "@/zustand/store"
import { useRef, useState, useCallback, useMemo, memo } from "react"
import CategoryImage from "./CategoryImage"
import ExitButton from "./ExitButton"

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
    const [indexState, setIndexState] = useState(0)
    let currentIndex = useRef(0)
    let imageRef = useRef<any>(null)
    let imageWrapperRef = useRef<HTMLDivElement>(null)
    let prevTranslation = useRef(0)
    let categoryScrollRef = useRef<HTMLDivElement>(null)
    let infoSectionWrapper = useRef<HTMLDivElement>(null)
    let braedCrumbs = useRef<HTMLDivElement>(null)
    let aspectWrapper = useRef<HTMLDivElement>(null)
    let sliderWrapper = useRef<HTMLDivElement>(null)
    let currentTranslation = useRef(0)
    let transitioning = useRef(false)
    const { categoryClicked } = useStore()
    const [active, setActive] = useState(false)
    const [priceActive, setPriceActive] = useState(true)
    const [imageFixed, setImageFixed] = useState(false)
    const bodyPreventScroll = useCallback((e:any) => {
        if(!infoSectionWrapper.current)return
        if(!infoSectionWrapper.current!.contains(e.target)){
            e.preventDefault()
        }
    },[])
    const handleSelected = useCallback(() => {
        if((active || transitioning.current) || aspectWrapper.current!.style.aspectRatio === '3 / 3.3')return
        transitioning.current = true
        // Stage one
        requestAnimationFrame(() => {
            document.documentElement.addEventListener('touchmove', bodyPreventScroll, { passive: false })
            document.documentElement.style.overflow = 'hidden'
            document.documentElement.style.touchAction = 'none'
            document.documentElement.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
            imageRef.current.style.transform = `translate(0, 0) scale(1)`
            imageRef.current.style.transitionDuration = `600ms`
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
                    aspectWrapper.current!.style.aspectRatio = '3/3.3'
                    clearInterval(checkTop)
                    setActive(true)
                    requestAnimationFrame(() => {
                        infoSectionWrapper.current!.style.transitionDuration = `600ms`
                        infoSectionWrapper.current!.style.gridTemplateRows = '1fr'
                        transitioning.current = false
                    })
                    setTimeout(() => {
                        useStore.setState(() => ({ categoryClicked: title }))
                        setImageFixed(true)
                    },700)
                }
                if(timer >= 600){
                    // Stage 3 - cancel
                    document.documentElement.removeEventListener('touchmove', bodyPreventScroll)
                    useStore.setState(() => ({ footerExtended: false }))
                    clearInterval(checkTop)
                    setPriceActive(true)
                    alert('start cancelled')
                    transitioning.current = false
                    // document.documentElement.removeEventListener('touchmove', (e) => {bodyPreventScroll(e)}, { passive: false })
                    document.documentElement.style.paddingRight = `0px`
                    document.documentElement.style.overflow = 'auto'
                    document.documentElement.style.touchAction = 'auto'
                    imageRef.current.style.transitionDuration = `700ms`
                    imageRef.current.style.transform = `translate(0, 0) scale(1.5)`
                }
            }, 10)
        }, 10)
    },[])
    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const handleExit = useCallback(async (e:any) => {
        console.log()
        if(e.target === braedCrumbs.current || e.target.parentNode === braedCrumbs.current)return
        if(categoryClicked === "" || transitioning.current)return
        document.documentElement.removeEventListener('touchmove', bodyPreventScroll)
        // console.log(imageWrapperRef.current!.getBoundingClientRect().top, scrollUpRef.current!.getBoundingClientRect().top)
        transitioning.current = true
        if(sliderWrapper.current!.style.transform !== 'translateX(0px)'){
            await delay(300)
            sliderWrapper.current!.style.transform = 'translateX(0px)'
            setIndexState(0)
            currentIndex.current = 0
            currentTranslation.current = 0
            prevTranslation.current = 0
        }
        useStore.setState(() => ({ footerExtended: false }))
        setTimeout(() => {
            categoryRef.current!.scrollTo({ top: 0, behavior: 'smooth' })
            let timer = 0
            const checkTop = setInterval(async () => {
                timer += 10
                const categoryTopPosition = categoryRef.current!.scrollTop
                if(categoryTopPosition < 1 && categoryTopPosition > -1){
                    // Stage 3 - success
                    clearInterval(checkTop)
                    setImageFixed(false)
                    requestAnimationFrame(() => {
                        aspectWrapper.current!.style.aspectRatio = '3/2'
                        infoSectionWrapper.current!.style.gridTemplateRows = '0fr'
                        infoSectionWrapper.current!.style.transitionDuration = `300ms`
                        imageRef.current.style.transitionDuration = `550ms`
                        let heightDifference = scrollUpRef.current!.getBoundingClientRect().top
                        // console.log(heightDifference, 'height')
                        let percentagePassed = (((imageWrapperRef.current!.getBoundingClientRect().top + heightDifference) - window.innerHeight)*-1)/(window.innerHeight + imageWrapperRef.current!.getBoundingClientRect().height)
                        let defaultPosition = (imageWrapperRef.current!.getBoundingClientRect().height * -.25)
                        imageRef.current.style.transform = `translate(0, ${(defaultPosition + (percentagePassed * imageWrapperRef.current!.getBoundingClientRect().height * .5))}px) scale(1.5)`
                    })
                    setTimeout(() => {
                        setActive(false)
                        setPriceActive(true)
                        scrollUpRef.current!.scrollIntoView({ behavior: "smooth"})
                        setTimeout(() => {
                            document.documentElement.style.paddingRight = `0px`
                            document.documentElement.style.overflow = 'auto'
                            document.documentElement.style.touchAction = 'auto'
                            imageRef.current.style.transitionDuration = `75ms`
                            useStore.setState(() => ({categoryClicked: ""}))
                            transitioning.current = false
                        },150)
                    },400)
                }
                if(timer >= 700){
                    // Stage 3 - cancel
                    document.documentElement.addEventListener('touchmove', bodyPreventScroll, { passive: false })
                    aspectWrapper.current!.style.aspectRatio = '3/3.3'
                    useStore.setState(() => ({ footerExtended: true }))
                    clearInterval(checkTop)
                    transitioning.current = false
                }
            }, 10)
        }, 10)
    },[categoryClicked])
    return (
        <li ref={categoryRef} className={`bg-white relative overscroll-contain select-none max-h-[100dvh] overflow-y-auto`} onClick={() => handleSelected()}>
            <div ref={scrollUpRef} className="absolute opacity-0 pointer-events-none top-[-50px] h-[1px] w-full"></div>
            <ExitButton active={active} onClick={(e) => handleExit(e)}/>
            <div ref={categoryScrollRef} className={`
                    ${!active ? "aspect-[3/2] w-[95%]": "w-full aspect-auto"} 
                    ${categoryClicked !== title && categoryClicked !== '' ? 'opacity-50 duration-200' : 'opacity-100 duration-500'} 
                    overscroll-contain select-none grid-cols-[2fr,1fr] will-change-[aspect-ratio,opacity,width] ease-linear auto-rows-min mx-auto transition-[opacity,width]`}>
                {/* Image */}
                <div ref={aspectWrapper} className={`${active ? "pointer-events-auto" : 'pointer-events-none'} w-[100%] aspect-[3/2] transition-[aspect-ratio] duration-500 mx-auto relative`} onClick={(e) => handleExit(e)}>
                <CategoryImage imageUrl={imageUrl} active={active} title={title} subtitle={subtitle} index={index} blurImageUrl={blurImageUrl} imageRef={imageRef} sliderWrapper={sliderWrapper}
                                imageWrapperRef={imageWrapperRef} imageFixed={imageFixed} transitioning={transitioning} scrollUpRef={scrollUpRef} galleryImageUrls={galleryImageUrls} braedCrumbs={braedCrumbs}
                                indexState={indexState} setIndexState={setIndexState} currentIndex={currentIndex} currentTranslation={currentTranslation} prevTranslation={prevTranslation}/>
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

export default memo(Category)