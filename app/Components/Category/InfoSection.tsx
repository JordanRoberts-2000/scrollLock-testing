// import Fade from "@/utils/components/Animation/Fade"
// import RiseFade from "@/utils/components/Animation/RiseFade"
import Image from "next/image"
import PriceOption from "./PriceOption"

type PriceOptions = {
    title: string,
    price: number,
    included: string[]
}

type Reviews = {
    stars: number,
    reviewContent: string,
    reviewer: string,
    date: string
}

type Props = {
    priceOptions: PriceOptions[],
    reviews: Reviews[]
}

const InfoSection = ({priceOptions, reviews}: Props) => {
    return (
        <>
             {/* Pricelist */}
             <div className="flex flex-col lg:col-span-2">
                    <p className="mx-4 my-4 text-lg font-bold text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi perspiciatis aliquam vel labore dolor dicta fugiat inventore aliquid, praesentium eius laborum odit accusantium adipisci sapiente delectus. Iusto aliquid sint eveniet.</p>
                <div className="flex my-2 lg:my-0">
                    <div className="h-[2px] bg-black flex-1"></div>
                    <h3 className="mx-4 font-semibold font-playfairDisplay translate-y-[-50%] italic text-3xl backdrop-blur-sm">Price List</h3>
                    <div className="h-[2px] bg-black flex-1"></div>
                </div>
                <div className="flex flex-col gap-8">
                    {priceOptions.map((data, index) => (
                        <PriceOption key={index} data={data}/>
                    ))}
                </div>
            </div>
            {/* Reviews */}
            <div className="flex flex-col pb-24 px-4 mt-8 border-t-2 shadow-2xl pt-4 bg-black text-footer-secondary">
                {/* <Fade className="lg:!opacity-100"> */}
                    <div className="flex my-4">
                        {/* <div className="h-[2px] bg-black flex-1"></div> */}
                        <h3 className="font-semibold font-playfairDisplay translate-y-[-50%] italic text-4xl">Reviews</h3>
                        {/* <div className="h-[2px] bg-black flex-1"></div> */}
                    </div>
                    {reviews.map(({stars, reviewContent, reviewer, date}, index) => (
                        (index < 1 && 
                        <div className={`${index === 1 ? 'lg:hidden flex' : 'flex'} flex-col`} key={index}>
                            <div className={`flex gap-1 mb-1`}>
                                {[...Array(stars)].map((x, i) =>
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
                                )}
                            </div>
                            <p className="mr-2 font-bold text-sm"><q>{reviewContent}</q></p>
                            <span className="text-bold text-footer-secondary text-xs mb-10"><span className="text-lg font-extrabold"></span>{` ${reviewer}: ${date}`}</span>
                        </div>
                        )
                    ))}
                    <div className="flex lg:flex-gap-4">
                        <button className="mb-4 w-fit mx-auto border-2 border-white text-white font-bold text-xl py-1 px-4 rounded-md font-playfairDisplay">Read All Reviews</button>
                    </div>
                {/* </Fade> */}
            </div>
        </>
    )
}

export default InfoSection