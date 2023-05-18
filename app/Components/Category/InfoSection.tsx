// import Fade from "@/utils/components/Animation/Fade"
// import RiseFade from "@/utils/components/Animation/RiseFade"
import Image from "next/image"

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
                {/* <Fade className="lg:!opacity-100"> */}
                    <div className="flex my-2 lg:my-0">
                        <div className="h-[2px] bg-black flex-1"></div>
                        <h3 className="mx-4 font-semibold font-playfairDisplay translate-y-[-50%] italic text-3xl">Price List</h3>
                        <div className="h-[2px] bg-black flex-1"></div>
                    </div>
                    <div className="lg:flex lg:overflow-x-auto lg:gap-20">
                    {priceOptions.map(({title, included, price}, index) => (
                        <div key={title} className="flex flex-col gap-2 mb-4 relative lg:ml-4">
                            {index === priceOptions.length - 1 &&
                                <div className="absolute top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%] w-[100%] h-[85%] lg:hidden">
                                    <div className="absolute w-full h-full top-0 left-0 bg-white/60 z-10"></div>
                                    <Image alt={'placeholder'} src={'http://res.cloudinary.com/dewhcvhvq/image/upload/v1683456486/w2afjti98395hn5cwkx7.webp'} fill className="object-cover"/>
                                </div>
                            }
                            <h5 className="text-3xl bg-black font-playfairDisplay text-white py-1 px-4 w-fit z-10 whitespace-nowrap italic">{title}</h5>
                            <h5 className="font-playfairDisplay font-[800] text-2xl pl-3 w-fit z-10">Includes:</h5>
                            {included.map((data, index) => (
                                // <RiseFade key={index} duration={.6} awaitPreload={false} className="z-10" wrapperClassName="z-10">
                                    <div key={index} className={`${index === included.length - 1 && 'lg:pb-4'} text-xl font-playfairDisplay font-[600] ml-2 z-10`}>{`- ${data}`}</div>
                                // {/* </RiseFade> */}
                            ))}
                            <div className="flex mt-6 z-10 lg:mt-auto">
                                <h6 className="text-3xl font-playfairDisplay font-[800] px-2 w-fit pr-8">{price !== 0 ? `£${price}` : "Free"}</h6>
                                {price !== 0 && <button className="ml-auto mr-2 lg:hidden bg-white shadow font-extrabold px-5 py-1 text-2xl leading-6 border-2 border-black rounded-sm font-playfairDisplay whitespace-nowrap">Book now</button>}
                            </div>
                            {index !== priceOptions.length -1 ?
                                <div className="flex flex-col gap-2 mx-1">
                                    <div className="h-[2px] bg-black mr-4"></div>
                                </div>
                            :
                                <div className="hidden lg:flex flex-col gap-2 mx-1">
                                    <div className="h-[2px] bg-black mr-4"></div>
                                </div>
                            }
                        </div>
                    ))}
                    </div>
                {/* </Fade> */}
            </div>
            {/* Reviews */}
            <div className="flex flex-col pb-24 px-4 lg:pb-4 lg:col-start-2 lg:row-start-1">
                {/* <Fade className="lg:!opacity-100"> */}
                    <div className="flex my-4">
                        <div className="h-[2px] bg-black flex-1"></div>
                        <h3 className="mx-4 font-semibold font-playfairDisplay translate-y-[-50%] italic text-2xl">Reviews</h3>
                        <div className="h-[2px] bg-black flex-1"></div>
                    </div>
                    {reviews.map(({stars, reviewContent, reviewer, date}, index) => (
                        (index < 2 && 
                        <div className={`${index === 1 ? 'lg:hidden flex' : 'flex'} flex-col`} key={index}>
                            <div className={`flex gap-1 mb-1`}>
                                {[...Array(stars)].map((x, i) =>
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
                                )}
                            </div>
                            <p className="mr-2 font-bold text-sm"><q>{reviewContent}</q></p>
                            <span className="text-bold text-gray-700 text-xs mb-10"><span className="text-lg font-extrabold"></span>{` ${reviewer}: ${date}`}</span>
                        </div>
                        )
                    ))}
                    <div className="flex lg:flex-gap-4">
                        <button className="mb-4 w-fit mx-auto bg-black text-white font-bold text-xl py-1 px-4 rounded-md font-playfairDisplay">Read More Reviews</button>
                        <button className="mb-4 w-fit mx-auto border-black border-2 font-bold text-xl py-1 px-4 rounded-md font-playfairDisplay hidden lg:flex">Book Activity</button>
                    </div>
                {/* </Fade> */}
            </div>
        </>
    )
}

export default InfoSection