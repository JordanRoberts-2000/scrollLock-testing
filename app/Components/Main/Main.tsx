import MainPageTransition from "./MainPageTransition"
import HomeImage from "./HomeImage"
import Link from "next/link"
import FindUsButton from "./FindUsButton"

const Main = () => {
    return (
        <main className={`flex flex-col`}>
            <MainPageTransition>
                <HomeImage/>
            </MainPageTransition>
            <div className="relative h-0 lg:h-8 bg-white w-full">
                <div className="fadeWhite left-0 h-6 z-10 absolute bottom-[100%] translate-y-[2px] w-full"></div>
            </div>
            <div className="flex flex-col bg-white lg:bg-transparent relative lg:fixed lg:top-0 lg:left-0 lg:h-[100vh] lg:w-full -z-20 lg:-z-20">
                <p className="px-4 bg-white lg:bg-transparent lg:px-2 lg:font-bold pt-4 text-xl translate-y-[2px] lg:translate-y-0 uppercase font-medium tracking-wide pb-8 lg:mb-2 font-playfairDisplay text-justify lg:absolute lg:bottom-[0%] lg:w-full lg:left-0 lg:text-center">Book from an array of exhilarating activities and courses, great for families. the best choice for relaxing, learning, and exploring.</p>
                <div className={'flex items-center -z-20 lg:mb-32 relative bg-white lg:bg-transparent lg:absolute lg:bottom-[0%] lg:mr-8 lg:right-0 lg:flex-col-reverse lg:items-start'}>
                    <div className="bg-white z-10 w-full h-full absolute left-0 top-0 lg:hidden"></div>
                    <ul className="flex z-30 gap-8 lg:gap-20 items-center ml-2 pb-2 bg-white lg:bg-transparent">
                        <li>
                            <svg className="h-5 lg:h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg>
                        </li>
                        <li>
                            <svg className="h-5 lg:h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>
                        </li>
                        <li>
                            <svg className="h-6 lg:h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
                        </li>
                    </ul>
                    <div className="lg:hidden flex-1 h-8 bg-white z-20 pb-2 flex items-center">
                        <div className="h-[2px] flex-1 bg-black mx-4 z-20 lg:hidden"></div>
                    </div>
                    <span className="text-2xl z-20 font-[800] italic font-playfairDisplay lg:mb-4 lg:text-[2.5rem] mb-2 lg:bg-black bg-white lg:text-white mr-2 backdrop-blur-sm lg:pl-4 lg:py-2 lg:pr-8">Follow Us</span>
                    <div className="fixed h-[35vh] top-0 left-0 w-full lg:relative lg:h-auto -z-50">
                        <div className="absolute bottom-0 left-[50%] translate-x-[-50%] w-full lg:w-auto mb-12 lg:relative lg:translate-x-0 lg:left-auto lg:bottom-auto lg:mb-0 flex gap-8">
                            <Link href={'bookings'} className="border-2 ml-4 font-sm shadow-lg py-1 text-center border-black backdrop-blur-sm flex-1 rounded-sm px-4 font-bold whitespace-nowrap
                                        lg:hidden">
                                Book now
                            </Link>
                            <FindUsButton/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Main