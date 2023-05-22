import PriceOption from "./PriceOption"
import DynamicFooter from "./DynamicFooter"

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
    reviews: Reviews[],
    introParagraph: string,
    title: string
}

const InfoSection = ({priceOptions, reviews, introParagraph, title}: Props) => {
    return (
        <>
             {/* Pricelist */}
             <div className="flex flex-col lg:col-span-2">
                    <p className="mx-4 mt-4 text-xl uppercase font-medium text-center tracking-wide pb-8  font-playfairDisplay">
                        {introParagraph}
                    </p>
                {/* <div className="flex my-2 lg:my-0">
                    <div className="h-[2px] bg-black flex-1"></div>
                    <h3 className="mx-4 font-semibold font-playfairDisplay translate-y-[-50%] italic text-3xl backdrop-blur-sm">Price List</h3>
                    <div className="h-[2px] bg-black flex-1"></div>
                </div> */}
                <div className="flex gap-4 ml-4 text-2xl font-bold items-center mb-2 pl-1">
                    <div className="bg-black h-10 w-10 rounded-full flex items-center justify-center overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                    </div>
                    <div className="bg-black h-10 w-10 rounded-full flex items-center justify-center overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>
                    </div>
                    <div className="bg-black h-10 w-10 rounded-full flex items-center justify-center overflow-hidden">
                        <svg className="h-5 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z"/></svg>
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    {priceOptions.map((data, index) => (
                        <PriceOption key={index} data={data}/>
                    ))}
                </div>
            </div>
            {/* Reviews */}
            <div className="flex flex-col pb-4 px-4 mt-8 border-t-2 shadow-2xl pt-4">
                {/* <Fade className="lg:!opacity-100"> */}
                    <div className="flex my-4">
                        {/* <div className="h-[2px] bg-black flex-1"></div> */}
                        <h3 className="font-semibold font-playfairDisplay translate-y-[-50%] italic text-4xl">Reviews</h3>
                        {/* <div className="h-[2px] bg-black flex-1"></div> */}
                    </div>
                    <div className="flex w-full overflow-x-auto">
                        {reviews.map(({stars, reviewContent, reviewer, date}, index) => (
                            (index < 5 && 
                            <div className={`${index === 1 ? 'lg:hidden flex' : 'flex'} flex-col flex-shrink-0 w-full`} key={index}>
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
                    </div>
                    <div className="flex lg:flex-gap-4">
                        <button className="mb-4 w-fit mx-auto bg-black text-white font-bold text-xl py-1 px-4 rounded-md font-playfairDisplay flex gap-2 items-center">
                            All Reviews
                            <svg className="h-4 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"/></svg>
                        </button>
                        <button className="mb-4 w-fit mx-auto border-black border-2 font-bold text-xl py-1 px-4 rounded-md font-playfairDisplay">Next Review</button>
                    </div>
                {/* </Fade> */}
            </div>
            <DynamicFooter title={title}/>
        </>
    )
}

export default InfoSection