'use client'

import { useStore } from "@/zustand/store"
// import RiseFade from "@/utils/components/Animation/RiseFade"
import Image from "next/image"
import { useEffect, useLayoutEffect, useRef, memo } from "react"

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
    galleryImageUrls: GalleryImageUrls[]
}

const CategoryImage = ({imageUrl, active, title, subtitle, blurImageUrl, index, imageRef, imageWrapperRef, imageFixed, transitioning, scrollUpRef, galleryImageUrls}: Props) => {
    const { powerSavingMode } = useStore()
    let throttle = useRef(true)
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
        <div ref={imageWrapperRef} className="h-full w-full relative duration-700 overflow-hidden">
            <div className={`${imageFixed ? "fixed top-0 left-0 aspect-[3/3.3] z-30 overflow-x-scroll overflow-y-hidden" : 'relative h-full overflow-hidden'} w-full flex`}>
                <div className="absolute top-0 w-full h-full bg-white/40 z-10"></div>
                <div className={`${active ? "top-[25%]" : "top-[50%]"} absolute duration-300 lg:top-[20%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col text-center z-20`}>
                    <h3 className={`${active ? 'scale-125' : 'scale-100'} text-4xl duration-500 font-playfairDisplay font-[600] italic whitespace-nowrap z-20`}>{title}</h3>
                    <p className={`${active && 'opacity-0'} text-xl duration-500 font-playfairDisplay`}>{subtitle}</p>
                </div>
                <div className="flex-shrink-0 w-full relative">
                    <Image ref={imageRef} alt="placeholder" priority={index < 1} fill loading="eager" src={imageUrl} className={`${powerSavingMode && '!scale-100'} object-cover will-change-transform ease-linear transition-transform select-none scale-150 duration-75`} 
                           placeholder="blur" blurDataURL={blurImageUrl} sizes="100vw"/>
                </div>
                {galleryImageUrls.map(({url, placeholder, blurImageUrl}) => (
                    <div key={url} className="flex-shrink-0 w-full relative">
                        <Image alt={placeholder} loading="lazy" fill src={url} className={`object-cover select-none`} 
                            placeholder="blur" blurDataURL={blurImageUrl} sizes="100vw"/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoryImage