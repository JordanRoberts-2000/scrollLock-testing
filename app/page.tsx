import pageData from '@/Data.json'
import Footer from './Components/Footer/Footer'
import Category from './Components/Category/Category'
import LowPowerModeDetect from './Components/LowPowerModeDetect'
import Main from './Components/Main/Main'
import dynamic from 'next/dynamic'
const DynamicInfo = dynamic(() => import('./Components/Category/InfoSection'));

export default function Home() { 
    return (
        <>
            <Main/>
            <LowPowerModeDetect/>
            <section className="pb-4 bg-white lg:flex-[9] w-full overflow-hidden">
                <ul className="grid grid-cols-1 gap-y-4 lg:grid-cols-5 lg:gap-4 lg:w-[110%]">
                    {pageData.map(({imageUrl, title, subtitle, priceOptions, reviews, galleryImageUrls, blurImageUrl, introParagraph}, index) => (
                        <Category key={title} imageUrl={imageUrl} title={title} subtitle={subtitle} priceOptions={priceOptions}
                                    galleryImageUrls={galleryImageUrls} index={index} blurImageUrl={blurImageUrl}>
                            <DynamicInfo priceOptions={priceOptions} reviews={reviews} introParagraph={introParagraph} title={title}/>
                        </Category>
                    ))}
                </ul>
            </section>
            <Footer/>
        </>
    )
}
