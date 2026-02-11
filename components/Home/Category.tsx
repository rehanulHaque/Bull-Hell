import { categories } from "@/data";
import Image from "next/image";
import Link from "next/link";

export default function Category() {
  return (
    <div className="px-2">
      <div>
        <h1 className="text-center text-3xl font-bold pb-10">Category</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {categories.map(product => (
            <Link href={"/category/" + product.category} className="overflow-hidden" key={product.title}>
                <div className="hover:scale-110 transition duration-300">
                <div>
                    <Image src={product.image} alt={product.title} width={200} height={200} className="w-full"/>
                </div>
                <div>
                    <h1 className=" text-center text-2xl py-4">{product.title}</h1>
                </div>
                </div>
            </Link>
        ))}
      </div>
    </div>
  )
}
