import { VariantProps, cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

type LabelProps =  React.HTMLAttributes<HTMLLabelElement> & 
VariantProps<typeof variants> & {
    HtmlId: string,
    valid?: null | boolean,
    inlineClass?: string
}

const variants = cva([
    'whitespace-nowrap', 'font-semibold', 'pointer-events-none', 'flex'
    ], {
        variants: {
            variant: {
                primary: [''],
                inline: ['translate-y-[-50%]', 'mx-2'],
                inside: ['hidden']
            },
            size: {
                small: ['text-sm'],
                default: [''],
                large: ['text-xl']
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

const variantsWrapper = cva([
    'pointer-events-none'
    ], {
        variants: {
            variant: {
                primary: ['',],
                inline: ['w-full', 'absolute', 'flex', 'top-0', 'z-10'],
                inside: [''],
            },
            size: {
                small: ['text-sm'],
                default: [''],
                large: ['text-xl']
            },
            valid: {
                true: ['']
            }
        },
        defaultVariants: {
            variant: 'primary',
            size: 'default',
        }
    }
)

const variantsLeft = cva([
    ''
    ], {
        variants: {
            variant: {
                primary: ['',],
                inline: ['w-[1rem]', 'h-[2px]'],
                inside: ['']
            },
            size: {
                small: ['text-sm'],
                default: [''],
                large: ['text-xl']
            },
            valid: {
                true: ['']
            }
        },
        defaultVariants: {
            variant: 'primary',
            size: 'default',
        }
    }
)

const variantsRight = cva([
    ''
    ], {
        variants: {
            variant: {
                primary: ['',],
                inline: ['flex-1', 'h-[2px]'],
                inside: ['']
            },
            size: {
                small: ['text-sm'],
                default: [''],
                large: ['text-xl']
            },
            valid: {
                true: ['']
            }
        },
        defaultVariants: {
            variant: 'primary',
            size: 'default',
        }
    }
)

const TextInputLabel = ({children, className, variant, size, valid, HtmlId, inlineClass}: LabelProps) => {
  return (
    <div className={twMerge(variantsWrapper({variant, size, valid}))}>
        <div className={`${twMerge(variantsLeft({variant, size, valid}))} ${inlineClass}`}></div>
        <label htmlFor={HtmlId} className={twMerge(variants({variant, size, valid, className}))}>
            {children}
        </label>
        <div className={`${twMerge(variantsRight({variant, size, valid}))} ${inlineClass}`}></div>
    </div>
  )
}

export default TextInputLabel