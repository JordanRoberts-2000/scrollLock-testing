import InputIcon from '@/utils/components/inputs/InputIcon'
import TextInput from '@/utils/components/inputs/TextInput'
import TextInputLabel from '@/utils/components/inputs/TextInputLabel'
import React from 'react'

const NewsLetterSignUp = () => {
  return (
    <div className='flex pt-4 lg:pt-0'>
        <div className='relative flex-1'>
            <TextInputLabel HtmlId={'newsletter'} className='hidden'></TextInputLabel>
            <TextInput HtmlId='newsletter' variant={'justFloor'} placeholder='Sign up to our newsletter' 
                       className='flex-1 tracking-wider border-white text-white font-playfairDisplay text-lg font-normal pl-12 bg-transparent placeholder:text-center lg:placeholder:text-left'>
                <InputIcon variant={'insideLeft'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                </InputIcon>
            </TextInput>
        </div>
    </div>
  )
}

export default NewsLetterSignUp