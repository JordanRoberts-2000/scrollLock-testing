'use client'

import { useLayoutEffect, useRef } from "react"
import { useStore } from "@/zustand/store"

const LowPowerModeDetect = () => {
    console.log('lowerpowerdetect')
    let videoRef = useRef<HTMLVideoElement>(null)
    useLayoutEffect(() => {
        videoRef.current!.play()
        .then(() => {})
         .catch((error) => {
            useStore.setState(() => ({ powerSavingMode: true}))
        })
    },[])
    return (
        <video ref={videoRef} width="750" height="500" controls muted playsInline className='hidden'>
            <source src={'/powerSaving.mp4'} type="video/mp4"/>
        </video>
    )
}

export default LowPowerModeDetect