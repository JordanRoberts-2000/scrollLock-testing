'use client'

import { useStore } from "@/zustand/store"
// import RiseFade from "@/utils/components/Animation/RiseFade"
import Image from "next/image"
import { useEffect, useLayoutEffect, useRef } from "react"

type Props = {
    imageUrl: string,
    blurImageUrl?: string,
    active: boolean,
    title: string,
    subtitle: string,
    index: number
}

const CategoryImage = ({imageUrl, active, title, subtitle, blurImageUrl, index}: Props) => {
    const { powerSavingMode } = useStore()
    let imageRef = useRef<any>(null)
    let imageWrapperRef = useRef<HTMLDivElement>(null)
    let throttle = useRef(true)
    const imageAdjust = () => {
        let percentagePassed = ((imageWrapperRef.current!.getBoundingClientRect().top - window.innerHeight)*-1)/(window.innerHeight + imageWrapperRef.current!.getBoundingClientRect().height)
        let defaultPosition = (imageWrapperRef.current!.getBoundingClientRect().height * -.25)
        return imageRef.current.style.transform = `translate(0, ${(defaultPosition + (percentagePassed * imageWrapperRef.current!.getBoundingClientRect().height * .5))}px) scale(1.5)`
    }
    useLayoutEffect(() => {
        if(active){
            requestAnimationFrame(() => {
                imageRef.current.style.transform = `translate(0, 0) scale(1)`
                imageRef.current.style.transitionDuration = `700ms`
            })
        }else{
            imageAdjust()
            setTimeout(() => {
                requestAnimationFrame(() => {
                    imageRef.current.style.transitionDuration = `75ms`
                })
            },700)
        }
    },[active])
    const pageScroll = () => {
        if(!throttle.current || !imageRef.current || powerSavingMode)return
        throttle.current = false
        setTimeout(() => {
            throttle.current = true
        }, 20)
        requestAnimationFrame(() => {
            if(imageWrapperRef.current!.getBoundingClientRect().top <= window.innerHeight && imageWrapperRef.current!.getBoundingClientRect().top >= -imageWrapperRef.current!.getBoundingClientRect().height){
                let percentagePassed = ((imageWrapperRef.current!.getBoundingClientRect().top - window.innerHeight)*-1)/(window.innerHeight + imageWrapperRef.current!.getBoundingClientRect().height)
                let defaultPosition = (imageWrapperRef.current!.getBoundingClientRect().height * -.25)
                imageRef.current.style.transform = `translate(0, ${(defaultPosition + (percentagePassed * imageWrapperRef.current!.getBoundingClientRect().height * .5))}px) scale(1.5)`
            }
        })
    }
   
    useEffect(() => {
        window.addEventListener('scroll', pageScroll)
    },[])
    return (
        <div ref={imageWrapperRef} className="h-full w-full relative duration-700 overflow-hidden">
            <Image ref={imageRef} alt="placeholder" priority={index <= 1} fill src={imageUrl} className={`${powerSavingMode && '!scale-100'} object-cover scale-150 duration-75`} placeholder="blur" blurDataURL={blurImageUrl}/>
            <div className="absolute top-[50%] lg:top-[20%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col text-center z-20">
                {/* <RiseFade duration={0.6} delay={index <= 1 ? 1.2 : 0} awaitPreload={index <= 1}> */}
                    <h3 className="text-4xl lg:text-7xl font-playfairDisplay font-[600] italic">{title}</h3>
                {/* </RiseFade> */}
                {/* <RiseFade duration={0.6} delay={(index <= 1 ? 1.2 : 0.2)} awaitPreload={index <= 1}> */}
                    <p className="text-xl font-playfairDisplay">{subtitle}</p>
                {/* </RiseFade> */}
            </div>
        </div>
    )
}

export default CategoryImage