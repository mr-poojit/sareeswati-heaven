
import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 1,
    name: "Royal Banarasi Silk Saree",
    description: "This exquisite Banarasi silk saree features intricate gold zari work throughout the body and pallu. The rich maroon color with gold motifs represents traditional craftsmanship at its finest. Ideal for weddings and special occasions.",
    price: 12899,
    images: [
      "https://www.karagiri.com/cdn/shop/files/zamdani-silk-5011_3.jpg?v=1695629461",
      "https://www.aishwaryadesignstudio.com/content/images/thumbs/0144754_royal-pure-banarasi-silk-saree-for-wedding-engagement-and-reception.jpeg",
      "https://www.bunkala.com/cdn/shop/files/BKBS-21219_Bright_Orange_Pure_Georgette_Handloom_Banarasi_Saree.jpg?v=1703171844"
    ],
    category: "Silk",
    material: "Pure Silk",
    occasion: "Wedding",
    rating: 4.8,
    reviews: [
      {
        id: 101,
        userName: "Priya Sharma",
        rating: 5,
        comment: "Absolutely stunning saree! The zari work is exquisite and the color is even more beautiful in person.",
        date: "2023-11-15"
      },
      {
        id: 102,
        userName: "Meera Patel",
        rating: 4.5,
        comment: "Gorgeous piece with amazing craftsmanship. The material is premium quality and drapes beautifully.",
        date: "2023-10-28"
      },
      {
        id: 103,
        userName: "Anjali Desai",
        rating: 5,
        comment: "Received so many compliments when I wore this to my sister's wedding. Worth every penny!",
        date: "2023-09-12"
      }
    ],
    colors: ["Maroon", "Gold"],
    inStock: true
  },
  {
    id: 2,
    name: "Kanjeevaram Silk Temple Border Saree",
    description: "A traditional Kanjeevaram silk saree with temple border and rich peacock motifs. This vibrant purple and gold combination is perfect for festive occasions and ceremonies. Each motif is carefully woven using fine silk threads.",
    price: 15999,
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK1Q2Gw21EkL8wC3oCFcel_M7wzPD1UygIMTO6Qp4DVN2MTR67BMfjGCPNjsWACir43Ag&usqp=CAU",
      "https://weaverstory.com/cdn/shop/products/3_c878674a-1612-4ace-96f1-9c7460dda949.jpg?v=1723672514&width=1500",
      "https://pashudh.com/cdn/shop/files/4_8201711f-d10e-40f3-8656-e61fc2c9f55f_720x.jpg?v=1712395412"
    ],
    category: "Silk",
    material: "Kanjeevaram Silk",
    occasion: "Festival",
    rating: 4.9,
    reviews: [
      {
        id: 104,
        userName: "Lakshmi Iyer",
        rating: 5,
        comment: "The most beautiful Kanjeevaram I've ever owned. The temple border is stunning.",
        date: "2023-12-01"
      },
      {
        id: 105,
        userName: "Sarita Reddy",
        rating: 5,
        comment: "Exceptional quality and the purple is so regal. Perfect for traditional ceremonies.",
        date: "2023-11-20"
      }
    ],
    colors: ["Purple", "Gold"],
    inStock: true
  },
  {
    id: 3,
    name: "Contemporary Linen Blend Saree",
    description: "A lightweight linen blend saree with contemporary digital prints. This comfortable saree is perfect for office wear or casual gatherings. Features a minimalist geometric pattern with a contrasting border.",
    price: 3499,
    images: [
      "https://manyavar.scene7.com/is/image/manyavar/SB15416_426-T.BLUE_101.6496_25-12-2024-17-59:650x900?&dpr=on,2",
      "https://manyavar.scene7.com/is/image/manyavar/SB15416_426-T.BLUE_301.6509_25-12-2024-18-01:650x900?&dpr=on,2",
      "https://manyavar.scene7.com/is/image/manyavar/SB15416_426-T.BLUE_601.6520_25-12-2024-18-02:650x900"
    ],
    category: "Linen",
    material: "Linen Blend",
    occasion: "Casual",
    rating: 4.3,
    reviews: [
      {
        id: 106,
        userName: "Kavita Joshi",
        rating: 4,
        comment: "Love the modern design and it's so comfortable for daily wear.",
        date: "2023-10-15"
      },
      {
        id: 107,
        userName: "Neha Singh",
        rating: 4.5,
        comment: "Perfect for office wear! Lightweight and the prints are unique.",
        date: "2023-09-28"
      }
    ],
    colors: ["Teal", "Beige"],
    inStock: true
  },
  {
    id: 4,
    name: "Hand Painted Kalamkari Cotton Saree",
    description: "A hand-painted Kalamkari cotton saree featuring traditional mythological motifs and nature-inspired designs. This earthy-toned saree is colored using natural vegetable dyes and is perfect for art enthusiasts and cultural events.",
    price: 5899,
    images: [
      "https://manyavar.scene7.com/is/image/manyavar/SB17150_404-FAWN_101.21911_04-09-2024-23-11?wid=1244&dpr=on,2",
      "https://manyavar.scene7.com/is/image/manyavar/SB17150_404-FAWN_501.21935_04-09-2024-23-13?wid=1244",
      "https://manyavar.scene7.com/is/image/manyavar/SB17150_404-FAWN_401.21920_04-09-2024-23-12?wid=1244"
    ],
    category: "Cotton",
    material: "Handloom Cotton",
    occasion: "Cultural Events",
    rating: 4.7,
    reviews: [
      {
        id: 108,
        userName: "Sunita Rao",
        rating: 5,
        comment: "A true work of art! The Kalamkari paintings are incredible and I love that it uses natural dyes.",
        date: "2023-11-10"
      },
      {
        id: 109,
        userName: "Deepa Menon",
        rating: 4.5,
        comment: "Beautiful craftsmanship and so unique. Every time I wear it, people ask me about it.",
        date: "2023-10-05"
      }
    ],
    colors: ["Earthy Brown", "Natural Indigo"],
    inStock: true
  },
  {
    id: 5,
    name: "Organza Floral Embroidered Saree",
    description: "A delicate organza saree with intricate floral embroidery throughout. This light pastel pink saree with silver thread work is perfect for summer weddings and engagement ceremonies. Comes with a designer blouse piece with matching embroidery.",
    price: 8499,
    images: [
      "https://manyavar.scene7.com/is/image/manyavar/SB16969_421-BEIGE_444.3813_24-06-2024-00-31?wid=1244&dpr=on,2",
      "https://manyavar.scene7.com/is/image/manyavar/SB16969_421-BEIGE_301.3819_24-06-2024-00-31?wid=1244&dpr=on,2",
      "https://manyavar.scene7.com/is/image/manyavar/SB16969_421-BEIGE_501.3822_24-06-2024-00-32?wid=1244"
    ],
    category: "Organza",
    material: "Pure Organza",
    occasion: "Engagement",
    rating: 4.6,
    reviews: [
      {
        id: 110,
        userName: "Ritu Kumar",
        rating: 5,
        comment: "So ethereal and elegant! Wore it for my engagement and felt like a princess.",
        date: "2023-12-10"
      },
      {
        id: 111,
        userName: "Pooja Gandhi",
        rating: 4,
        comment: "Beautiful saree but requires careful handling. The embroidery is exquisite.",
        date: "2023-11-28"
      }
    ],
    colors: ["Pastel Pink", "Silver"],
    inStock: true
  },
  {
    id: 6,
    name: "Bhagalpuri Silk Digital Print Saree",
    description: "A modern Bhagalpuri silk saree featuring contemporary digital prints of abstract art. This fusion piece bridges traditional and modern aesthetics, making it perfect for parties and evening functions.",
    price: 4299,
    images: [
      "https://manyavar.scene7.com/is/image/manyavar/SB17307_422-WINE_101.7284_26-12-2024-16-09?wid=1244&dpr=on,2",
      "https://manyavar.scene7.com/is/image/manyavar/SB17307_422-WINE_301.7300_26-12-2024-16-10?wid=1244&dpr=on,2",
      "https://manyavar.scene7.com/is/image/manyavar/SB17307_422-WINE_501.7301_26-12-2024-16-10?wid=1244"
    ],
    category: "Silk",
    material: "Bhagalpuri Silk",
    occasion: "Party",
    rating: 4.4,
    reviews: [
      {
        id: 112,
        userName: "Tara Mehta",
        rating: 4.5,
        comment: "Love the modern art prints! It's a conversation starter at parties.",
        date: "2023-10-22"
      },
      {
        id: 113,
        userName: "Preeti Ghosh",
        rating: 4,
        comment: "Beautiful colors and printing quality. Comfortable to wear for long durations.",
        date: "2023-09-18"
      }
    ],
    colors: ["Blue", "Multicolor"],
    inStock: true
  },
  {
    id: 7,
    name: "Chanderi Silk Zari Border Saree",
    description: "A lightweight Chanderi silk saree with golden zari border and buttis scattered across the body. This elegant cream colored saree is perfect for religious ceremonies and festive occasions.",
    price: 6999,
    images: [
      "https://manyavar.scene7.com/is/image/manyavar/SB17396_416-RED_101.3513_23-06-2024-23-29:650x900?&dpr=on,2",
      "https://manyavar.scene7.com/is/image/manyavar/SB17396_416-RED_301.3532_23-06-2024-23-30?wid=1244&dpr=on,2",
      "https://manyavar.scene7.com/is/image/manyavar/SB17396_416-RED_401.3518_23-06-2024-23-29?wid=1244"
    ],
    category: "Silk",
    material: "Chanderi Silk",
    occasion: "Religious Ceremony",
    rating: 4.7,
    reviews: [
      {
        id: 114,
        userName: "Usha Narayanan",
        rating: 5,
        comment: "The Chanderi silk drapes beautifully and the zari work is excellent.",
        date: "2023-11-15"
      },
      {
        id: 115,
        userName: "Vaishali Patel",
        rating: 4.5,
        comment: "Perfect festive wear. Elegant and lightweight. The cream color is so versatile.",
        date: "2023-10-30"
      }
    ],
    colors: ["Cream", "Gold"],
    inStock: true
  },
  {
    id: 8,
    name: "South Indian Pattu Saree",
    description: "A traditional South Indian Pattu (silk) saree featuring a wide contrast border and classic temple designs. This elegant green and gold combination is ideal for weddings and traditional ceremonies.",
    price: 13999,
    images: [
      "https://manyavar.scene7.com/is/image/manyavar/SB17128_416-RED.21437_18-04-2024-11-05?wid=1244&dpr=on,2",
      "https://manyavar.scene7.com/is/image/manyavar/SB17128_416-RED.21463_18-04-2024-11-08?wid=1244&dpr=on,2",
      "https://manyavar.scene7.com/is/image/manyavar/SB17128_416-RED.21446_18-04-2024-11-06?wid=1244"
    ],
    category: "Silk",
    material: "Pattu Silk",
    occasion: "Wedding",
    rating: 4.9,
    reviews: [
      {
        id: 116,
        userName: "Devi Rajagopal",
        rating: 5,
        comment: "Exceptional quality Pattu saree. The temple border is intricate and beautiful.",
        date: "2023-12-05"
      },
      {
        id: 117,
        userName: "Lalitha Subramanian",
        rating: 5,
        comment: "This saree is a family heirloom material! So traditional and elegant.",
        date: "2023-11-22"
      }
    ],
    colors: ["Green", "Gold"],
    inStock: true
  },
  {
    id: 9,
    name: "Hand Block Printed Cotton Mulmul Saree",
    description: "A lightweight cotton mulmul saree featuring traditional hand block prints in indigo and red. This breathable saree is perfect for summer wear and casual outings.",
    price: 2899,
    images: [
      "https://manyavar.scene7.com/is/image/manyavar/SB16837_414-PINK_101.7257_26-12-2024-16-03:650x900?&dpr=on,2",
      "https://manyavar.scene7.com/is/image/manyavar/SB16837_414-PINK_501.7276_26-12-2024-16-04?wid=1244",
      "https://manyavar.scene7.com/is/image/manyavar/SB16837_414-PINK_301.7272_26-12-2024-16-04?wid=1244&dpr=on,2"
    ],
    category: "Cotton",
    material: "Mulmul Cotton",
    occasion: "Casual",
    rating: 4.5,
    reviews: [
      {
        id: 118,
        userName: "Anita Deshmukh",
        rating: 4.5,
        comment: "Perfect summer saree! The mulmul cotton is so soft and comfortable in hot weather.",
        date: "2023-06-10"
      },
      {
        id: 119,
        userName: "Geeta Sharma",
        rating: 4.5,
        comment: "Beautiful block prints and the colors haven't faded even after multiple washes.",
        date: "2023-05-15"
      }
    ],
    colors: ["Indigo", "Red"],
    inStock: true
  },
  {
    id: 10,
    name: "Designer Sequin Work Party Wear Saree",
    description: "A glamorous georgette saree with intricate sequin and bead work. This ready-to-wear saree comes with a pre-stitched fall and stylish designer blouse. Perfect for cocktail parties and evening events.",
    price: 9499,
    images: [
      "https://manyavar.scene7.com/is/image/manyavar/SB16263-439-INDIGO+BLUE.0254_30-06-2023-16-19:650x900?&dpr=on,2",
      "https://manyavar.scene7.com/is/image/manyavar/SB16263-439-INDIGO+BLUE.0265_30-06-2023-16-20:650x900?&dpr=on,2",
      "https://manyavar.scene7.com/is/image/manyavar/SB16263-439-INDIGO+BLUE.0268_30-06-2023-16-20:650x900"
    ],
    category: "Designer",
    material: "Georgette",
    occasion: "Party",
    rating: 4.6,
    reviews: [
      {
        id: 120,
        userName: "Nisha Kapoor",
        rating: 5,
        comment: "Absolutely stunning for evening events! The sequin work catches the light beautifully.",
        date: "2023-11-28"
      },
      {
        id: 121,
        userName: "Shalini Roy",
        rating: 4,
        comment: "Gorgeous party wear saree. The pre-stitched feature makes it so convenient to wear.",
        date: "2023-10-15"
      }
    ],
    colors: ["Royal Blue", "Silver"],
    inStock: true
  },
  {
    id: 11,
    name: "Pochampally Ikat Silk Saree",
    description: "A handwoven Pochampally Ikat silk saree featuring geometric patterns created using the traditional Ikat tie-dye technique. This double ikat weave represents the rich heritage of Telangana handloom.",
    price: 7899,
    images: [
      "https://manyavar.scene7.com/is/image/manyavar/SB16556_439-INDIGO+BLUE_101.16369_27-05-2024-13-30:650x900?&dpr=on,2",
      "https://manyavar.scene7.com/is/image/manyavar/SB16556_439-INDIGO+BLUE_301.16397_27-05-2024-13-33?wid=1244&dpr=on,2",
      "https://manyavar.scene7.com/is/image/manyavar/SB16556_439-INDIGO+BLUE_401.16378_27-05-2024-13-30?wid=1244"
    ],
    category: "Silk",
    material: "Ikat Silk",
    occasion: "Festive",
    rating: 4.8,
    reviews: [
      {
        id: 122,
        userName: "Kalyani Reddy",
        rating: 5,
        comment: "The craftsmanship is extraordinary! You can feel the dedication of the artisan in every thread.",
        date: "2023-09-20"
      },
      {
        id: 123,
        userName: "Madhavi Gupta",
        rating: 4.5,
        comment: "Beautiful geometric patterns and the colors are so vibrant. A unique addition to my collection.",
        date: "2023-08-15"
      }
    ],
    colors: ["Maroon", "Black"],
    inStock: true
  },
  {
    id: 12,
    name: "Tussar Silk Embroidered Saree",
    description: "A rich Tussar silk saree with delicate hand embroidery work. This earthy-toned saree with vibrant embroidery is perfect for autumn weddings and cultural events.",
    price: 6599,
    images: [
      "https://meenabazaar.com/cdn/shop/files/MBTASAREMBBLACK_1800x1800.jpg?v=1744108385",
      "https://meenabazaar.com/cdn/shop/files/MBTASAREMBBLACK_5_1800x1800.jpg?v=1744108386",
      "https://meenabazaar.com/cdn/shop/files/MB2525BLACK_1_1800x1800.jpg?v=1744108386"
    ],
    category: "Silk",
    material: "Tussar Silk",
    occasion: "Wedding",
    rating: 4.7,
    reviews: [
      {
        id: 124,
        userName: "Shanti Mohan",
        rating: 5,
        comment: "The Tussar silk has such a beautiful natural texture and the embroidery is exquisite!",
        date: "2023-10-05"
      },
      {
        id: 125,
        userName: "Indira Saxena",
        rating: 4.5,
        comment: "Earthy and elegant. Perfect for autumn events and the quality is excellent.",
        date: "2023-09-12"
      }
    ],
    colors: ["Beige", "Rust"],
    inStock: true
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFilteredProducts = (
  category?: string,
  material?: string,
  occasion?: string,
  minPrice?: number,
  maxPrice?: number,
  searchQuery?: string
): Product[] => {
  return products.filter(product => {
    // Apply category filter
    if (category && product.category !== category) return false;
    
    // Apply material filter
    if (material && product.material !== material) return false;
    
    // Apply occasion filter
    if (occasion && product.occasion !== occasion) return false;
    
    // Apply price range filter
    if (minPrice !== undefined && product.price < minPrice) return false;
    if (maxPrice !== undefined && product.price > maxPrice) return false;
    
    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.material.toLowerCase().includes(query) ||
        product.occasion.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
};

export const getCategories = (): string[] => {
  const categories = products.map(product => product.category);
  return [...new Set(categories)];
};

export const getMaterials = (): string[] => {
  const materials = products.map(product => product.material);
  return [...new Set(materials)];
};

export const getOccasions = (): string[] => {
  const occasions = products.map(product => product.occasion);
  return [...new Set(occasions)];
};
