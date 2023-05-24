'use client'

import { useStore } from "@/zustand/store"
import { motion } from "framer-motion"
import Link from "next/link"
import { useEffect, useLayoutEffect, useState } from "react"
import { useSearchParams } from 'next/navigation';

const variants = { 
    oneActive: { width: ['1.5rem'], rotate: 45, y: 10 }, oneInactive: { width: '2rem', },
    twoActive: { width: ['2rem', '0rem'] }, twoInactive: { width: '1.25rem' },
    threeActive: { width: '1.5rem', rotate: -45, y:-10 }, threeInactive: { width: '1.25rem' }
}

const HamburgerMenu = () => {
    const { categoryClicked, navActive } = useStore()
    const searchParams = useSearchParams();
    const category = searchParams.get('category')
    useEffect(() => {
        useStore.setState((set: any) => ({navActive: false}))
    },[category])
    const handleClick = () => {
        useStore.setState((set: any) => ({navActive: !set.navActive}))
        if(!navActive)useStore.setState((set: any) => ({bodyLocked: true}))
        if(navActive && categoryClicked === "")useStore.setState((set: any) => ({bodyLocked: false}))
    }
    const handleSelected = (selected: string) => {
        useStore.setState(() => ({navSelected: selected}))
    }
    return (
        <>
            <div className='flex flex-col gap-2 ml-2 lg:hidden items-center z-10' onClick={() => handleClick()}>
                <motion.div animate={navActive ? "oneActive" : "oneInactive"} variants={variants} className='h-[2px] bg-black w-8'></motion.div>
                <motion.div animate={navActive ? "twoActive" : "twoInactive"} variants={variants} className={`h-[2px] bg-black w-5 ${!navActive && 'mr-3'}`}></motion.div>
                <motion.div animate={navActive ? "threeActive" : "threeInactive"} variants={variants} className={`h-[2px] bg-black w-5 ${!navActive && 'mr-3'}`}></motion.div>
            </div>
            <nav className={`${!navActive ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"} lg:opacity-100 lg:relative lg:bg-white/0 lg:h-auto 
                            lg:w-auto top-0 fixed h-[100dvh] w-[100%] left-0 bg-white duration-300 lg:ml-auto flex justify-between flex-col lg:flex-row`}>
                <ul className='flex py-6 lg:py-0 flex-1 justify-around lg:mr-8 font-bold flex-col lg:gap-12 text-center text-3xl lg:text-base lg:flex-row lg:mt-0 w-fit mx-auto'>
                    <li className="border-b-2 border-black lg:border-none"><Link href={{pathname : '/', query : {category: 'Swimming'}}}>SWIMMING</Link></li>
                    <li className="border-b-2 border-black lg:border-none"><Link href={{pathname : '/', query : {category:'parasailing'}}}>PARASAILING</Link></li>
                    <li className="border-b-2 border-black lg:border-none"><Link href={{pathname : '/', query : {category:'fishing'}}}>FISHING</Link></li>
                    <li className="border-b-2 border-black lg:border-none"><Link href={{pathname : '/', query : {category:'vollyball'}}}>VOLLYBALL</Link></li>
                    <li className="border-b-2 border-black lg:border-none"><Link href={{pathname : '/', query : {category:'horseriding'}}}>HORSERIDING</Link></li>
                </ul>
                <div className="flex flex-col">
                    <div className="lg:hidden flex gap-4 mx-auto mb-4">
                        <button className="py-1 px-5 border-2 border-black font-bold rounded-md">Location</button>
                        <button className="py-1 px-5 border-2 border-black font-bold rounded-md">Reviews</button>
                        <button className="py-1 px-5 border-2 border-black font-bold rounded-md">Ts & Cs</button>
                    </div>
                    <ul className='flex py-4 mx-auto mb-4 gap-16 lg:hidden'>
                        <li>
                            <svg className="h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg>
                        </li>
                        <li>
                            <svg className="h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>
                        </li>
                        <li>
                            <svg className="h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                        </li>
                    </ul>
                    <span className='lg:hidden text-xs font-bold mb-4 text-center'>@CopyRight PocahontasBeach2023</span>
                </div>
            </nav>
        </>
    )
}

export default HamburgerMenu