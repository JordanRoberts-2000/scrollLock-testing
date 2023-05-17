'use client'

import pageData from '@/Data.json'
import { useRef, useState } from 'react'
import BreadCrumbs from './Components/BreadCrumbs'
const crumbs = ['Booking', 'Payment']

const Page = () => {
    const [selectedActivity, setSelectActivity] = useState(0)
    const [breadCrumbs, setBreadCrumbs] = useState(0)
    let activityRef = useRef<HTMLSelectElement>(null)
    const activityOnChange = (e:any) => {
        pageData.map((el, index) => {
            if(el.title === e.target.value)setSelectActivity(index)
        })
    }
    return (
        <div className='bg-white relative'>
            <h4 className='absolute left-[50%] translate-x-[-50%] bottom-[100%] z-[60] mb-4 font-[600] text-4xl font-playfairDisplay'>Booking</h4>
            <form className='flex flex-col h-[90vh] text-2xl text-gray-500'>
                <BreadCrumbs activeIndex={breadCrumbs} crumbs={crumbs}/>
                <h3 className='font-bold text-3xl text-black mx-8 mt-12'>Book Your Beach Adventure</h3>
                <div className={`${breadCrumbs === 0 ? 'flex' : 'hidden'} flex-col gap-16 pt-6`}>
                    <select ref={activityRef} onChange={(e) => activityOnChange(e)} className=' bg-transparent border-b-2 border-gray-500 mx-8 pb-1 text-2xl'>
                        {pageData.map((el) => (
                            <option key={el.title}>{el.title}</option>
                        ))}
                    </select>
                    <select className='bg-transparent border-b-2 border-gray-500 mx-8 pb-1 text-2xl'>
                        {pageData[selectedActivity].priceOptions.map((el) => (
                            <option key={el.title}>{`${el.title} -- £${el.price}`}</option>
                        ))}
                    </select>
                    <div className='flex justify-between mx-8 border-b-2 border-gray-500'>
                        <label className='text-2xl'>Date</label>
                        <input type='date'/>
                    </div>
                    <select className='bg-transparent border-b-2 border-gray-500 mx-8 pb-1 text-2xl'>
                        <option>08:00</option>
                        <option>09:00</option>
                        <option>10:00</option>
                        <option>11:00</option>
                        <option>12:00</option>
                        <option>13:00</option>
                        <option>14:00</option>
                        <option>15:00</option>
                        <option>16:00</option>
                    </select>
                    <button type='button' onClick={() => setBreadCrumbs(1)} className=' bg-black py-4 rounded-md leading-6 text-white font-4xl font-bold mx-8'>Next</button>
                </div>
                <div className={`${breadCrumbs === 1 ? 'flex' : 'hidden'} flex-col`}>
                    <label>Name</label>
                    <input type='text'/>
                    <label>Email</label>
                    <input type='text'/>
                    <label>Confirm Email</label>
                    <input type='text'/>
                    <label>Phone</label>
                    <input type='text'/>
                    <label>Date of birth</label>
                    <input type='text'/>
                    <label>Payment</label>
                    <input type='text'/>
                    <label>Terms of conditions</label>
                    <input type='text'/>
                </div>
            </form>
        </div>
    )
}

export default Page