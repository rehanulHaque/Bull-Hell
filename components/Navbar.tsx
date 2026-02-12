import { Input } from "./ui/input";
import { Search, ShoppingCart, Heart, Instagram } from "lucide-react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent tracking-tight">
              Blue Hell
            </h1>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                placeholder="Search products, brands..."
                className="pr-10 bg-gray-50 border-gray-300 focus:bg-white"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Right Actions */}
          
          <div className="">
              <Instagram className="w-5 h-5 text-gray-600"/>
          </div>
        </div>
      </div>
    </nav>
  );
}
