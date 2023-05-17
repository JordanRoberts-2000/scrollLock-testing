import React from "react"

type BreadCrumsProps = {
    activeIndex: number,
    crumbs: string[]
}

const BreadCrumbs = ({activeIndex, crumbs}: BreadCrumsProps) => {
  return (
    <div className='flex items-center mx-auto mt-6'>
        {[...Array(crumbs.length)].map((el, i) => (
            <React.Fragment key={i}>
                {i !== 0 && <div className='bg-black h-[2px] w-24 mx-2'></div>}
                <div className={`${activeIndex === i ? "bg-black text-white" : "border-[3px] text-black border-black"} w-12 h-12 text-2xl font-bold relative rounded-full flex justify-center items-center`}>
                    {i + 1}
                    <div className="absolute left-[50%] translate-x-[-50%] top-[100%] text-black text-xl font-normal">{crumbs[i]}</div>
                </div>
            </React.Fragment>
        ))}
    </div>
  )
}

export default BreadCrumbs