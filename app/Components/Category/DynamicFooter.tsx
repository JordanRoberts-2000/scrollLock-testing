'use client'
const DynamicImport = dynamic(() => import('../Footer/Footer'));
import dynamic from 'next/dynamic';
import { useStore } from '@/zustand/store';

const DynamicFooter = ({title}: {title:string}) => {
    const { categoryClicked } = useStore()
    return (
        <>
            {categoryClicked === title &&  <DynamicImport embedded={true}/>}
        </>
    )
}

export default DynamicFooter