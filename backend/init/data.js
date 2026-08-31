
const products = [
  {
    "name": "iPhone 14 Pro",
    "description": "Apple smartphone with A16 Bionic chip and ProMotion display.",
    "price": 999.00,
    "category": "Electronics",
    "imageUrl": "https://images.unsplash.com/photo-1726587912121-ea21fcc57ff8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGlwaG9uZXxlbnwwfHwwfHx8MA%3D%3D",
    "stock": 25,
    "rating": 4.8,
    "numReviews": 1200
  },
  {
    "name": "iPhone 13",
    "description": "Apple smartphone with dual camera system and 5G support.",
    "price": 799.00,
    "category": "Electronics",
    "imageUrl": "https://images.unsplash.com/photo-1736173155811-e8142fd553ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGlwaG9uZXxlbnwwfHwwfHx8MA%3D%3D",
    "stock": 40,
    "rating": 4.6,
    "numReviews": 950
  },
  {
    "name": "Samsung Galaxy S23 Ultra",
    "description": "Samsung flagship phone with 200MP camera and S Pen.",
    "price": 1199.00,
    "category": "Electronics",
    "imageUrl": "https://images.unsplash.com/photo-1738830234395-a351829a1c7b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2Ftc3VuZyUyMHMyNnVsdHJhfGVufDB8fDB8fHww",
    "stock": 30,
    "rating": 4.7,
    "numReviews": 870
  },
  {
    "name": "Samsung Galaxy A54",
    "description": "Mid-range Samsung phone with AMOLED display and long battery life.",
    "price": 450.00,
    "category": "Electronics",
    "imageUrl": "https://images.unsplash.com/photo-1721864428866-811f04fbd1cd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2Ftc3VuZyUyMGdhbHh5fGVufDB8fDB8fHww",
    "stock": 60,
    "rating": 4.3,
    "numReviews": 400
  },
  {
    "name": "Wireless Earbuds",
    "description": "Compact earbuds with Bluetooth 5.2 and noise cancellation.",
    "price": 120.00,
    "category": "Electronics",
    "imageUrl": "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "stock": 100,
    "rating": 4.4,
    "numReviews": 600
  },
  {
    "name": "Gaming Headset",
    "description": "Over-ear headset with surround sound and mic.",
    "price": 150.00,
    "category": "Electronics",
    "imageUrl": "https://images.unsplash.com/photo-1610041321327-b794c052db27?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2FtaW5nLWhlYWRzZXR8ZW58MHx8MHx8fDA%3D",
    "stock": 80,
    "rating": 4.5,
    "numReviews": 350
  },
  {
    "name": "Noise Cancelling Headphones",
    "description": "Premium headphones with active noise cancellation.",
    "price": 299.00,
    "category": "Electronics",
    "imageUrl": "https://images.unsplash.com/photo-1655560378428-7605bda51749?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZWFyYnVkc3xlbnwwfHwwfHx8MA%3D%3D",
    "stock": 50,
    "rating": 4.7,
    "numReviews": 500
  },
  {
    "name": "Budget Earphones",
    "description": "Affordable wired earphones with clear sound.",
    "price": 20.00,
    "category": "Electronics",
    "imageUrl": "https://plus.unsplash.com/premium_photo-1668418188837-d40b734ed6d2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZWFyYnVkc3xlbnwwfHwwfHx8MA%3D%3D",
    "stock": 200,
    "rating": 4.0,
    "numReviews": 150
  },

  {
    "name": "Running Shoes Pro",
    "description": "Lightweight running shoes designed for comfort and speed.",
    "price": 89.99,
    "category": "Shoes",
    "imageUrl": "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNob2VzfGVufDB8fDB8fHww",
    "stock": 100,
    "rating": 4.3,
    "numReviews": 180
  },
  {
    "name": "Leather Formal Shoes",
    "description": "Premium leather shoes perfect for office and formal wear.",
    "price": 150.00,
    "category": "Shoes",
    "imageUrl": "https://images.unsplash.com/photo-1603191659812-ee978eeeef76?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "stock": 40,
    "rating": 4.6,
    "numReviews": 95
  },
  {
    "name": "Sneakers Classic",
    "description": "Casual sneakers with cushioned sole.",
    "price": 70.00,
    "category": "Shoes",
    "imageUrl": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2hvZXN8ZW58MHx8MHx8fDA%3D",
    "stock": 120,
    "rating": 4.2,
    "numReviews": 210
  },
  {
    "name": "Sports Shoes",
    "description": "Durable sports shoes for training and gym.",
    "price": 110.00,
    "category": "Shoes",
    "imageUrl": "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "stock": 90,
    "rating": 4.4,
    "numReviews": 160
  },

  {
    "name": "Classic Wrist Watch",
    "description": "Elegant wrist watch with stainless steel strap.",
    "price": 250.00,
    "category": "Watches",
    "imageUrl": "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2F0Y2h8ZW58MHx8MHx8fDA%3D",
    "stock": 25,
    "rating": 4.8,
    "numReviews": 310
  },
  {
    "name": "Smart Fitness Watch",
    "description": "Tracks heart rate, steps, and sleep with smart notifications.",
    "price": 199.00,
    "category": "Watches",
    "imageUrl": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHdhdGNofGVufDB8fDB8fHww",
    "stock": 60,
    "rating": 4.4,
    "numReviews": 420
  },
  {
    "name": "Luxury Watch",
    "description": "Premium watch with sapphire glass and leather strap.",
    "price": 1200.00,
    "category": "Watches",
    "imageUrl": "https://images.unsplash.com/photo-1639006570490-79c0c53f1080?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHdhdGNofGVufDB8fDB8fHww",
    "stock": 10,
    "rating": 4.9,
    "numReviews": 80
  },
  {
    "name": "Digital Sports Watch",
    "description": "Water-resistant digital watch with stopwatch.",
    "price": 90.00,
    "category": "Watches",
    "imageUrl": "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGUlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
    "stock": 70,
    "rating": 4.2,
    "numReviews": 150
  },

  {
    "name": "Wooden Coffee Table",
    "description": "Stylish wooden coffee table for modern living rooms.",
    "price": 180.00,
    "category": "Home",
    "imageUrl": "https://plus.unsplash.com/premium_photo-1682582241642-d16c69cc087c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3R5bGlzaCUyMHdvb2RlbiUyMHRhYmxlfGVufDB8fDB8fHww",
    "stock": 15,
    "rating": 4.2,
    "numReviews": 75
  },
  {
    "name": "Cotton Bedsheet Set",
    "description": "Soft and durable cotton bedsheet set with pillow covers.",
    "price": 60.00,
    "category": "Home",
    "imageUrl": "https://images.unsplash.com/photo-1635594202056-9ea3b497e5c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFkc2hlZXR8ZW58MHx8MHx8fDA%3D",
    "stock": 80,
    "rating": 4.1,
    "numReviews": 150
  },
  {
    "name": "LED Lamp",
    "description": "Energy-efficient LED lamp with adjustable brightness.",
    "price": 40.00,
    "category": "Home",
    "imageUrl": "https://images.unsplash.com/photo-1711617481872-7851c36cc5c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGVkJTIwbGFtcHxlbnwwfHwwfHx8MA%3D%3D",
    "stock": 100,
    "rating": 4.3,
    "numReviews": 200
  },
  {
    "name": "Kitchen Blender",
    "description": "High-speed blender for smoothies and shakes.",
    "price": 90.00,
    "category": "Home",
    "imageUrl": "https://plus.unsplash.com/premium_photo-1664647903449-b5fa86692966?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmxlbmRlcnxlbnwwfHwwfHx8MA%3D%3D",
    "stock": 50,
    "rating": 4.5,
    "numReviews": 180
  },

  {
    "name": "Designer Dress",
    "description": "Trendy designer dress suitable for parties and events.",
    "price": 120.00,
    "category": "Fashion",
    "imageUrl": "https://images.unsplash.com/photo-1610048616025-11a3dcc9fd0b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGVzaWduZXIlMjBkcmVzc3xlbnwwfHwwfHx8MA%3D%3D",
    "stock": 35,
    "rating": 4.5,
    "numReviews": 200
  },
  {
    "name": "Casual T-Shirt",
    "description": "Comfortable cotton t-shirt available in multiple colors.",
    "price": 25.00,
    "category": "Fashion",
    "imageUrl": "https://images.unsplash.com/photo-1778671394516-8270eac13c42?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhc3VhbCUyMHRzaGlydHN8ZW58MHx8MHx8fDA%3D",
    "stock": 150,
    "rating": 4.2,
    "numReviews": 300
  },
  {
    "name": "Denim Jeans",
    "description": "Classic denim jeans with slim fit.",
    "price": 60.00,
    "category": "Fashion",
    "imageUrl": "https://images.unsplash.com/photo-1714729382668-7bc3bb261662?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8amVhbnN8ZW58MHx8MHx8fDA%3D",
    "stock": 100,
    "rating": 4.3,
    "numReviews": 250
  },
  {
    "name": "Winter Jacket",
    "description": "Warm and stylish jacket for cold weather.",
    "price": 180.00,
    "category": "Fashion",
    "imageUrl": "https://plus.unsplash.com/premium_photo-1661313817350-1fa759c43a3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amFja2V0JTIwbWVufGVufDB8fDB8fHww",
    "stock": 40,
    "rating": 4.6,
    "numReviews": 120
  },

  {
    "name": "Organic Face Cream",
    "description": "Moisturizing face cream made with natural ingredients.",
    "price": 45.00,
    "category": "Beauty",
    "imageUrl": "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFjZSUyMGNyZWFtfGVufDB8fDB8fHww",
    "stock": 70,
    "rating": 4.6,
    "numReviews": 260
  },
  {
    "name": "Lipstick Set",
    "description": "Set of 5 matte lipsticks in assorted shades.",
    "price": 55.00,
    "category": "Beauty",
    "imageUrl": "https://images.unsplash.com/photo-1571646034647-52e6ea84b28c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGlwc3RpY2slMjBzZXR8ZW58MHx8MHx8fDA%3D",
    "stock": 90,
    "rating": 4.4,
    "numReviews": 310
  }
]

export default { products }