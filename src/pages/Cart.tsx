
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, Trash2, ShoppingBag, ChevronLeft, ArrowRight } from "lucide-react";

const EmptyCart = () => (
  <div className="text-center py-16 px-4">
    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
      <ShoppingBag className="h-12 w-12 text-gray-400" />
    </div>
    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
    <p className="text-gray-600 mb-8 max-w-md mx-auto">
      Looks like you haven't added anything to your cart yet. Explore our collection to find beautiful sarees.
    </p>
    <Link to="/products">
      <Button>
        Browse Collection
      </Button>
    </Link>
  </div>
);

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const handleQuantityUpdate = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };
  
  const handleRemoveItem = (productId: number) => {
    removeFromCart(productId);
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart."
    });
  };
  
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (promoCode.toLowerCase() === "welcome10") {
      setPromoApplied(true);
      toast({
        title: "Promo code applied!",
        description: "You've received a 10% discount on your order."
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "The promo code you entered is invalid or expired.",
        variant: "destructive"
      });
    }
  };
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to complete your purchase.",
        variant: "destructive"
      });
      navigate("/signin?redirect=checkout");
      return;
    }
    
    setIsCheckingOut(true);
    
    // Simulate processing
    setTimeout(() => {
      navigate("/checkout");
      setIsCheckingOut(false);
    }, 800);
  };
  
  // Calculate values
  const subtotal = getTotalPrice();
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 2000 ? 0 : 100;
  const total = subtotal - discount + shipping;
  
  if (items.length === 0) {
    return <EmptyCart />;
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-primary transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Continue Shopping
          </button>
          <h1 className="text-2xl font-playfair font-bold text-gray-900 ml-auto mr-auto">
            Your Shopping Cart
          </h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div 
                key={item.product.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden animate-fade-in"
              >
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="sm:w-24 sm:h-24 w-full h-36 bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  
                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.product.category} • {item.product.material}
                        </p>
                      </div>
                      <div className="mt-2 sm:mt-0 text-right">
                        <span className="text-lg font-semibold text-gray-900">
                          ₹{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityUpdate(item.product.id, item.quantity - 1)}
                          className="p-1 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4 text-gray-600" />
                        </button>
                        
                        <span className="w-8 text-center font-medium text-gray-900">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => handleQuantityUpdate(item.product.id, item.quantity + 1)}
                          className="p-1 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => handleRemoveItem(item.product.id)}
                        className="text-gray-600 hover:text-red-600 transition-colors flex items-center"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        <span className="text-sm">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex justify-between items-center mt-6">
              <Button
                variant="ghost"
                onClick={clearCart}
                className="text-gray-600 hover:text-gray-900"
              >
                Clear Cart
              </Button>
              
              <Link to="/products">
                <Button variant="outline" className="flex items-center space-x-2">
                  <ChevronLeft className="h-4 w-4" />
                  <span>Continue Shopping</span>
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                
                {promoApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount (10%)</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900 font-medium">
                    {shipping === 0 ? "Free" : `₹${shipping}`}
                  </span>
                </div>
                
                <div className="h-px bg-gray-200 my-4"></div>
                
                <div className="flex justify-between">
                  <span className="text-lg font-medium text-gray-900">Total</span>
                  <span className="text-xl font-bold text-primary">₹{total.toLocaleString()}</span>
                </div>
                
                <form onSubmit={handleApplyPromo} className="mt-6">
                  <label htmlFor="promo" className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Code
                  </label>
                  <div className="flex">
                    <Input
                      type="text"
                      id="promo"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="rounded-r-none"
                      disabled={promoApplied}
                    />
                    <Button 
                      type="submit" 
                      variant="secondary"
                      className="rounded-l-none"
                      disabled={promoApplied || !promoCode}
                    >
                      Apply
                    </Button>
                  </div>
                  {promoApplied && (
                    <p className="mt-2 text-sm text-green-600">
                      Promo code WELCOME10 applied successfully!
                    </p>
                  )}
                </form>
                
                <Button
                  onClick={handleCheckout}
                  className="w-full mt-6 py-6 text-base"
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? (
                    "Processing..."
                  ) : (
                    <>
                      Proceed to Checkout
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    By proceeding, you agree to our
                    <a href="#" className="underline text-primary ml-1">Terms of Service</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
