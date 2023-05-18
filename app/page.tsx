'use client'

import pageData from '@/Data.json'
import Image from 'next/image'
import { useLayoutEffect, useRef, useState } from 'react'
import Footer from './Components/Footer/Footer'
import Category from './Components/Category/Category'
import detectPowerSavingMode from '../utils/powersavingMode'
import { useStore } from '@/zustand/store'
// import video from '../public/'
// import eep from '../video/eep.mp4'

export default function Home() {
    const [loaded, setLoaded] = useState(false)
    let videoRef = useRef<HTMLVideoElement>(null)
    const imageLoaded = () => {
        setLoaded(true)
    }
    const detectPower = async () => {
        let power = await detectPowerSavingMode()
        if(power){
            useStore.setState(() => ({ powerSavingMode: true}))
            // alert('power saving detcted')
        }else{
             useStore.setState(() => ({ powerSavingMode: true}))
        }
    }
    useLayoutEffect(() => {
        // document.body.scrollTop = document.documentElement.scrollTop = 0;
        // let power =
        detectPower()
        // videoRef.current!.play()
        // .then(() => {})
        //  .catch((error) => {
        //     alert(error)
        // })
    },[])
    return (
        <>
            <div className={`${loaded ? "h-0" : "h-[100lvh]"} bg-gray-200 duration-500 fixed bottom-0 left-0 w-full`}></div>
            <div className=''>
                <main className={`${loaded ? "translate-y-[-50px]" : 'translate-y-[0]'} transition duration-1000 h-[calc(35vh+50px)] bg-pink-500 relative lg:h-[calc(100vh+50px)]`}>
                    <Image alt='beach' priority fill src={'http://res.cloudinary.com/dewhcvhvq/image/upload/v1684205919/epavcxsimcv1pqe6mriz.webp'} quality={100} onLoadingComplete={() => imageLoaded()} className=' object-cover'/>
                </main>
            </div>
            <video ref={videoRef} width="750" height="500" controls muted playsInline className='hidden'>
                <source src={'/powerSaving.mp4'} type="video/mp4"/>
            </video>
            <section className="pb-4 bg-white lg:flex-[9]">
                <ul className="flex flex-col gap-4 lg:gap-0 ">
                    {pageData.map(({imageUrl, title, subtitle, priceOptions, reviews, galleryImageUrls, blurImageUrl}, index) => (
                        <Category key={title} imageUrl={imageUrl} title={title} subtitle={subtitle} priceOptions={priceOptions} 
                                    galleryImageUrls={galleryImageUrls} index={index} blurImageUrl={blurImageUrl}>
                            <div className='h-[200vh]'>

                            </div>
                            {/* <InfoSection priceOptions={priceOptions} reviews={reviews}/> */}
                        </Category>
                    ))}
                </ul>
            </section>
            <Footer/>
        </>
    )
}
