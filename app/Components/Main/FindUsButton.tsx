'use client'

import { useStore } from '@/zustand/store'

const FindUsButton = () => {
  return (
    <button onClick={() => useStore.setState(() => ({findUsModal: true}))} className="bg-black mr-4 lg:mr-0 shadow-lg lg:mb-2 py-1 lg:h-fit text-white rounded-md font-playfairDisplay flex-1 px-4 focus:scale-[.98] font-bold whitespace-nowrap 
                                                        flex gap-2 justify-center items-center lg:text-[2.5rem] lg:font-[800] lg:italic lg:py-0">
        Find us<span className="hidden lg:block">on the map</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="h-5 mb-1 lg:mb-0 lg:h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
    </button>
  )
}

export default FindUsButton