import TermsList from "./Components/TermsList"
import TermsImage from "./Components/TermsImage"
import TermsPageTransition from "./Components/TermsPageTransition"

const page = () => {
  return (
    <>
        <TermsPageTransition>
        <div className='flex flex-col lg:flex-row'>
            <div className='relative lg:h-[calc(100vh+50px)] h-[35vh] lg:flex-1'>
                <TermsImage/>
                <div className="absolute left-[2rem] top-[25%] lg:top-[15%] text-5xl font-playfairDisplay flex flex-col">
                    <div className="bg-black text-white px-4 py-1 leading-10 block h-[2.25rem] w-fit"><span>Terms &</span></div>
                    <div className="bg-black text-white px-4 py-1 block h-[2.25rem] mt-6"><span>Conditions</span></div>
                </div>
            </div>
            <TermsList/>
        </div>
        </TermsPageTransition>
    </>
  )
}

export default page