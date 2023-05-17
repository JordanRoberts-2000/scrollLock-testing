import { VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

type ErrorMessageProps = React.HTMLAttributes<HTMLSpanElement> & 
    VariantProps<typeof variants> & {
    valid: boolean | null,
    message: string
}

const variants = cva([
    'absolute', 'text-red-600', 'transition', 'text-sm', 'font-semibold', 'ml-1', ' duration-1000'
    ], {
        variants: {
            variant: {
                bottomLeft: ['top-[100%]', 'left-0'],
                topLeft: ['bottom-[100%]', 'left-0'],
                topRight: ['bottom-[100%]', 'right-0', 'mr-2'],
                topMiddle: ['bottom-[100%]', 'left-[50%]', 'translate-x-[-50%]'],
                bottomMiddle: ['top-[100%]', 'left-[50%]', 'translate-x-[-50%]']
            },
            size: {
                small: ['py-1', 'px-4'],
                default: [],
                large: ['py-3', 'px-12']
            },
            validValue: {
                true: ['opacity-0'],
                false: ['opacity-100']
            }
        },
        defaultVariants: {
            variant: 'bottomLeft',
            size: 'default'
        }
    }
)

const ErrorMessage = ({valid, message, className, variant, size}: ErrorMessageProps) => {
    let validValue = valid
    if(valid === null)validValue = true
    return (
        <span className={twMerge(variants({variant, size, validValue, className}))}>
            {message}
        </span>
    )
}

export default ErrorMessage