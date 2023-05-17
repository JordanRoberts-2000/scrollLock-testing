import { VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

type OptionalSpan = React.HTMLAttributes<HTMLSpanElement> & 
    VariantProps<typeof variants> & {
    valid?: boolean | null,
    message?: string
}

const variants = cva([
    'text-sm', 'font-semibold', 'flex', 'items-center'
    ], {
        variants: {
            variant: {
                primary: ['absolute', 'right-0', 'bottom-[100%]', 'mr-2', 'mb-[2px]'],
                inLabel: ['ml-2']
            },
            size: {
                small: ['py-1', 'px-4'],
                default: [],
                large: ['py-3', 'px-12']
            },
            validValue: {
                true: [''],
                false: ['']
            }
        },
        defaultVariants: {
            variant: 'primary',
            size: 'default'
        }
    }
)

const OptionalLabel = ({message, variant, size, validValue, className}: OptionalSpan) => {
  return (
    <span className={twMerge(variants({variant, size, validValue, className}))}>{message || '( Optional )'}</span>
  )
}

export default OptionalLabel