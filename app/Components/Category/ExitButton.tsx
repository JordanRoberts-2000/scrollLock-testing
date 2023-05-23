'use client'

type ExitButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
    active: boolean
}

const ExitButton = ({active, ...rest}: ExitButtonProps) => {
    return (
        <button {...rest} className={`bg-black ${active ? "opacity-100 pointer-events-auto  duration-300 delay-500" : "opacity-0 pointer-events-none duration-100"} p-2 rounded-full fixed bottom-0 right-0 m-4 z-40`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="white" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
    )
}

export default ExitButton