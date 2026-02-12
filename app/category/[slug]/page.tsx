import Link from "next/link";
import { products } from "@/data";
import ProductCard from "@/components/ProductCard";

export default async function Page({params}: {params: Promise<{slug: string}>}) {
  const slug = (await params).slug;

  // ✅ Filter Products By Category
  const filteredProducts = products.filter(
    (item) => item.category.toLowerCase() === slug.toLowerCase()
  );

  return (
    <section className="w-full bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/category" className="hover:text-blue-600 transition">
            Categories
          </Link>
          <span className="mx-2">/</span>
          <span className="capitalize font-medium text-gray-800">
            {slug}
          </span>
        </div>

        {/* Category Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 capitalize">
              {slug}
            </h1>
            <p className="text-gray-600 mt-2">
              Browse our best collection of{" "}
              <span className="font-semibold capitalize">{slug}</span>.
            </p>
          </div>

          {/* Product Count */}
          <div className="text-gray-500 text-sm">
            {filteredProducts.length} Products Found
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-10 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              No Products Available 😢
            </h2>
            <p className="text-gray-500 mb-6">
              We couldn’t find any products in this category right now.
            </p>

            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((item) => (
                <ProductCard key={item.id} {...item} />
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-14 text-center">
              <Link
                href="/"
                className="inline-block text-blue-600 font-semibold hover:underline"
              >
                ← Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
