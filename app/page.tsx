import pageData from '@/Data.json'
import Footer from './Components/Footer/Footer'
import Category from './Components/Category/Category'
import InfoSection from './Components/Category/InfoSection'
import LowPowerModeDetect from './Components/LowPowerModeDetect'
import Main from './Components/Main/Main'

export default function Home() { 
    return (
        <>
            <Main/>
            <LowPowerModeDetect/>
            <section className="pb-4 bg-white lg:flex-[9]">
                <ul className="grid grid-cols-1 gap-y-4 lg:grid-cols-4 lg:gap-4 ">
                    {pageData.map(({imageUrl, title, subtitle, priceOptions, reviews, galleryImageUrls, blurImageUrl, introParagraph}, index) => (
                        <Category key={title} imageUrl={imageUrl} title={title} subtitle={subtitle} priceOptions={priceOptions}
                                    galleryImageUrls={galleryImageUrls} index={index} blurImageUrl={blurImageUrl}>
                            <InfoSection priceOptions={priceOptions} reviews={reviews} introParagraph={introParagraph}/>
                        </Category>
                    ))}
                </ul>
            </section>
            <Footer/>
        </>
    )
}
