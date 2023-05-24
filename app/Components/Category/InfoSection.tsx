import PriceOption from "./PriceOption"
import DynamicFooter from "./DynamicFooter"
import Reviews from "./Reviews"
import ShareButton from "./ShareButton"
import EmailLink from "./EmailLink"

type PriceOptions = {
    title: string,
    price: number,
    included: string[]
}

type ReviewsProp = {
    stars: number,
    reviewContent: string,
    reviewer: string,
    date: string
}

type Props = {
    priceOptions: PriceOptions[],
    reviews: ReviewsProp[],
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
                    <a href="tel:+442071234567" className="bg-black h-8 w-8 rounded-full flex items-center justify-center overflow-hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                    </a>
                    <EmailLink/>
                    <ShareButton/>
                </div>
                <div className="flex flex-col gap-8">
                    {priceOptions.map((data, index) => (
                        <PriceOption key={index} data={data}/>
                    ))}
                </div>
            </div>
            {/* Reviews */}
            <div className="flex flex-col pb-4 mt-8 border-t-2 shadow-2xl pt-4">
                {/* <Fade className="lg:!opacity-100"> */}
                    <div className="flex my-4">
                        {/* <div className="h-[2px] bg-black flex-1"></div> */}
                        <h3 className="font-semibold font-playfairDisplay translate-y-[-50%] italic pl-4 text-4xl">Reviews</h3>
                        {/* <div className="h-[2px] bg-black flex-1"></div> */}
                    </div>
                    <Reviews reviews={reviews}/>
                {/* </Fade> */}
            </div>
            <DynamicFooter title={title}/>
        </>
    )
}

export default InfoSection