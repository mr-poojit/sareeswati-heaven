
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  ArrowRight, 
  Star, 
  Truck, 
  Undo2, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Regular Customer",
    content: "The Banarasi silk saree I purchased from Sareeswati exceeded all my expectations. The intricate zari work and rich color made me feel like royalty at my cousin's wedding. Their quality and craftsmanship are unmatched!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop",
    rating: 5
  },
  {
    id: 2,
    name: "Meera Patel",
    role: "Fashion Designer",
    content: "As a designer, I'm very particular about textile quality and authenticity. Sareeswati offers some of the most beautiful handwoven sarees I've seen. Their collection preserves traditional techniques while incorporating contemporary elements.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&auto=format&fit=crop",
    rating: 5
  },
  {
    id: 3,
    name: "Anjali Desai",
    role: "Wedding Planner",
    content: "I recommend Sareeswati to all my brides. Their collection ranges from subtle elegance to elaborate grandeur, perfect for every wedding occasion. The customer service is exceptional, and they always deliver on time.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&auto=format&fit=crop",
    rating: 4.5
  }
];

// Categories data
const categories = [
  {
    id: "silk",
    name: "Silk Sarees",
    description: "Luxurious silk sarees including Banarasi, Kanjeevaram, and Patola",
    image: "https://utsarees.in/cdn/shop/files/WhatsAppImage2024-06-24at11.25.20AM.jpg?v=1719213298"
  },
  {
    id: "cotton",
    name: "Cotton Sarees",
    description: "Breathable cotton sarees perfect for daily wear and summer months",
    image: "https://images.meesho.com/images/products/229462928/pihko_512.webp"
  },
  {
    id: "designer",
    name: "Designer Sarees",
    description: "Contemporary designer pieces for special occasions and parties",
    image: "https://dailybuyys.com/cdn/shop/products/492145af-d924-4ebf-9709-36d7d9046913.jpg?v=1681559620"
  },
  {
    id: "traditional",
    name: "Traditional Sarees",
    description: "Handcrafted regional sarees celebrating India's diverse heritage",
    image: "https://www.jiomart.com/images/product/original/rvcmwqeyb3/lasfira-women-s-traditional-wear-simple-design-silk-saree-with-unstitched-blouse-piece-product-images-rvcmwqeyb3-2-202310281204.jpg?im=Resize=(500,630)"
  }
];

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-secondary/90 to-primary/90 text-white">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1597983073750-16f05299c761?w=1920&auto=format&fit=crop" 
          alt="Elegant Saree Background" 
          className="w-full h-full object-cover object-center opacity-20"
        />
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold mb-4 animate-fade-in">
              Discover Timeless <br /> Elegance in Every Drape
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-lg opacity-90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Explore our exquisite collection of handcrafted sarees, each telling a unique story of tradition, artistry, and heritage.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
                <Link to="/products">
                  Explore Collection <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary">
                <Link to="/products">New Arrivals</Link>
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96 animate-float">
              <div className="absolute inset-0 bg-white rounded-full opacity-10 animate-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1620330128941-95c429d97851?w=800&auto=format&fit=crop&q=80" 
                alt="Featured Saree" 
                className="h-full w-full object-cover object-center rounded-full shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedCategories = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-4">Browse Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of sarees from different regions of India, each with its unique weaving techniques and designs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link 
              key={category.id} 
              to={`/products?category=${category.id}`}
              className="group block bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 mt-1">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center text-primary font-medium">
                  <span>Explore</span>
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const featuredProducts = products.slice(0, 4);
  
  const handleAddToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product, 1);
    }
  };
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-4">Bestselling Sarees</h2>
            <p className="text-gray-600 max-w-2xl">
              Our most loved pieces, cherished for their exquisite craftsmanship and timeless appeal.
            </p>
          </div>
          <Link 
            to="/products" 
            className="mt-4 md:mt-0 font-medium text-primary hover:text-secondary flex items-center group"
          >
            View All Collection
            <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link to={`/products/${product.id}`} className="block relative overflow-hidden h-64 group">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <div className="p-4">
                <Link to={`/products/${product.id}`}>
                  <h3 className="text-lg font-medium text-gray-900 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) 
                            ? "text-yellow-400 fill-current" 
                            : "text-gray-300"
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-1">
                    ({product.reviews.length})
                  </span>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    ₹{product.price.toLocaleString()}
                  </span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="hover:bg-primary hover:text-white"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-16 bg-gradient-to-r from-secondary/5 to-primary/5">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-playfair font-bold text-gray-900 text-center mb-12">
          What Our Customers Say
        </h2>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg p-6 md:p-10">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={`transition-opacity duration-500 ${
                  index === activeIndex ? "opacity-100" : "opacity-0 absolute inset-0"
                }`}
              >
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="flex-shrink-0">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-primary/20"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${
                            i < Math.floor(testimonial.rating) 
                              ? "text-yellow-400 fill-current" 
                              : i < testimonial.rating
                              ? "text-yellow-400 fill-current opacity-50"
                              : "text-gray-300"
                          }`} 
                        />
                      ))}
                    </div>
                    <blockquote className="text-lg md:text-xl text-gray-700 italic mb-4">
                      "{testimonial.content}"
                    </blockquote>
                    <div>
                      <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 md:-translate-x-5">
            <button 
              onClick={prevTestimonial}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>
          </div>
          
          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 md:translate-x-5">
            <button 
              onClick={nextTestimonial}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
          </div>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === activeIndex ? "bg-primary" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Truck className="h-10 w-10 text-primary" />,
      title: "Free Shipping",
      description: "On all orders above ₹2000"
    },
    {
      icon: <Undo2 className="h-10 w-10 text-primary" />,
      title: "Easy Returns",
      description: "10-day return policy"
    },
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: "Secure Payments",
      description: "Multiple payment options"
    }
  ];
  
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-lg border border-gray-100"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Instagram = () => {
  const images = [
    "https://images.unsplash.com/photo-1614141857234-0c97115a0d46?w=300&h=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1614141857229-00c30c7e5190?w=300&h=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1619430041588-7fb756fa654d?w=300&h=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1602240834648-65dd54459d79?w=300&h=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595950748889-1a39300f2da7?w=300&h=300&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1610189019677-8c58cb052d45?w=300&h=300&auto=format&fit=crop"
  ];
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
            Follow Our Instagram
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join our community of saree enthusiasts and stay updated with our latest collections and styling tips.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {images.map((image, index) => (
            <a 
              key={index}
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative overflow-hidden group block h-40 sm:h-48 animate-fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img 
                src={image} 
                alt="Instagram post"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium">View Post</span>
              </div>
            </a>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:text-secondary font-medium"
          >
            @sareeswati_official
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

const Newsletter = () => {
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    alert(`Thank you for subscribing with email: ${email}`);
    setEmail("");
  };
  
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-playfair font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="mb-6 opacity-90">
            Sign up to receive updates on new arrivals, special offers, and styling tips.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <Button 
              type="submit"
              className="bg-white text-primary hover:bg-white/90"
            >
              Subscribe
            </Button>
          </form>
          
          <p className="mt-4 text-sm opacity-80">
            By subscribing, you agree to receive marketing emails from Sareeswati.
          </p>
        </div>
      </div>
    </section>
  );
};

const Index = () => {
  return (
    <div>
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <Testimonials />
      <Features />
      <Instagram />
      <Newsletter />
    </div>
  );
};

export default Index;
