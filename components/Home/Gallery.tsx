import { Button } from "../ui/button";
import ProductCard from "../ProductCard";
import prisma from "@/lib/prisma";

export default async function Gallery() {
  const products = await prisma.product.findMany();
  const categories = await prisma.category.findMany();
  return (
    <section className="w-full py-8 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Explore All Products
          </h2>
          <p className="text-gray-600 text-lg">
            Filter by category to find what you love
          </p>
          <div className="w-12 h-1 bg-linear-to-r from-blue-600 to-blue-800 mt-4 rounded-full"></div>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 pb-12 overflow-x-auto scrollbar-hide">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg whitespace-nowrap">
            All Products
          </Button>

          {categories.slice(0, 7).map((item, i) => (
            <Button
              key={i}
              variant="outline"
              className="border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 font-semibold px-6 py-2 rounded-lg whitespace-nowrap transition-all"
            >
              {item.title}
            </Button>
          ))}
        </div>

        {/* ✅ Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
