"use client";

// import { categories } from "@/data";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CategoriesTypes } from "@/types";
import axios from "axios";

export default function Category() {
  const [categories, setCategories] = useState<CategoriesTypes[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/category");
      setCategories(response.data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Split categories into groups of 4 (2x2)
  const groupedCategories = [];
  for (let i = 0; i < categories.length; i += 4) {
    groupedCategories.push(categories.slice(i, i + 4));
  }

  const maxIndex = groupedCategories.length - 1;

  return (
    <section className="w-full py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-full">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our curated collections
          </p>
          <div className="w-12 h-1 bg-linear-to-r from-blue-600 to-blue-800 mt-4 rounded-full"></div>
        </div>

        {/* ✅ Skeleton Loading */}
        {loading && (
          <>
            {/* Desktop Skeleton */}
            <div className="hidden lg:grid grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>

            {/* Mobile Skeleton */}
            <div className="lg:hidden grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </>
        )}

        {/* ✅ Desktop Grid */}
        {!loading && (
          <div className="hidden lg:grid grid-cols-4 gap-6">
            {categories.map((product) => (
              <CategoryCard key={product.title} product={product} />
            ))}
          </div>
        )}

        {/* ✅ Mobile Slider */}
        {!loading && (
          <div className="lg:hidden overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${index * 100}%` }}
              transition={{ duration: 0.5 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(e, info) => {
                if (info.offset.x < -80 && index < maxIndex)
                  setIndex(index + 1);
                if (info.offset.x > 80 && index > 0)
                  setIndex(index - 1);
              }}
            >
              {groupedCategories.map((group, i) => (
                <div
                  key={i}
                  className="min-w-full grid grid-cols-2 gap-4 px-1"
                >
                  {group.map((product) => (
                    <CategoryCard key={product.title} product={product} />
                  ))}
                </div>
              ))}
            </motion.div>

            {/* ✅ Dot Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {groupedCategories.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition ${
                    i === index ? "bg-blue-600 scale-125" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ✅ Category Skeleton Card */
function SkeletonCard() {
  return (
    <div className="relative overflow-hidden bg-gray-200 h-40 sm:h-56 border border-gray-300 animate-pulse">
      <div className="absolute bottom-3 left-3 w-24 h-4 bg-gray-300 rounded"></div>
    </div>
  );
}

/* ✅ Reusable Category Card */
function CategoryCard({ product }: any) {
  return (
    <Link href={"/category/" + product.category} className="group block">
      <div className="relative overflow-hidden bg-gray-100 h-40 sm:h-56 border border-gray-200 hover:border-blue-300 transition-all duration-300">
        {/* Image */}
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-3">
          <h3 className="text-white text-lg font-bold">{product.title}</h3>
          <p className="text-blue-300 text-xs font-semibold mt-1">
            Explore →
          </p>
        </div>

        {/* Static Title */}
        <div className="absolute bottom-0 left-0 right-0 p-3 opacity-100 group-hover:opacity-0 transition">
          <h3 className="text-gray-900 text-sm font-bold">{product.title}</h3>
        </div>
      </div>
    </Link>
  );
}
