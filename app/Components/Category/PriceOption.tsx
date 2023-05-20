type PriceOptionProps = {
    data : {
        title: string,
        price: number,
        included: string[]
    }
}

const PriceOption = ({data}:PriceOptionProps) => {
    return (
        <div className="mx-8 flex flex-col shadow-xl border">
            <div className="bg-white flex flex-col justify-center items-center gap-8 py-8">
                <span className="font-extrabold tracking-wider uppercase">{data.title}</span>
                <span className="text-4xl font-playfairDisplay font-[600]">{`${data.price !== 0 ? '£'+data.price : 'Free'}`}</span>
                {data.price !== 0 &&
                    <button className=" bg-yellow-400 text-white shadow-sm rounded-md leading-6 py-3 px-16 text-2xl tracking-wider w-fit">Book Now</button>
                }
            </div>
            <div className="px-8 text-xl font-medium flex flex-col gap-4 pb-8">
                <div className="text-2xl font-bold">Included:</div>
                {data.included.map((el, index) => (
                    <div key={index} className="flex gap-3 text-lg items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {el}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PriceOption