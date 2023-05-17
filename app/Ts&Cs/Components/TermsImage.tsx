'use client'

import { useStore } from "@/zustand/store"
import Image from "next/image"

const TermsImage = () => {
    const handleOnload = () => {
        useStore.setState(() => ({termsImageLoaded: true}))
    }
    return (
        <Image alt="A view of pocahontas beach" fill src={'http://res.cloudinary.com/dewhcvhvq/image/upload/v1684266095/drsqvbva0mgzm2o0dra9.webp'} className="object-cover" onLoadingComplete={() => handleOnload()}/>
    )
}

export default TermsImage