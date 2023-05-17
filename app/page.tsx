'use client'

import Image from 'next/image'
import { useLayoutEffect, useState } from 'react'
import Footer from './Components/Footer/Footer'

export default function Home() {
    const [loaded, setLoaded] = useState(false)
    const imageLoaded = () => {
        setLoaded(true)
    }
    useLayoutEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    },[])
    return (
        <>
            <div className='h-screen'>
            <main className={`${loaded ? "translate-y-[-50px]" : 'translate-y-[0]'} transition duration-1000 h-[calc(35vh+50px)] bg-pink-500 relative lg:h-[calc(100vh+50px)]`}>
                <Image alt='beach' priority fill src={'http://res.cloudinary.com/dewhcvhvq/image/upload/v1684205919/epavcxsimcv1pqe6mriz.webp'} quality={100} onLoadingComplete={() => imageLoaded()} className=' object-cover'/>
            </main>
            <div className={`${loaded ? "h-0" : "h-[100lvh]"} bg-gray-200 duration-500 fixed bottom-0 left-0 w-full`}></div>
            </div>
            <Footer/>
        </>
    )
}
