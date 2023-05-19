'use client'

import { useStore } from '@/zustand/store'

const ResizableLargeBlock = () => {
    const { footerExtended } = useStore()
    return (
        <div className={`bg-zinc-950 w-full ${footerExtended ? " h-[60vh]" : "h-0 duration-700"}`}></div>
    )
}

export default ResizableLargeBlock