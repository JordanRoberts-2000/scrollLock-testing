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
    index: number,
    imageRef: any,
    imageWrapperRef: any
}

const CategoryImage = ({imageUrl, active, title, subtitle, blurImageUrl, index, imageRef, imageWrapperRef}: Props) => {
    const { powerSavingMode, categoryClicked } = useStore()
    let throttle = useRef(true)
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
                // imageRef.current.style.transform = `translate(0, ${(defaultPosition + (percentagePassed * imageWrapperRef.current!.getBoundingClientRect().height * .5))}px) scale(1.5)`
            }
        })
    }
    useLayoutEffect(() => {
        window.addEventListener('scroll', pageScroll)
    },[])
    return (
        <div ref={imageWrapperRef} className="h-full w-full relative duration-700 overflow-hidden">
            <div className={`${categoryClicked === title && "fixed top-0 left-0 w-full aspect-[3/2] overflow-hidden "}`}>
            <div className="absolute top-0 w-full h-full bg-white/40 z-10"></div>
            <Image ref={imageRef} alt="placeholder" priority={index <= 1} fill src={imageUrl} className={`${powerSavingMode && '!scale-100'} object-cover border-b-2 border-black select-none scale-150 duration-75`} placeholder="blur" blurDataURL={blurImageUrl}/>
            <div className="absolute top-[50%] lg:top-[20%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col text-center z-20">
                {/* <RiseFade duration={0.6} delay={index <= 1 ? 1.2 : 0} awaitPreload={index <= 1}> */}
                    <h3 className={`${active ? 'scale-125 translate-y-[-2rem]' : 'scale-100'} text-4xl duration-500 font-playfairDisplay font-[600] italic z-20`}>{title}</h3>
                {/* </RiseFade> */}
                {/* <RiseFade duration={0.6} delay={(index <= 1 ? 1.2 : 0.2)} awaitPreload={index <= 1}> */}
                    <p className={`${active && 'opacity-0'} text-xl duration-500 font-playfairDisplay`}>{subtitle}</p>
                   
                {/* </RiseFade> */}
            </div>
            </div>
        </div>
    )
}

export default CategoryImage