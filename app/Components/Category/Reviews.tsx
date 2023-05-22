'use client'

import { useRef } from "react"

type Reviews = {
    stars: number,
    reviewContent: string,
    reviewer: string,
    date: string
}

const Reviews = ({reviews}: {reviews: Reviews[]}) => {
    let wrapperRef = useRef<HTMLDivElement>(null)
    let nextbutton = useRef<HTMLButtonElement>(null)
    const nextReview = () => {
        nextbutton.current!.style.scale = "0.98"
        setTimeout(() =>  {
            nextbutton.current!.style.scale = "1"
        },150)
        if(wrapperRef.current!.scrollLeft === wrapperRef.current!.scrollWidth - wrapperRef.current!.getBoundingClientRect().width){
            return wrapperRef.current!.scrollTo({ left: 0, top:0, behavior: 'smooth' })
        }
        wrapperRef.current!.scrollBy({ left: window.innerWidth, top:0, behavior: 'smooth' })
    }
    return (
        <>
            <div ref={wrapperRef} className="flex w-full overflow-x-hidden">
                {reviews.map(({stars, reviewContent, reviewer, date}, index) => (
                    (index < 5 && 
                    <div className={`${index === 1 ? 'lg:hidden flex' : 'flex'} flex-col flex-shrink-0 pl-4 w-full`} key={index}>
                        <div className={`flex gap-1 mb-1`}>
                            {[...Array(stars)].map((x, i) =>
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
                            )}
                        </div>
                        <p className="mr-6 font-bold text-sm"><q>{reviewContent}</q></p>
                        <span className="text-bold text-gray-700 text-xs mb-10"><span className="text-lg font-extrabold"></span>{` ${reviewer}: ${date}`}</span>
                    </div>
                    )
                ))}
            </div>
            <div className="flex lg:flex-gap-4">
                <button className="mb-4 w-fit mx-auto bg-black text-white font-bold text-xl py-1 px-4 rounded-md font-playfairDisplay flex gap-2 items-center">
                    All Reviews
                    <svg className="h-4 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"/></svg>
                </button>
                <button ref={nextbutton} onClick={() => nextReview()} className="mb-4 w-fit duration-150 mx-auto border-black border-2 font-bold text-xl py-1 px-4 rounded-md font-playfairDisplay">Next Review</button>
            </div>
        </>
    )
}

export default Reviews