
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { 
  Search, 
  FilterX, 
  ChevronDown, 
  Star, 
  ShoppingBag 
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getFilteredProducts, getCategories, getMaterials, getOccasions } from "@/data/products";
import { Product } from "@/types";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-64">
        <img
          src={product.images[0]}
          alt={product.name}
          className={`w-full h-full object-cover transform transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Quick action buttons */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            variant="secondary"
            className="bg-white hover:bg-accent text-primary hover:text-secondary"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary transition-colors duration-200">
            {product.name}
          </h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
            <span className="text-sm font-medium text-gray-600">{product.rating}</span>
          </div>
        </div>
        
        <p className="mt-1 text-sm text-gray-500">{product.category} • {product.material}</p>
        
        <div className="mt-2 flex justify-between items-center">
          <p className="text-lg font-semibold text-gray-900">₹{product.price.toLocaleString()}</p>
          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
            {product.occasion}
          </span>
        </div>
      </div>
    </Link>
  );
};

const SortOptions = [
  { id: "price-low-high", name: "Price: Low to High" },
  { id: "price-high-low", name: "Price: High to Low" },
  { id: "rating-high-low", name: "Rating: High to Low" },
  { id: "newest", name: "Newest First" }
];

const Products: React.FC = () => {
  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [selectedOccasion, setSelectedOccasion] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000]);
  const [sortOption, setSortOption] = useState(SortOptions[0].id);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Product state
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [occasions, setOccasions] = useState<string[]>([]);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  
  // Load filters and initial products
  useEffect(() => {
    setCategories(getCategories());
    setMaterials(getMaterials());
    setOccasions(getOccasions());
    
    // Initial products load
    updateProducts();
  }, []);
  
  // Update products when filters change
  useEffect(() => {
    updateProducts();
  }, [searchQuery, selectedCategory, selectedMaterial, selectedOccasion, priceRange, sortOption]);
  
  const updateProducts = () => {
    let products = getFilteredProducts(
      selectedCategory || undefined,
      selectedMaterial || undefined,
      selectedOccasion || undefined,
      priceRange[0],
      priceRange[1],
      searchQuery || undefined
    );
    
    // Apply sorting
    switch (sortOption) {
      case "price-low-high":
        products = products.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        products = products.sort((a, b) => b.price - a.price);
        break;
      case "rating-high-low":
        products = products.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // Assuming newer products have higher IDs
        products = products.sort((a, b) => b.id - a.id);
        break;
    }
    
    setFilteredProducts(products);
    setCurrentPage(1); // Reset to first page when filters change
  };
  
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedMaterial("");
    setSelectedOccasion("");
    setPriceRange([0, 20000]);
    setSortOption(SortOptions[0].id);
  };
  
  // Get current page products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="bg-muted min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 text-center mb-2">
            Discover Our Collection
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Explore our exquisite range of handcrafted sarees from different regions of India, 
            each telling a unique story of tradition and artistry.
          </p>
          
          {/* Mobile Filter Toggle */}
          <div className="md:hidden flex justify-center mt-6">
            <Button 
              variant="outline" 
              className="flex items-center space-x-2"
              onClick={toggleFilter}
            >
              <span>Filters</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters - Sidebar */}
          <div className={`md:w-1/4 bg-white p-4 rounded-lg shadow-sm md:block ${isFilterOpen ? 'block' : 'hidden'}`}>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-500 hover:text-primary"
                  onClick={resetFilters}
                >
                  <FilterX className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              </div>
              
              <div className="relative mb-4">
                <Input
                  type="search"
                  placeholder="Search sarees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              
              {/* Category Filter */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategory === category}
                        onCheckedChange={() => 
                          setSelectedCategory(selectedCategory === category ? "" : category)
                        }
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Material Filter */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Material</h3>
                <div className="space-y-2">
                  {materials.map((material) => (
                    <div key={material} className="flex items-center">
                      <Checkbox
                        id={`material-${material}`}
                        checked={selectedMaterial === material}
                        onCheckedChange={() => 
                          setSelectedMaterial(selectedMaterial === material ? "" : material)
                        }
                      />
                      <label
                        htmlFor={`material-${material}`}
                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                      >
                        {material}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Occasion Filter */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Occasion</h3>
                <div className="space-y-2">
                  {occasions.map((occasion) => (
                    <div key={occasion} className="flex items-center">
                      <Checkbox
                        id={`occasion-${occasion}`}
                        checked={selectedOccasion === occasion}
                        onCheckedChange={() => 
                          setSelectedOccasion(selectedOccasion === occasion ? "" : occasion)
                        }
                      />
                      <label
                        htmlFor={`occasion-${occasion}`}
                        className="ml-2 text-sm text-gray-600 cursor-pointer"
                      >
                        {occasion}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 20000]}
                    min={0}
                    max={20000}
                    step={500}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort & Results Count */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm text-gray-600">
                Showing <span className="font-medium">{filteredProducts.length}</span> results
              </div>
              
              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="text-sm text-gray-600">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="text-sm border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                >
                  {SortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Products */}
            {currentProducts.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <h3 className="text-xl font-medium text-gray-900 mb-2">No sarees found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria.</p>
                <Button variant="outline" onClick={resetFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <div key={product.id} className="animate-fade-in">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex space-x-2" aria-label="Pagination">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`px-3 py-2 rounded-md text-sm ${
                        currentPage === index + 1
                          ? "bg-primary text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
