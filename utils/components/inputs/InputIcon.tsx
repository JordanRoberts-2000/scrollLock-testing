import { VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

type ErrorMessageProps = React.HTMLAttributes<HTMLDivElement> & 
    VariantProps<typeof variants>

const variants = cva([
    'absolute'
    ], {
        variants: {
            variant: {
                outsideLeft: ['right-[100%]', 'top-[50%]', 'translate-y-[-50%]', 'mr-1'],
                outsideRight: ['left-[100%]', 'top-[50%]', 'translate-y-[-50%]', 'ml-1'],
                insideLeft: ['left-0', 'top-[50%]', 'translate-y-[-50%]', 'ml-2'],
                insideRight: ['right-0', 'top-[50%]', 'translate-y-[-50%]', 'mr-1']
            },
        },
        defaultVariants: {
            variant: 'outsideLeft',
        }
    }
)

const InputIcon = ({children, className, variant}: ErrorMessageProps) => {
  return (
    <div className={twMerge(variants({variant, className}))}>
        {children}
    </div>
  )
}

export default InputIcon