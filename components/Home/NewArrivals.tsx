"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function NewArrivals() {
  const products = [
    { img: "/banner-1.jpg", title: "Polo Shirt", category: "T-Shirt", price: 100 },
    { img: "/banner-2.jpg", title: "Casual Hoodie", category: "Winter Wear", price: 120 },
    { img: "/banner-3.jpg", title: "Denim Jacket", category: "Jacket", price: 180 },
    { img: "/banner-1.jpg", title: "Sneakers", category: "Shoes", price: 90 },
    { img: "/banner-2.jpg", title: "Formal Shirt", category: "Office Wear", price: 110 },
    { img: "/banner-3.jpg", title: "Jeans Pant", category: "Denim", price: 150 },
  ];

  const [index, setIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  // ✅ Responsive Items Per Screen
  useEffect(() => {
    const updateView = () => {
      if (window.innerWidth < 640) setItemsPerView(1); // mobile
      else if (window.innerWidth < 1024) setItemsPerView(2); // tablet
      else setItemsPerView(4); // desktop
    };

    updateView();
    window.addEventListener("resize", updateView);

    return () => window.removeEventListener("resize", updateView);
  }, []);

  const maxIndex = products.length - itemsPerView;

  // Move One Item At A Time
  const nextSlide = () => {
    if (index < maxIndex) setIndex(index + 1);
  };

  const prevSlide = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="w-full py-10 px-2">
      {/* Heading */}
      <h1 className="font-bold text-3xl text-center mb-8">
        New Arrivals
      </h1>

      {/* Slider Wrapper */}
      <div className="relative w-full overflow-hidden">
        {/* Track */}
        <motion.div
          className="flex gap-2"
          animate={{
            x: `-${index * (100 / itemsPerView)}%`,
          }}
          transition={{ duration: 0.5 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(e, info) => {
            if (info.offset.x < -80) nextSlide();
            if (info.offset.x > 80) prevSlide();
          }}
        >
          {products.map((item, i) => (
            <div
              key={i}
              className="shrink-0 border border-slate-200 bg-white"
              style={{
                width: `${98 / itemsPerView}%`,
              }}
            >
              {/* Image (No Rounded) */}
              <Image
                src={item.img}
                alt={item.title}
                width={500}
                height={500}
                className="w-full h-100 object-cover"
              />

              {/* Info */}
              <div className="p-4">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-slate-500">{item.category}</p>
                <p className="font-bold mt-2">${item.price}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          disabled={index === 0}
          className="absolute top-1/2 left-2 -translate-y-1/2 
          bg-black/50 text-white px-3 py-2 disabled:opacity-30"
        >
          <ArrowLeft/>
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          disabled={index === maxIndex}
          className="absolute top-1/2 right-2 -translate-y-1/2 
          bg-black/50 text-white px-3 py-2 disabled:opacity-30"
        >
          <ArrowRight/>
        </button>
      </div>
    </div>
  );
}
