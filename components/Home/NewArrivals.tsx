"use client";

import ProductCard from "../ProductCard";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import axios from "axios";
import { ProductTypes } from "@/types";

export default function NewArrivals() {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const [itemsPerView, setItemsPerView] = useState(4);
  const [showArrows, setShowArrows] = useState(true);

  const newArrivals = products.slice(0, 6);

  // ✅ Responsive Setup
  useEffect(() => {
    const updateView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2); // Mobile = 2 cards
        setShowArrows(false); // No arrows on mobile
      } else {
        setItemsPerView(4); // Desktop = 4 cards
        setShowArrows(true);
      }
    };

    updateView();
    window.addEventListener("resize", updateView);

    return () => window.removeEventListener("resize", updateView);
  }, []);

  const maxIndex = newArrivals.length - itemsPerView;

  // Slide Controls
  const nextSlide = () => {
    if (index < maxIndex) setIndex(index + 1);
  };

  const prevSlide = () => {
    if (index > 0) setIndex(index - 1);
  };

  // Total Dots
  const totalDots = maxIndex + 1;

  return (
    <section className="w-full py-8 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            New Arrivals
          </h2>
          <p className="text-gray-600 mt-2">
            Discover the latest additions to our collection
          </p>
        </div>

        {/* Slider Wrapper */}
        <div className="relative w-full overflow-hidden">
          {/* Track */}
          <motion.div
            className="flex gap-3 sm:gap-6"
            animate={{
              x: `-${index * (100 / itemsPerView)}%`,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => {
              if (info.offset.x < -80) nextSlide();
              if (info.offset.x > 80) prevSlide();
            }}
          >
            {/* ✅ Skeleton Loading */}
            {loading &&
              Array.from({ length: itemsPerView }).map((_, i) => (
                <div
                  key={i}
                  className="shrink-0"
                  style={{
                    width: `calc(${100 / itemsPerView}% - 12px)`,
                  }}
                >
                  <div className="h-80 bg-gray-200 animate-pulse border border-gray-300" />
                </div>
              ))}

            {/* ✅ Real Products */}
            {!loading &&
              newArrivals.map((item) => (
                <div
                  key={item.id}
                  className="shrink-0"
                  style={{
                    width: `calc(${100 / itemsPerView}% - 12px)`,
                  }}
                >
                  <ProductCard {...item} variant="slider" />
                </div>
              ))}
          </motion.div>

          {/* ✅ Arrows ONLY on Desktop */}
          {showArrows && !loading && (
            <>
              {/* Left Arrow */}
              <button
                onClick={prevSlide}
                disabled={index === 0}
                className="absolute top-1/2 left-2 -translate-y-1/2 
                bg-white border shadow-md p-2 rounded-full
                hover:bg-blue-600 hover:text-white
                disabled:opacity-40 transition z-10"
              >
                <ArrowLeft size={20} />
              </button>

              {/* Right Arrow */}
              <button
                onClick={nextSlide}
                disabled={index === maxIndex}
                className="absolute top-1/2 right-2 -translate-y-1/2 
                bg-white border shadow-md p-2 rounded-full
                hover:bg-blue-600 hover:text-white
                disabled:opacity-40 transition z-10"
              >
                <ArrowRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* ✅ Dot Indicators */}
        {!loading && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalDots }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition ${
                  i === index ? "bg-blue-600 scale-125" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
