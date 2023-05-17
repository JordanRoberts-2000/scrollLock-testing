'use client'

import { forwardRef } from "react"
import { VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

type TextInputProps = React.HTMLAttributes<HTMLInputElement> & 
    VariantProps<typeof variants> & {
        HtmlId: string,
        valid?: null | boolean,
        inputType?: string
}

const variants = cva([
    'py-1', 'pr-8', 'pl-2', 'font-semibold', 'text-lg', 'relative', 'w-full'
    ], {
        variants: {
            variant: {
                primary: ['border-2 border-black'],
                inline: ['border-2', 'border-black', ' border-t-0', 'bg-transparent'],
                inside: [' placeholder:text-sm', 'placeholder:font-medium', 'placeholder:tracking-wide', 'placeholder:leading-6', ' placeholder:translate-y-[-2px]',
                         'border-black', 'border-2', 'rounded-md', 'placeholder:text-black'],
                justFloor: ['border-b-2 border-black', 'bg-transparent']
            },
            size: {
                small: ['py-1', 'px-4'],
                default: [],
                large: ['py-3', 'px-12']
            },
            valid: {
                true: ['']
            }
        },
        defaultVariants: {
            variant: 'primary',
            size: 'default'
        }
    }
)

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({className, HtmlId, variant, valid, size, inputType, children, ...rest}, ref) => {
    return (
        <div className="relative w-full bg-transparent">
            <input ref={ref} id={HtmlId} {...rest} className={twMerge(variants({variant, size, valid, className}))} type={inputType || ''}/>
            {children}
        </div>
    )
})

export default TextInput