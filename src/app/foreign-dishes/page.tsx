"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ForeignDishesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Sample categories for filtering
  const categories = [
    { id: "all", name: "All Dishes" },
    { id: "italian", name: "Italian" },
    { id: "chinese", name: "Chinese" },
    { id: "indian", name: "Indian" },
    { id: "mexican", name: "Mexican" },
    { id: "japanese", name: "Japanese" }
  ];
  
  // Sample dishes data
  const dishes = [
    {
      id: "fd-001",
      name: "Margherita Pizza",
      category: "italian",
      description: "Classic Italian pizza with tomato sauce, mozzarella, and basil",
      price: 12.99,
      image: "/images/dishes/margherita-pizza.jpg",
      dietaryTags: ["vegetarian"]
    },
    {
      id: "fd-002",
      name: "Kung Pao Chicken",
      category: "chinese",
      description: "Spicy stir-fried chicken with peanuts, vegetables, and chili peppers",
      price: 14.99,
      image: "/images/dishes/kung-pao-chicken.jpg",
      dietaryTags: []
    },
    {
      id: "fd-003",
      name: "Butter Chicken",
      category: "indian",
      description: "Tender chicken in a rich, creamy tomato sauce with Indian spices",
      price: 15.99,
      image: "/images/dishes/butter-chicken.jpg",
      dietaryTags: []
    },
    {
      id: "fd-004",
      name: "Beef Tacos",
      category: "mexican",
      description: "Corn tortillas filled with seasoned beef, lettuce, cheese, and salsa",
      price: 10.99,
      image: "/images/dishes/beef-tacos.jpg",
      dietaryTags: []
    },
    {
      id: "fd-005",
      name: "Sushi Platter",
      category: "japanese",
      description: "Assorted sushi rolls and sashimi with wasabi, ginger, and soy sauce",
      price: 22.99,
      image: "/images/dishes/sushi-platter.jpg",
      dietaryTags: ["pescatarian"]
    },
    {
      id: "fd-006",
      name: "Vegetable Pad Thai",
      category: "thai",
      description: "Stir-fried rice noodles with tofu, vegetables, and peanuts in a tangy sauce",
      price: 13.99,
      image: "/images/dishes/pad-thai.jpg",
      dietaryTags: ["vegetarian", "vegan"]
    }
  ];
  
  // Filter dishes based on active category
  const filteredDishes = activeCategory === "all" 
    ? dishes 
    : dishes.filter(dish => dish.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/foreign-dishes-hero.jpg"
            alt="Foreign Dishes"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
            Foreign Dishes
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Explore international flavors from around the world, prepared with authentic recipes and techniques
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Dishes Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDishes.map(dish => (
              <div key={dish.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="h-64 relative">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-medium">{dish.name}</h3>
                    <span className="text-primary font-semibold">${dish.price.toFixed(2)}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{dish.description}</p>
                  
                  {dish.dietaryTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {dish.dietaryTags.map(tag => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <button className="w-full py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors">
                    Add to Order
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredDishes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No dishes found in this category.</p>
              <button 
                className="mt-4 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
                onClick={() => setActiveCategory("all")}
              >
                View All Dishes
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-semibold mb-6">
            Try Our Ethiopian Specialties
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            While you're here, don't miss our authentic Ethiopian dishes prepared with traditional recipes and spices.
          </p>
          <Link 
            href="/" 
            className="px-8 py-3 bg-white text-primary rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Explore Ethiopian Menu
          </Link>
        </div>
      </section>
    </div>
  );
}
