'use client'

import { useStore } from "@/zustand/store"
// import RiseFade from "@/utils/components/Animation/RiseFade"
import Image from "next/image"
import { AnyNode } from "postcss"
import { useEffect, useLayoutEffect, useRef, memo, useState } from "react"

type GalleryImageUrls = {
    url: string,
    placeholder: string,
    blurImageUrl: string
}

type Props = {
    imageUrl: string,
    blurImageUrl?: string,
    active: boolean,
    title: string,
    subtitle: string,
    index: number,
    imageRef: any,
    imageWrapperRef: any,
    imageFixed: boolean,
    transitioning: any,
    scrollUpRef: any,
    galleryImageUrls: GalleryImageUrls[],
    braedCrumbs: any,
    sliderWrapper: any,
    currentIndex: any,
    indexState: any,
    setIndexState: any,
    currentTranslation: any,
    prevTranslation: any
}

const CategoryImage = ({imageUrl, active, title, subtitle, blurImageUrl, index, imageRef, imageWrapperRef, imageFixed, transitioning, scrollUpRef, galleryImageUrls, braedCrumbs, sliderWrapper, setIndexState, indexState, currentIndex, currentTranslation, prevTranslation}: Props) => {
    const { powerSavingMode } = useStore()
    let isDragging = useRef(false)
    let throttle = useRef(true)
    let animationId = useRef(0)
    let startPos = useRef(0)
    const pageScroll = () => {
        if(!throttle.current || !imageRef.current || powerSavingMode)return
        if(transitioning.current)return
        throttle.current = false
        setTimeout(() => {
            throttle.current = true
        }, 16)
        requestAnimationFrame(() => {
            if(imageWrapperRef.current!.getBoundingClientRect().top <= window.innerHeight && imageWrapperRef.current!.getBoundingClientRect().top >= -imageWrapperRef.current!.getBoundingClientRect().height){
                let percentagePassed = ((imageWrapperRef.current!.getBoundingClientRect().top - window.innerHeight)*-1)/(window.innerHeight + imageWrapperRef.current!.getBoundingClientRect().height)
                let defaultPosition = (imageWrapperRef.current!.getBoundingClientRect().height * -.25)
                imageRef.current.style.transform = `translate(0, ${(defaultPosition + (percentagePassed * imageWrapperRef.current!.getBoundingClientRect().height * .5))}px) scale(1.5)`
            }
        })
    }
    useLayoutEffect(() => {
        window.addEventListener('scroll', pageScroll)
        if(imageWrapperRef.current!.getBoundingClientRect().top <= window.innerHeight && imageWrapperRef.current!.getBoundingClientRect().top >= -imageWrapperRef.current!.getBoundingClientRect().height){
            let percentagePassed = ((imageWrapperRef.current!.getBoundingClientRect().top - window.innerHeight)*-1)/(window.innerHeight + imageWrapperRef.current!.getBoundingClientRect().height)
            let defaultPosition = (imageWrapperRef.current!.getBoundingClientRect().height * -.25)
            imageRef.current.style.transform = `translate(0, ${(defaultPosition + (percentagePassed * imageWrapperRef.current!.getBoundingClientRect().height * .5))}px) scale(1.5)`
        }
    },[])
    useEffect(() => {
        requestAnimationFrame(() => {
            if(imageWrapperRef.current!.getBoundingClientRect().top <= window.innerHeight && imageWrapperRef.current!.getBoundingClientRect().top >= -imageWrapperRef.current!.getBoundingClientRect().height){
                let percentagePassed = ((imageWrapperRef.current!.getBoundingClientRect().top - window.innerHeight)*-1)/(window.innerHeight + imageWrapperRef.current!.getBoundingClientRect().height)
                let defaultPosition = (imageWrapperRef.current!.getBoundingClientRect().height * -.25)
                imageRef.current.style.transform = `translate(0, ${(defaultPosition + (percentagePassed * imageWrapperRef.current!.getBoundingClientRect().height * .5))}px) scale(1.5)`
            }
        })
    },[])
    // useEffect(() => {
    //     if(isDragging.current === false){
    //         cancelAnimationFrame(animationId.current)
    //     }
    //     // disable context menu on hold
    //     window.oncontextmenu = (e) => {
    //         e.preventDefault()
    //         e.stopPropagation()
    //         return false
    //     }
    // }, [isDragging.current])
    function animation() {
        if(!sliderWrapper.current)return
        if(sliderWrapper.current!.getBoundingClientRect().left > 0)return
        sliderWrapper.current!.style.transform = `translateX(${currentTranslation.current}px)`
        if(isDragging.current) requestAnimationFrame(animation)
    }
    const handleIndexChange = (i: number) => {
        setPositionByIndex(i)
        setIndexState(i)
        currentIndex.current = i
    }
    const setPositionByIndex = (i?: number) => {
        if(i !== null && i !== undefined){
            currentTranslation.current = i * -window.innerWidth
        }else{
            currentTranslation.current = currentIndex.current * -window.innerWidth
        }
        prevTranslation.current = currentTranslation.current
        sliderWrapper.current!.style.transform = `translateX(${currentTranslation.current}px)`
    }
    const touchStart = (e:any) => {
        isDragging.current = true
        startPos.current = e.touches[0].clientX
        animationId.current = requestAnimationFrame(animation)
    }
    const touchMove = (e:any) => {
        currentTranslation.current = prevTranslation.current + e.touches[0].clientX - startPos.current

    }
    const touchEnd = () => {
        isDragging.current = false
        cancelAnimationFrame(animationId.current)
        let movedBy = currentTranslation.current - prevTranslation.current
        sliderWrapper.current!.style.touchAction = 'none'
        setTimeout(() => {
            sliderWrapper.current!.style.touchAction = 'auto'
        },300)
        if(movedBy < -100 && currentIndex.current < galleryImageUrls.length){
            currentIndex.current++
            setIndexState((prev:number) => prev + 1)
            setPositionByIndex()
        }else if(movedBy > 100 && currentIndex.current > 0){
            currentIndex.current--
            setIndexState((prev:number) => prev - 1)
            setPositionByIndex()
        }else{
            setPositionByIndex()
        }
    }
    return (
        // <div ref={imageWrapperRef} className="h-full w-full relative duration-700 overflow-hidden">
        //         <div className={`${imageFixed ? "fixed top-0 left-0 w-full aspect-[3/3.3] z-30 overflow-hidden" : 'relative h-full w-full'}`}>
        //         <div className="absolute top-0 w-full h-full bg-white/40 z-10"></div>
        //         <Image ref={imageRef} alt="placeholder" priority={index <= 1} fill src={imageUrl} className={`${powerSavingMode && '!scale-100'} object-cover will-change-transform ease-linear transition-transform select-none scale-150 duration-75`} 
        //                 placeholder="blur" blurDataURL={blurImageUrl} sizes="100vw"/>
        //         <div className={`${active ? "top-[25%]" : "top-[50%]"} absolute duration-300 lg:top-[20%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col text-center z-20`}>
        //             <h3 className={`${active ? 'scale-125' : 'scale-100'} text-4xl duration-500 font-playfairDisplay font-[600] italic whitespace-nowrap z-20`}>{title}</h3>
        //             <p className={`${active && 'opacity-0'} text-xl duration-500 font-playfairDisplay`}>{subtitle}</p>
        //         </div>
        //     </div>
        // </div>
        <div ref={imageWrapperRef} className="h-full w-full relative duration-700 overflow-hidden lg:rounded-lg">
            <div className={`${imageFixed ? "fixed top-0 left-0 aspect-[3/3.3] z-30" : 'relative h-full'} w-full flex overflow-hidden`}>
                <div className={`${imageFixed ? "fixed aspect-[3/3.3]" : "absolute h-full"} top-0 left-0 w-full bg-white/40 z-10 pointer-events-none`}></div>
                <div className={`${active ? "top-[25%]" : "top-[50%]"} absolute duration-300 lg:top-[20%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col text-center z-20`}>
                    <h3 className={`${active ? 'scale-125' : 'scale-100'} text-4xl duration-500 font-playfairDisplay font-[600] italic whitespace-nowrap z-20`}>{title}</h3>
                    <p className={`${active && 'opacity-0'} text-xl duration-500 font-playfairDisplay`}>{subtitle}</p>
                </div>
                <div ref={braedCrumbs} className={`${imageFixed ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} duration-500 backdrop-blur-sm py-3 px-6 rounded-full z-20 absolute bottom-0 left-[50%] translate-x-[-50%] mb-2 flex gap-6`}>
                    <div className={`${0 === indexState ? "bg-white" : ""} h-3 w-3 border-white border-2 rounded-full`} onClick={() => handleIndexChange(0)}></div>
                    {galleryImageUrls.map((el, index) => (
                        <div key={el.url} className={`${index + 1 === indexState ? "bg-white" : ""} h-3 w-3 border-white border-2 rounded-full`} onClick={() => handleIndexChange(index + 1)}></div>
                    ))}
                </div>
                <div ref={sliderWrapper} className="flex flex-1 relative duration-300">
                    <div className="flex-shrink-0 w-full relative" onTouchStart={(e) => touchStart(e)} onTouchMove={(e) => touchMove(e)} onTouchEnd={() => touchEnd()}>
                        <Image ref={imageRef} alt="placeholder" priority={index < 1} fill loading="eager" src={imageUrl} className={`${powerSavingMode && '!scale-100'} lg:!scale-100 object-cover will-change-transform ease-linear transition-transform select-none scale-150 duration-75`} 
                            placeholder="blur" blurDataURL={blurImageUrl} sizes="100vw"/>
                    </div>
                    {galleryImageUrls.map(({url, placeholder, blurImageUrl}) => (
                        <div key={url} className="flex-shrink-0 w-full relative" onTouchStart={(e) => touchStart(e)} onTouchMove={(e) => touchMove(e)} onTouchEnd={() => touchEnd()} >
                            <Image alt={placeholder} loading="lazy" fill src={url} className={`object-cover select-none`} 
                                placeholder="blur" blurDataURL={blurImageUrl} sizes="100vw"/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoryImage