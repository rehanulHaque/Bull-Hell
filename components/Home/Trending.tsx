import { products } from '@/data';
import ProductCard from '../ProductCard';

export default function Trending() {
    return (
        <div className="px-2 py-10">
            <div>
                <h1 className="text-center text-3xl font-bold pb-10">What's Trending</h1>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-2'>
                {products.slice(0, 4).map((item, i) => (
                    <ProductCard {...item} key={item.id}/>
                ))}
            </div>
        </div>
    )
}
