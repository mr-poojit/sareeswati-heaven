
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, Landmark, Truck, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";

interface FormErrorsType {
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  paymentMethod?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

const CheckoutSteps = ["Shipping", "Payment", "Review"];

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    saveInformation: true,
    notes: "",
    paymentMethod: "card",
    cardNumber: "",
    cardHolderName: "",
    cardExpiry: "",
    cardCvv: ""
  });
  const [formErrors, setFormErrors] = useState<FormErrorsType>({});
  
  // Redirect if not authenticated or cart is empty
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to complete your purchase.",
        variant: "destructive"
      });
      navigate("/signin?redirect=checkout");
      return;
    }
    
    if (items.length === 0) {
      toast({
        title: "Empty cart",
        description: "Your cart is empty. Add items before checkout.",
        variant: "destructive"
      });
      navigate("/products");
    }
  }, [isAuthenticated, items, navigate, toast]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field
    if (formErrors[name as keyof FormErrorsType]) {
      setFormErrors({ ...formErrors, [name]: undefined });
    }
  };
  
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData({ ...formData, [name]: checked });
  };
  
  const validateShippingForm = () => {
    const errors: FormErrorsType = {};
    const requiredFields = ["fullName", "email", "phone", "address", "city", "state", "pincode"];
    
    // Check required fields
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        errors[field as keyof FormErrorsType] = "This field is required";
      }
    });
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    
    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      errors.phone = "Phone number must be 10 digits";
    }
    
    // Pincode validation
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      errors.pincode = "Pincode must be 6 digits";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const validatePaymentForm = () => {
    const errors: FormErrorsType = {};
    
    if (formData.paymentMethod === "card") {
      // Card number validation
      if (!formData.cardNumber) {
        errors.cardNumber = "Card number is required";
      } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
        errors.cardNumber = "Card number must be 16 digits";
      }
      
      // Card expiry validation
      if (!formData.cardExpiry) {
        errors.cardExpiry = "Expiry date is required";
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry)) {
        errors.cardExpiry = "Use MM/YY format";
      }
      
      // CVV validation
      if (!formData.cardCvv) {
        errors.cardCvv = "CVV is required";
      } else if (!/^\d{3,4}$/.test(formData.cardCvv)) {
        errors.cardCvv = "CVV must be 3 or 4 digits";
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleContinue = () => {
    if (currentStep === 0 && !validateShippingForm()) {
      return;
    }
    
    if (currentStep === 1 && !validatePaymentForm()) {
      return;
    }
    
    if (currentStep < CheckoutSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      handlePlaceOrder();
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/cart");
    }
  };
  
  const handlePlaceOrder = () => {
    setIsSubmitting(true);
    
    // In a real app, this would be an API call to process the order
    setTimeout(() => {
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase."
      });
      clearCart();
      navigate("/order-success");
      setIsSubmitting(false);
    }, 2000);
  };
  
  // Calculate order totals
  const subtotal = getTotalPrice();
  const shipping = subtotal > 2000 ? 0 : 100;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shipping + tax;
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-playfair font-bold text-center text-gray-900 mb-2">
            Checkout
          </h1>
          
          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center w-full max-w-3xl">
              {CheckoutSteps.map((step, index) => (
                <React.Fragment key={step}>
                  <div className="flex flex-col items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-sm ${
                        index <= currentStep 
                          ? "bg-primary text-white" 
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <span className="text-xs mt-1 text-gray-600">{step}</span>
                  </div>
                  
                  {index < CheckoutSteps.length - 1 && (
                    <div 
                      className={`flex-1 h-1 mx-2 ${
                        index < currentStep ? "bg-primary" : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Shipping Information Step */}
                {currentStep === 0 && (
                  <div className="animate-fade-in">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                      <Truck className="mr-2 h-5 w-5 text-primary" />
                      Shipping Information
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            className={formErrors.fullName ? "border-red-500" : ""}
                          />
                          {formErrors.fullName && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.fullName}</p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={formErrors.email ? "border-red-500" : ""}
                          />
                          {formErrors.email && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={formErrors.phone ? "border-red-500" : ""}
                        />
                        {formErrors.phone && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Address <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="address"
                          name="address"
                          rows={3}
                          value={formData.address}
                          onChange={handleInputChange}
                          className={formErrors.address ? "border-red-500" : ""}
                        />
                        {formErrors.address && (
                          <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                            City <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className={formErrors.city ? "border-red-500" : ""}
                          />
                          {formErrors.city && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                            State <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className={formErrors.state ? "border-red-500" : ""}
                          />
                          {formErrors.state && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.state}</p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                            Pincode <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="pincode"
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleInputChange}
                            className={formErrors.pincode ? "border-red-500" : ""}
                          />
                          {formErrors.pincode && (
                            <p className="mt-1 text-sm text-red-600">{formErrors.pincode}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Checkbox
                          id="saveInformation"
                          checked={formData.saveInformation}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange("saveInformation", checked as boolean)
                          }
                        />
                        <label 
                          htmlFor="saveInformation" 
                          className="ml-2 text-sm text-gray-600"
                        >
                          Save this information for next time
                        </label>
                      </div>
                      
                      <div>
                        <Label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                          Order Notes (Optional)
                        </Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          rows={3}
                          placeholder="Special instructions for delivery or gift wrapping requirements"
                          value={formData.notes}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Payment Method Step */}
                {currentStep === 1 && (
                  <div className="animate-fade-in">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                      <CreditCard className="mr-2 h-5 w-5 text-primary" />
                      Payment Method
                    </h2>
                    
                    <div className="space-y-6">
                      <RadioGroup
                        value={formData.paymentMethod}
                        onValueChange={(value) => {
                          setFormData({ ...formData, paymentMethod: value });
                          if (formErrors.paymentMethod) {
                            setFormErrors({ ...formErrors, paymentMethod: undefined });
                          }
                        }}
                      >
                        <div className="border rounded-lg p-4 mb-4 transition-all hover:border-primary">
                          <div className="flex items-start">
                            <RadioGroupItem value="card" id="card" className="mt-1" />
                            <div className="ml-3 flex-1">
                              <Label htmlFor="card" className="text-base font-medium text-gray-900 block">
                                Credit / Debit Card
                              </Label>
                              <p className="text-sm text-gray-600">
                                Pay securely using your credit or debit card.
                              </p>
                              
                              {formData.paymentMethod === "card" && (
                                <div className="mt-4 space-y-4">
                                  <div>
                                    <Label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                      Card Number <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                      id="cardNumber"
                                      name="cardNumber"
                                      placeholder="1234 5678 9012 3456"
                                      value={formData.cardNumber}
                                      onChange={handleInputChange}
                                      className={formErrors.cardNumber ? "border-red-500" : ""}
                                    />
                                    {formErrors.cardNumber && (
                                      <p className="mt-1 text-sm text-red-600">{formErrors.cardNumber}</p>
                                    )}
                                  </div>
                                  
                                  <div>
                                    <Label htmlFor="cardHolderName" className="block text-sm font-medium text-gray-700 mb-1">
                                      Cardholder Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                      id="cardHolderName"
                                      name="cardHolderName"
                                      placeholder="Name on card"
                                      value={formData.cardHolderName}
                                      onChange={handleInputChange}
                                    />
                                  </div>
                                  
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                                        Expiry Date <span className="text-red-500">*</span>
                                      </Label>
                                      <Input
                                        id="cardExpiry"
                                        name="cardExpiry"
                                        placeholder="MM/YY"
                                        value={formData.cardExpiry}
                                        onChange={handleInputChange}
                                        className={formErrors.cardExpiry ? "border-red-500" : ""}
                                      />
                                      {formErrors.cardExpiry && (
                                        <p className="mt-1 text-sm text-red-600">{formErrors.cardExpiry}</p>
                                      )}
                                    </div>
                                    <div>
                                      <Label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700 mb-1">
                                        CVV <span className="text-red-500">*</span>
                                      </Label>
                                      <Input
                                        id="cardCvv"
                                        name="cardCvv"
                                        type="password"
                                        placeholder="123"
                                        value={formData.cardCvv}
                                        onChange={handleInputChange}
                                        className={formErrors.cardCvv ? "border-red-500" : ""}
                                      />
                                      {formErrors.cardCvv && (
                                        <p className="mt-1 text-sm text-red-600">{formErrors.cardCvv}</p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 mb-4 transition-all hover:border-primary">
                          <div className="flex items-start">
                            <RadioGroupItem value="upi" id="upi" className="mt-1" />
                            <div className="ml-3 flex-1">
                              <Label htmlFor="upi" className="text-base font-medium text-gray-900 block">
                                UPI Payment
                              </Label>
                              <p className="text-sm text-gray-600">
                                Pay via UPI apps like Google Pay, PhonePe, or Paytm.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 transition-all hover:border-primary">
                          <div className="flex items-start">
                            <RadioGroupItem value="cod" id="cod" className="mt-1" />
                            <div className="ml-3 flex-1">
                              <Label htmlFor="cod" className="text-base font-medium text-gray-900 block">
                                Cash on Delivery
                              </Label>
                              <p className="text-sm text-gray-600">
                                Pay with cash upon delivery.
                              </p>
                            </div>
                          </div>
                        </div>
                      </RadioGroup>
                      
                      <div className="flex items-center mt-6 p-3 bg-gray-50 rounded-lg border">
                        <div className="flex-shrink-0">
                          <ShieldCheck className="h-8 w-8 text-green-600" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-gray-900">Secure Payment</h3>
                          <p className="text-xs text-gray-600 mt-1">
                            All transactions are secure and encrypted. Your personal information is never shared.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Review Step */}
                {currentStep === 2 && (
                  <div className="animate-fade-in">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">
                      Review Your Order
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b">
                          <h3 className="text-sm font-medium text-gray-700">Items ({items.length})</h3>
                        </div>
                        
                        <div className="divide-y">
                          {items.map((item) => (
                            <div key={item.product.id} className="px-4 py-3 flex items-center">
                              <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                <img 
                                  src={item.product.images[0]} 
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="ml-4 flex-1">
                                <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                                <p className="text-sm text-gray-600">
                                  {item.product.category} • {item.product.material}
                                </p>
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                {item.quantity} × ₹{item.product.price.toLocaleString()}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b">
                          <h3 className="text-sm font-medium text-gray-700">Shipping Address</h3>
                        </div>
                        <div className="p-4">
                          <p className="font-medium text-gray-900">{formData.fullName}</p>
                          <p className="text-gray-600 mt-1">{formData.address}</p>
                          <p className="text-gray-600">{formData.city}, {formData.state} - {formData.pincode}</p>
                          <p className="text-gray-600 mt-1">
                            Phone: {formData.phone} | Email: {formData.email}
                          </p>
                          {formData.notes && (
                            <div className="mt-2 text-sm">
                              <span className="font-medium">Order Notes:</span> {formData.notes}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3 border-b">
                          <h3 className="text-sm font-medium text-gray-700">Payment Method</h3>
                        </div>
                        <div className="p-4">
                          {formData.paymentMethod === "card" && (
                            <div className="flex items-center">
                              <CreditCard className="h-5 w-5 text-gray-600 mr-2" />
                              <div>
                                <p className="font-medium text-gray-900">Credit / Debit Card</p>
                                <p className="text-gray-600 text-sm">
                                  Card ending with {formData.cardNumber.slice(-4)}
                                </p>
                              </div>
                            </div>
                          )}
                          
                          {formData.paymentMethod === "upi" && (
                            <div className="flex items-center">
                              <svg className="h-5 w-5 text-gray-600 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 15H17V17H7V15Z" fill="currentColor" />
                                <path d="M7 11H17V13H7V11Z" fill="currentColor" />
                                <path d="M7 7H17V9H7V7Z" fill="currentColor" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M3 3C3 1.89543 3.89543 1 5 1H19C20.1046 1 21 1.89543 21 3V21C21 22.1046 20.1046 23 19 23H5C3.89543 23 3 22.1046 3 21V3ZM5 3H19V21H5V3Z" fill="currentColor" />
                              </svg>
                              <div>
                                <p className="font-medium text-gray-900">UPI Payment</p>
                                <p className="text-gray-600 text-sm">
                                  You'll be redirected to complete payment
                                </p>
                              </div>
                            </div>
                          )}
                          
                          {formData.paymentMethod === "cod" && (
                            <div className="flex items-center">
                              <Landmark className="h-5 w-5 text-gray-600 mr-2" />
                              <div>
                                <p className="font-medium text-gray-900">Cash on Delivery</p>
                                <p className="text-gray-600 text-sm">
                                  Pay when your order is delivered
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    className="flex items-center"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {currentStep === 0 ? "Back to Cart" : "Back"}
                  </Button>
                  
                  <Button
                    onClick={handleContinue}
                    disabled={isSubmitting}
                    className="flex items-center"
                  >
                    {currentStep === CheckoutSteps.length - 1 ? (
                      isSubmitting ? "Processing..." : "Place Order"
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Order Summary
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({items.length} items)</span>
                    <span className="font-medium text-gray-900">₹{subtotal.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-gray-900">
                      {shipping === 0 ? "Free" : `₹${shipping}`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (GST 18%)</span>
                    <span className="font-medium text-gray-900">₹{tax.toLocaleString()}</span>
                  </div>
                  
                  <div className="h-px bg-gray-200 my-2"></div>
                  
                  <div className="flex justify-between text-gray-900">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-primary">₹{total.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="mt-6 border-t pt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Order Details</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {items.map((item) => (
                      <li key={item.product.id} className="flex justify-between">
                        <span className="flex-1">{item.product.name} × {item.quantity}</span>
                        <span className="font-medium text-gray-900">
                          ₹{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
