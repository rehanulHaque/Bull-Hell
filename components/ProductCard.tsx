import { ProductTypes } from '@/types'
import Image from 'next/image'
import { Button } from './ui/button'

export default function ProductCard({ title, image, category, price }: ProductTypes) {
    return (
        <div
            className="border border-slate-200 bg-white"
        >
            <Image
                src={image}
                alt={title}
                width={500}
                height={500}
                className="w-full h-100 object-cover"
            />

            {/* Info */}
            <div className="px-4 pb-3 pt-1">
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="font-bold mb-2">${price}</p>
                <Button className='w-full'>Go Get It</Button>
            </div>
        </div>
    )
}
