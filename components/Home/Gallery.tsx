import { Button } from '../ui/button'
import ProductCard from '../ProductCard';
import { categories, products } from '@/data';

export default function Gallery() {
    
    return (
        <div className='px-2'>
            <div className='flex gap-4 pb-10'>
                {categories.slice(0, 8).map((item, i) => (
                    <Button key={i} variant={"outline"}>
                        {item.title}
                    </Button>
                ))}
            </div>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-2'>
                {products.map((item, i) => (
                    <ProductCard {...item} key={item.id} />
                ))}
            </div>
        </div>
    )
}
