'use client'

import Image from "next/image"
import { HTMLAttributes } from "react"

type GalleryProps = HTMLAttributes<HTMLDivElement> & {
    galleryImageUrls: {
        url: string,
        placeholder: string,
        blurImageUrl: string
    }[]
}

const Gallery = ({galleryImageUrls, ...rest}:GalleryProps) => {
  return (
    <>
        {galleryImageUrls.map(({url, placeholder, blurImageUrl}) => (
            <div key={url} className="flex-shrink-0 w-full relative" {...rest} >
                <Image alt={placeholder} loading="lazy" fill src={url} className={`object-cover select-none`} 
                    placeholder="blur" blurDataURL={blurImageUrl} sizes="100vw"/>
            </div>
        ))}
    </>
  )
}

export default Gallery