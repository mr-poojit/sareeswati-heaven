
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { getProductById } from "@/data/products";
import { Product } from "@/types";
import { ChevronLeft, ChevronRight, Star, ShoppingBag, Heart, Share2, Truck, Shield, RefreshCw } from "lucide-react";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // Fetch product details
    if (id) {
      const productData = getProductById(parseInt(id, 10));
      if (productData) {
        setProduct(productData);
        setLoading(false);
      } else {
        // Product not found
        toast({
          title: "Product not found",
          description: "We couldn't find the saree you're looking for.",
          variant: "destructive",
        });
        navigate("/products");
      }
    }
  }, [id, navigate, toast]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      toast({
        title: "Added to cart!",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity));
  };
  
  const handlePrevImage = () => {
    if (product) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };
  
  const handleNextImage = () => {
    if (product) {
      setCurrentImageIndex((prev) => 
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  const handleImageZoom = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-96">
          <div className="animate-pulse space-y-8 w-full max-w-4xl">
            <div className="flex space-x-8">
              <div className="w-1/2 h-96 bg-gray-200 rounded-lg"></div>
              <div className="w-1/2 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-10 bg-gray-200 rounded w-1/3 mt-8"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Product Not Found</h2>
          <p className="mt-2 text-gray-600">The saree you're looking for doesn't exist or has been removed.</p>
          <Button 
            className="mt-6" 
            onClick={() => navigate("/products")}
          >
            Browse All Sarees
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Collection
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div 
              className="relative bg-gray-50 rounded-lg overflow-hidden h-96 sm:h-[500px] flex items-center justify-center"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleImageZoom}
            >
              <div 
                className="w-full h-full transition-transform duration-300"
                style={{
                  backgroundImage: `url(${product.images[currentImageIndex]})`,
                  backgroundSize: isZoomed ? '150%' : 'contain',
                  backgroundPosition: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
              
              <button 
                onClick={handlePrevImage}
                className="absolute left-4 bg-white bg-opacity-70 rounded-full p-1 shadow-md hover:bg-opacity-100 transition-all"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 text-gray-800" />
              </button>
              
              <button 
                onClick={handleNextImage}
                className="absolute right-4 bg-white bg-opacity-70 rounded-full p-1 shadow-md hover:bg-opacity-100 transition-all"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 text-gray-800" />
              </button>
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex space-x-2 overflow-x-auto pb-1">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                    currentImageIndex === index
                      ? "border-primary scale-105"
                      : "border-transparent opacity-80 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-playfair font-bold text-gray-900">
                {product.name}
              </h1>
              
              <div className="mt-2 flex items-center">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-5 w-5 ${
                        index < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : index < product.rating
                          ? "text-yellow-400 fill-current opacity-50"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} ({product.reviews.length} reviews)
                </span>
              </div>
              
              <div className="mt-4">
                <span className="text-2xl font-semibold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                <span className="ml-2 text-sm text-gray-600 line-through">
                  ₹{Math.round(product.price * 1.2).toLocaleString()}
                </span>
                <span className="ml-2 text-sm text-green-600">
                  (20% off)
                </span>
              </div>
            </div>
            
            <div className="h-px bg-gray-200"></div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900">Description</h3>
              <p className="mt-2 text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
            
            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Category</h3>
                <p className="mt-1 text-gray-600">{product.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Material</h3>
                <p className="mt-1 text-gray-600">{product.material}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Occasion</h3>
                <p className="mt-1 text-gray-600">{product.occasion}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Colors</h3>
                <div className="mt-1 flex space-x-1">
                  {product.colors.map((color) => (
                    <span 
                      key={color} 
                      className="px-2 py-1 text-xs bg-gray-100 rounded-full text-gray-700"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="h-px bg-gray-200"></div>
            
            {/* Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-900 w-20">Quantity</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="h-8 w-8 rounded-full"
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="h-8 w-8 rounded-full"
                  >
                    +
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 sm:flex-none sm:min-w-[200px]"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                
                <Button variant="outline" className="flex-1 sm:flex-none">
                  <Heart className="h-5 w-5 mr-2" />
                  Add to Wishlist
                </Button>
                
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Shipping & Returns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start space-x-2">
                <Truck className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Free Shipping</h4>
                  <p className="text-xs text-gray-600">On orders over ₹1000</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Secure Payment</h4>
                  <p className="text-xs text-gray-600">100% secure payment</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <RefreshCw className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Easy Returns</h4>
                  <p className="text-xs text-gray-600">10 day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Reviews Section */}
        <div className="my-16">
          <h2 className="text-2xl font-playfair font-semibold text-gray-900 mb-8">
            Customer Reviews
          </h2>
          
          <div className="space-y-8">
            {product.reviews.map((review) => (
              <div 
                key={review.id} 
                className="bg-gray-50 rounded-lg p-6 animate-fade-in"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{review.userName}</h3>
                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${
                            index < Math.floor(review.rating)
                              ? "text-yellow-400 fill-current"
                              : index < review.rating
                              ? "text-yellow-400 fill-current opacity-50"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <p className="mt-3 text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button variant="outline">
              Write a Review
            </Button>
          </div>
        </div>
        
        {/* You May Also Like Section */}
        <div className="my-16">
          <h2 className="text-2xl font-playfair font-semibold text-gray-900 mb-8">
            You May Also Like
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-lg p-4 h-64 animate-pulse flex flex-col justify-center items-center"
              >
                <div className="w-full h-32 bg-gray-200 rounded-md mb-4"></div>
                <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                <div className="w-1/2 h-4 bg-gray-200 rounded mt-2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
