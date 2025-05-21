export interface Product {
  id: number
  name: string
  price: number
  oldPrice?: number
  description: string
  fullDescription: string
  category: string
  categoryName: string
  image: string
  images: string[]
  rating: number
  reviewCount: number
  features: string[]
  dimensions: { name: string; value: string }[]
  colors?: { name: string; hex: string }[]
  materials?: string[]
  careInstructions: string
  reviews: {
    author: string
    rating: number
    date: string
    content: string
  }[]
  isNew?: boolean
  featured?: boolean
}

// Sample product data
const products: Product[] = [
  // ----------------------------------------
  // CHAIRS
  // ----------------------------------------

  // Oslo Lounge Chair
  {
    id: 1,
    name: "Oslo Lounge Chair",
    price: 1299,
    oldPrice: 1499,
    description: "Comfortable lounge chair with solid oak frame and wool upholstery.",
    fullDescription:
      "The Oslo Lounge Chair combines comfort with Scandinavian design principles. The solid oak frame provides durability and stability, while the premium wool upholstery offers both comfort and style. The chair's ergonomic design ensures proper support for extended periods of sitting, making it perfect for reading, conversation, or simply relaxing.",
    category: "chair",
    categoryName: "Chairs",
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    rating: 4.8,
    reviewCount: 124,
    features: [
      "Solid oak frame for durability",
      "Premium wool upholstery",
      "Ergonomic design for proper support",
      "Removable cushions for easy cleaning",
      "Available in multiple colors",
    ],
    dimensions: [
      { name: "Width", value: "75 cm" },
      { name: "Depth", value: "82 cm" },
      { name: "Height", value: "86 cm" },
      { name: "Seat Height", value: "42 cm" },
      { name: "Arm Height", value: "60 cm" },
      { name: "Weight", value: "18 kg" },
    ],
    colors: [
      { name: "Natural Oak/Light Grey", hex: "#D3D3D3" },
      { name: "Natural Oak/Dark Grey", hex: "#696969" },
      { name: "Natural Oak/Navy Blue", hex: "#000080" },
      { name: "Walnut/Beige", hex: "#F5F5DC" },
    ],
    materials: ["Oak", "Wool", "High-density foam"],
    careInstructions:
      "Vacuum regularly using low suction. Spot clean with a mild, water-free solvent or dry cleaning product. Avoid placing in direct sunlight to prevent fading. Fluff cushions regularly to maintain shape.",
    reviews: [
      {
        author: "Emma L.",
        rating: 5,
        date: "March 15, 2025",
        content:
          "This chair is absolutely perfect! The quality is exceptional, and it's even more comfortable than I expected. It fits perfectly in my living room and has quickly become everyone's favorite spot.",
      },
      {
        author: "Michael T.",
        rating: 4,
        date: "February 28, 2025",
        content:
          "Great chair with excellent build quality. The wool fabric is beautiful and feels durable. Only giving 4 stars because assembly was a bit tricky, but the end result is worth it.",
      },
      {
        author: "Sarah J.",
        rating: 5,
        date: "January 10, 2025",
        content:
          "I've had this chair for about a month now and I'm in love with it. The design is timeless and the comfort level is amazing. Highly recommend!",
      },
    ],
    featured: true
  },

  // Copenhagen Armchair
  {
    id: 7,
    name: "Copenhagen Armchair",
    price: 1099,
    description: "Elegant armchair with walnut legs and premium linen upholstery.",
    fullDescription:
      "The Copenhagen Armchair embodies Scandinavian design principles with its clean lines, organic forms, and focus on both beauty and functionality. The gracefully curved silhouette creates a striking profile from every angle, while the premium linen upholstery adds texture and warmth. Supported by solid walnut legs that provide both stability and visual lightness, this armchair offers exceptional comfort without compromising on style. Perfect as an accent piece or paired with the Malmo Sofa, the Copenhagen Armchair brings sophisticated elegance to any space.",
    category: "chair",
    categoryName: "Chairs",
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    rating: 4.7,
    reviewCount: 83,
    features: [
      "Ergonomic curved design for optimal comfort",
      "Premium linen upholstery",
      "Solid walnut legs with natural finish",
      "High-density foam cushioning",
      "Reinforced frame for durability",
      "Non-marking foot pads to protect floors",
    ],
    dimensions: [
      { name: "Width", value: "75 cm" },
      { name: "Depth", value: "80 cm" },
      { name: "Height", value: "85 cm" },
      { name: "Seat Height", value: "45 cm" },
      { name: "Seat Depth", value: "55 cm" },
      { name: "Arm Height", value: "65 cm" },
      { name: "Weight", value: "15 kg" },
    ],
    colors: [
      { name: "Natural Linen", hex: "#F0E9E0" },
      { name: "Charcoal Linen", hex: "#36454F" },
      { name: "Dusty Blue Linen", hex: "#8DA9C4" },
      { name: "Olive Linen", hex: "#708238" },
    ],
    materials: ["Solid Walnut", "Premium Linen", "High-density Foam", "Engineered Hardwood Frame"],
    careInstructions:
      "Vacuum regularly using low suction. Spot clean with a water-free solvent or dry cleaning product. Professional cleaning recommended for overall soiling. Avoid placing in direct sunlight to prevent fabric fading. Treat any spills immediately by blotting (not rubbing) with a clean, dry cloth.",
    reviews: [
      {
        author: "Natalie K.",
        rating: 5,
        date: "March 20, 2025",
        content:
          "This armchair is a work of art! It's incredibly comfortable and the linen fabric is beautiful. The walnut legs add such a nice touch of warmth. It's become my favorite reading spot in the house.",
      },
      {
        author: "Jonathan L.",
        rating: 4,
        date: "February 15, 2025",
        content:
          "Very well-made chair with excellent attention to detail. The curved design provides great back support. The only reason I'm not giving 5 stars is that assembly was a bit challenging.",
      },
      {
        author: "Emily R.",
        rating: 5,
        date: "January 28, 2025",
        content:
          "Absolutely love this chair! The linen fabric is gorgeous and feels very high-quality. It's the perfect size - substantial enough to be comfortable but not so large that it overwhelms the room.",
      },
    ],
    isNew: true
  },

  // ----------------------------------------
  // TABLES
  // ----------------------------------------

  // Bergen Dining Table
  {
    id: 2,
    name: "Bergen Dining Table",
    price: 1899,
    oldPrice: 2199,
    description: "Extendable dining table in solid oak with smooth edges and natural finish.",
    fullDescription:
      "The Bergen Dining Table is crafted from solid oak and features a natural finish that highlights the wood's beautiful grain. The table's smooth edges and minimalist design make it a versatile piece that complements various interior styles. The extendable feature allows you to accommodate extra guests when needed, making it perfect for both everyday dining and special occasions.",
    category: "table",
    categoryName: "Tables",
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    rating: 4.7,
    reviewCount: 89,
    features: [
      "Solid oak construction",
      "Extendable design - adds 50cm when fully extended",
      "Smooth, rounded edges for safety",
      "Natural oil finish that enhances the wood grain",
      "Seats 6-8 people (8-10 when extended)",
      "Easy-to-use extension mechanism",
    ],
    dimensions: [
      { name: "Length", value: "180 cm (230 cm when extended)" },
      { name: "Width", value: "90 cm" },
      { name: "Height", value: "75 cm" },
      { name: "Weight", value: "45 kg" },
      { name: "Extension Leaf", value: "50 cm" },
    ],
    colors: [
      { name: "Natural Oak", hex: "#D2B48C" },
      { name: "Smoked Oak", hex: "#8B4513" },
      { name: "White Oak", hex: "#F5F5F5" },
    ],
    materials: ["Solid Oak", "Oak Veneer (for extension leaf)"],
    careInstructions:
      "Clean with a damp cloth and mild soap if necessary. Dry immediately with a soft cloth. Apply furniture oil specifically designed for oak every 6-12 months to maintain the finish. Avoid placing hot items directly on the surface; use coasters and placemats.",
    reviews: [
      {
        author: "Thomas K.",
        rating: 5,
        date: "April 2, 2025",
        content:
          "This table is a masterpiece! The craftsmanship is exceptional, and the extension mechanism works smoothly. It's become the centerpiece of our dining room.",
      },
      {
        author: "Lisa M.",
        rating: 4,
        date: "March 18, 2025",
        content:
          "Beautiful table that feels very solid. The natural finish is gorgeous and shows off the wood grain nicely. The only reason for 4 stars is that it was delivered with a small scratch, but customer service was excellent in resolving the issue.",
      },
      {
        author: "Robert J.",
        rating: 5,
        date: "February 5, 2025",
        content:
          "Worth every penny! This table is not only beautiful but incredibly well-made. The extension feature is easy to use and has come in handy multiple times when hosting dinner parties.",
      },
    ],
    featured: true
  },

  // Fjord Desk
  {
    id: 4,
    name: "Fjord Desk",
    price: 1199,
    description: "Minimalist desk with cable management and adjustable height.",
    fullDescription:
      "The Fjord Desk combines functionality with elegant design, making it the perfect workspace for the modern home or office. Its minimalist aesthetic features clean lines and a sleek profile, while the thoughtful design includes practical elements like an integrated cable management system to keep your workspace tidy. The adjustable height feature allows you to customize the desk to your perfect working position, promoting better posture and comfort during long work sessions.",
    category: "table",
    categoryName: "Tables",
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    rating: 4.6,
    reviewCount: 58,
    features: [
      "Electric height adjustment (70-120 cm)",
      "Integrated cable management system",
      "Solid oak top with natural finish",
      "Memory settings for preferred heights",
      "Hidden drawer for small items",
      "Anti-collision technology",
    ],
    dimensions: [
      { name: "Width", value: "140 cm" },
      { name: "Depth", value: "70 cm" },
      { name: "Height", value: "70-120 cm (adjustable)" },
      { name: "Drawer Dimensions", value: "30 cm x 40 cm x 5 cm" },
      { name: "Weight", value: "35 kg" },
    ],
    colors: [
      { name: "Oak/White", hex: "#FFFFFF" },
      { name: "Oak/Black", hex: "#000000" },
      { name: "Walnut/Black", hex: "#000000" },
    ],
    materials: ["Solid Oak", "Steel", "Premium Electronics"],
    careInstructions:
      "Wipe the wooden surface with a slightly damp cloth and mild cleaner if necessary. Dry immediately with a soft cloth. For the metal frame, use a soft cloth with a small amount of glass cleaner. Keep electronics away from water and check cable connections periodically.",
    reviews: [
      {
        author: "Mark T.",
        rating: 5,
        date: "April 10, 2025",
        content:
          "This desk has completely transformed my home office. The height adjustment is smooth and quiet, and the cable management system keeps everything tidy. Worth every penny!",
      },
      {
        author: "Laura S.",
        rating: 4,
        date: "March 5, 2025",
        content:
          "Beautiful desk with excellent functionality. The oak top is gorgeous and the height adjustment works perfectly. Only giving 4 stars because assembly was quite challenging.",
      },
      {
        author: "James K.",
        rating: 5,
        date: "February 20, 2025",
        content:
          "After using this desk for a month, I can confidently say it's one of the best purchases I've made. The ability to switch between sitting and standing has helped my back pain tremendously.",
      },
    ],
  },

  // ----------------------------------------
  // BEDS
  // ----------------------------------------

  // Stockholm Bed Frame
  {
    id: 3,
    name: "Stockholm Bed Frame",
    price: 2499,
    description: "King-size bed frame with integrated nightstands and LED lighting.",
    fullDescription:
      "The Stockholm Bed Frame redefines bedroom luxury with its sleek design and thoughtful features. Crafted from premium materials, this king-size bed frame includes integrated nightstands that provide convenient storage while maintaining a clean, cohesive look. The subtle LED lighting creates a warm ambiance, perfect for evening reading or a calming atmosphere. The platform design eliminates the need for a box spring, supporting your mattress directly for optimal comfort.",
    category: "bed",
    categoryName: "Beds",
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    rating: 4.9,
    reviewCount: 76,
    features: [
      "Integrated nightstands with soft-close drawers",
      "Built-in LED lighting with dimmer control",
      "Solid wood frame with veneer finish",
      "Platform design - no box spring needed",
      "Cable management system for charging devices",
      "Adjustable headboard height",
    ],
    dimensions: [
      { name: "Width", value: "200 cm" },
      { name: "Length", value: "220 cm" },
      { name: "Height", value: "100 cm (headboard)" },
      { name: "Nightstand Width", value: "40 cm (each)" },
      { name: "Mattress Platform Height", value: "35 cm" },
    ],
    colors: [
      { name: "Walnut", hex: "#5C4033" },
      { name: "Oak", hex: "#D2B48C" },
      { name: "Black Oak", hex: "#292929" },
    ],
    materials: ["Solid Oak", "Oak Veneer", "Premium Hardware"],
    careInstructions:
      "Dust regularly with a soft, dry cloth. Clean wood surfaces with a damp cloth and mild furniture cleaner if needed, then dry immediately. Avoid placing the bed in direct sunlight to prevent fading. Check and tighten hardware periodically.",
    reviews: [
      {
        author: "Jennifer P.",
        rating: 5,
        date: "March 30, 2025",
        content:
          "This bed frame transformed our entire bedroom! The integrated nightstands save so much space, and the LED lighting creates the perfect ambiance for reading at night. Extremely satisfied with this purchase.",
      },
      {
        author: "David L.",
        rating: 5,
        date: "February 12, 2025",
        content:
          "Exceptional quality and design. Assembly took some time but the instructions were clear. The built-in lighting is such a smart feature, and the nightstands are spacious enough for all my bedside essentials.",
      },
      {
        author: "Sophia R.",
        rating: 4,
        date: "January 25, 2025",
        content:
          "Beautiful bed frame that feels very luxurious. The only reason I'm not giving 5 stars is that one of the LED lights had an issue, but customer service sent a replacement part quickly.",
      },
    ],
  },

  // ----------------------------------------
  // SOFAS
  // ----------------------------------------

  // Malmo Sofa
  {
    id: 6,
    name: "Malmo Sofa",
    price: 2999,
    description: "Three-seater sofa with deep seats and plush cushions for ultimate comfort.",
    fullDescription:
      "The Malmo Sofa combines contemporary design with exceptional comfort, creating the perfect centerpiece for your living space. Its generous proportions and deep seats invite relaxation, while the plush cushions provide the perfect balance of support and softness. The clean lines and elevated legs give this sofa a light, airy appearance despite its substantial size. Upholstered in premium fabric, the Malmo is both beautiful and durable, designed to maintain its appearance and comfort for years to come.",
    category: "sofa",
    categoryName: "Sofas",
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    rating: 4.8,
    reviewCount: 115,
    features: [
      "Three-seater design with generous proportions",
      "Deep seats (65 cm) for maximum comfort",
      "High-resilience foam cushions with feather topping",
      "Solid wood frame for durability",
      "Removable and reversible seat cushions",
      "Stain-resistant fabric treatment",
      "Elevated legs for easy cleaning underneath",
    ],
    dimensions: [
      { name: "Width", value: "220 cm" },
      { name: "Depth", value: "95 cm" },
      { name: "Height", value: "85 cm" },
      { name: "Seat Height", value: "45 cm" },
      { name: "Seat Depth", value: "65 cm" },
      { name: "Arm Height", value: "65 cm" },
      { name: "Leg Height", value: "15 cm" },
    ],
    colors: [
      { name: "Light Grey", hex: "#D3D3D3" },
      { name: "Dark Grey", hex: "#696969" },
      { name: "Navy Blue", hex: "#000080" },
      { name: "Beige", hex: "#F5F5DC" },
      { name: "Sage Green", hex: "#9CAF88" },
    ],
    materials: ["Solid Wood Frame", "High-resilience Foam", "Feather Topping", "Premium Upholstery Fabric"],
    careInstructions:
      "Vacuum regularly using low suction. Rotate and fluff cushions weekly to maintain shape and even wear. Spot clean with a water-free solvent or dry cleaning product. Professional cleaning recommended for overall soiling. Keep away from direct sunlight to prevent fabric fading.",
    reviews: [
      {
        author: "Rebecca T.",
        rating: 5,
        date: "April 5, 2025",
        content:
          "This sofa is absolutely amazing! It's the perfect combination of style and comfort. The deep seats are perfect for curling up with a book, and the fabric feels luxurious and durable. Everyone who visits comments on how beautiful it is.",
      },
      {
        author: "Daniel M.",
        rating: 4,
        date: "March 12, 2025",
        content:
          "Very comfortable sofa with excellent build quality. The cushions are the perfect balance of soft and supportive. The only reason for 4 stars instead of 5 is that the color is slightly different than it appeared online.",
      },
      {
        author: "Olivia P.",
        rating: 5,
        date: "February 28, 2025",
        content:
          "Worth every penny! This sofa transformed our living room and has become everyone's favorite spot. The fabric is holding up beautifully even with kids and a dog. Couldn't be happier with this purchase.",
      },
    ],
  },

  // ----------------------------------------
  // PANEL FURNITURE
  // ----------------------------------------

  // Aalto Bookshelf
  {
    id: 5,
    name: "Aalto Bookshelf",
    price: 899,
    description: "Modular bookshelf system that can be customized to fit your space.",
    fullDescription:
      "The Aalto Bookshelf is a versatile storage solution that adapts to your needs and space. Its modular design allows you to create a configuration that works perfectly for your home, whether you need a small bookcase or a full wall unit. Crafted from high-quality materials, the Aalto combines durability with elegant design, featuring clean lines and a contemporary aesthetic that complements any interior style. The thoughtful construction includes adjustable shelves to accommodate items of various sizes.",
    category: "panel-furniture",
    categoryName: "Panel Furniture",
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    rating: 4.7,
    reviewCount: 92,
    features: [
      "Modular design for custom configurations",
      "Adjustable shelves for flexible storage",
      "Solid wood construction with veneer finish",
      "Wall-mounting hardware included for stability",
      "Optional cabinet doors available separately",
      "Can be expanded with additional modules",
    ],
    dimensions: [
      { name: "Width (per module)", value: "80 cm" },
      { name: "Depth", value: "35 cm" },
      { name: "Height", value: "200 cm" },
      { name: "Shelf Thickness", value: "2.5 cm" },
      { name: "Adjustable Shelf Positions", value: "5 positions per section" },
      { name: "Weight (per module)", value: "30 kg" },
    ],
    colors: [
      { name: "White Oak", hex: "#F5F5F5" },
      { name: "Natural Oak", hex: "#D2B48C" },
      { name: "Black", hex: "#000000" },
    ],
    materials: ["Solid Oak", "Oak Veneer", "Premium Hardware"],
    careInstructions:
      "Dust regularly with a soft, dry cloth. Clean with a damp cloth and mild furniture cleaner if needed, then dry immediately. Avoid placing heavy items on shelves beyond the recommended weight capacity. Check and tighten hardware periodically.",
    reviews: [
      {
        author: "Catherine L.",
        rating: 5,
        date: "March 25, 2025",
        content:
          "This bookshelf is exactly what I was looking for! The modular design allowed me to create the perfect configuration for my living room, and the quality is exceptional. Assembly was straightforward and the result looks very high-end.",
      },
      {
        author: "Peter M.",
        rating: 4,
        date: "February 18, 2025",
        content:
          "Great quality bookshelf with a beautiful finish. The adjustable shelves are a nice feature. Assembly took longer than expected, but the end result was worth it.",
      },
      {
        author: "Anna K.",
        rating: 5,
        date: "January 30, 2025",
        content:
          "I've purchased multiple modules to create a full wall unit, and I couldn't be happier. The system is incredibly versatile, and the craftsmanship is excellent. Highly recommend!",
      },
    ],
  },
  {
    id: 8,
    name: "Gothenburg Outdoor Set",
    price: 3499,
    description: "Weather-resistant dining set for outdoor entertaining.",
    fullDescription:
      "The Gothenburg Outdoor Set brings the elegance and quality of indoor furniture to your outdoor space. This comprehensive dining set includes a table and six chairs, all crafted from weather-resistant materials designed to withstand the elements while maintaining their beauty. The minimalist Scandinavian design features clean lines and a neutral color palette that complements any outdoor setting. Perfect for alfresco dining, entertaining, or simply enjoying your morning coffee in the fresh air, this set combines style, comfort, and durability.",
    category: "table",
    categoryName: "Tables",
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
    rating: 4.5,
    reviewCount: 67,
    features: [
      "Weather-resistant materials",
      "Comprehensive set includes table and six chairs",
      "Minimalist Scandinavian design",
      "Clean lines and neutral color palette",
      "Perfect for outdoor entertaining",
    ],
    dimensions: [
      { name: "Table Width", value: "180 cm" },
      { name: "Table Depth", value: "90 cm" },
      { name: "Table Height", value: "75 cm" },
      { name: "Chair Width", value: "75 cm" },
      { name: "Chair Depth", value: "80 cm" },
      { name: "Chair Height", value: "85 cm" },
      { name: "Weight", value: "120 kg" },
    ],
    colors: [
      { name: "Natural Oak", hex: "#D2B48C" },
      { name: "Smoked Oak", hex: "#8B4513" },
      { name: "White Oak", hex: "#F5F5F5" },
    ],
    materials: ["Weather-resistant Wood", "Weather-resistant Fabric"],
    careInstructions:
      "Clean with a damp cloth and mild soap if necessary. Dry immediately with a soft cloth. Avoid placing hot items directly on the surface; use coasters and placemats. Keep away from direct sunlight to prevent fading.",
    reviews: [
      {
        author: "Chris H.",
        rating: 5,
        date: "April 15, 2025",
        content:
          "This outdoor set is a game-changer! It's incredibly comfortable and the materials are top-notch. Perfect for our summer gatherings.",
      },
      {
        author: "Amy W.",
        rating: 4,
        date: "March 22, 2025",
        content:
          "Beautiful set with excellent build quality. The weather-resistant materials are a huge plus. Only giving 4 stars because assembly was a bit tricky.",
      },
      {
        author: "Kevin B.",
        rating: 5,
        date: "February 17, 2025",
        content:
          "Worth every penny! This outdoor set has become our favorite spot for summer barbecues. The design is elegant and the materials are durable.",
      },
    ],
  },
  {
    id: 9,
    name: "Helsingborg Coffee Table",
    price: 799,
    description: "Minimalist coffee table with marble top and solid oak legs.",
    fullDescription: "The Helsingborg Coffee Table combines luxury and minimalism with its stunning marble top and solid oak legs. The table's clean lines and mixed materials create a sophisticated centerpiece for any living space. The carefully selected marble top features unique natural patterns, while the solid oak legs provide stable support and warm contrast.",
    category: "table",
    categoryName: "Tables",
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800"
    ],
    rating: 4.6,
    reviewCount: 45,
    features: [
      "Natural marble top",
      "Solid oak legs",
      "Protective felt pads included",
      "Easy assembly",
      "Stain-resistant marble coating"
    ],
    dimensions: [
      { name: "Length", value: "120 cm" },
      { name: "Width", value: "60 cm" },
      { name: "Height", value: "45 cm" },
      { name: "Weight", value: "35 kg" }
    ],
    colors: [
      { name: "White Marble/Natural Oak", hex: "#FFFFFF" },
      { name: "Black Marble/Natural Oak", hex: "#000000" }
    ],
    materials: ["Marble", "Solid Oak"],
    careInstructions: "Clean marble surface with a soft, damp cloth and mild soap. Avoid acidic cleaners. Use coasters to prevent stains. Dust oak legs regularly and treat with wood oil every 6 months.",
    reviews: [
      {
        author: "Sophie M.",
        rating: 5,
        date: "March 28, 2025",
        content: "Beautiful table! The marble top is stunning and the oak legs complement it perfectly. Very sturdy and well-made."
      },
      {
        author: "Marcus P.",
        rating: 4,
        date: "February 15, 2025",
        content: "Great quality and looks exactly as pictured. Assembly was straightforward. Only giving 4 stars because it was heavier than expected."
      }
    ]
  },
  {
    id: 10,
    name: "Kiruna Floor Lamp",
    price: 349,
    oldPrice: 449,
    description: "Adjustable floor lamp with brass details and linen shade.",
    fullDescription: "The Kiruna Floor Lamp combines functionality with elegant design. The adjustable arm and height allow for perfect positioning, while the brass details add a touch of luxury. The natural linen shade diffuses light beautifully, creating a warm and inviting atmosphere in any room.",
    category: "lighting",
    categoryName: "Lighting",
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800"
    ],
    rating: 4.8,
    reviewCount: 56,
    features: [
      "Adjustable arm and height",
      "Premium linen shade",
      "Brass details",
      "LED compatible",
      "Integrated dimmer switch"
    ],
    dimensions: [
      { name: "Base Diameter", value: "30 cm" },
      { name: "Shade Diameter", value: "45 cm" },
      { name: "Maximum Height", value: "180 cm" },
      { name: "Cord Length", value: "200 cm" }
    ],
    colors: [
      { name: "Natural Linen/Brass", hex: "#F5F5DC" },
      { name: "Grey Linen/Brass", hex: "#808080" }
    ],
    materials: ["Brass", "Linen", "Steel"],
    careInstructions: "Dust regularly with a soft, dry cloth. Clean brass parts with a specialized brass cleaner. Vacuum shade gently to remove dust. Keep away from moisture.",
    reviews: [
      {
        author: "Linda K.",
        rating: 5,
        date: "April 1, 2025",
        content: "This lamp is both beautiful and functional. The adjustable arm is perfect for reading, and the dimmer adds great ambiance."
      },
      {
        author: "James R.",
        rating: 4,
        date: "March 10, 2025",
        content: "Excellent quality and design. The brass details are stunning. Assembly was a bit tricky but worth it."
      }
    ]
  },
  {
    id: 11,
    name: "Luleå Side Table",
    price: 399,
    description: "Versatile side table with hidden storage compartment.",
    fullDescription: "The Luleå Side Table is a smart solution for modern living, combining style with functionality. The hidden storage compartment is perfect for keeping living spaces tidy, while the clean lines and mixed material construction create a contemporary aesthetic that works in any room.",
    category: "table",
    categoryName: "Tables",
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800"
    ],
    rating: 4.7,
    reviewCount: 38,
    features: [
      "Hidden storage compartment",
      "Soft-close mechanism",
      "Anti-tip design",
      "Felt-lined storage",
      "Non-marking feet"
    ],
    dimensions: [
      { name: "Diameter", value: "45 cm" },
      { name: "Height", value: "55 cm" },
      { name: "Storage Depth", value: "15 cm" },
      { name: "Weight", value: "8 kg" }
    ],
    colors: [
      { name: "White/Natural Oak", hex: "#FFFFFF" },
      { name: "Black/Natural Oak", hex: "#000000" },
      { name: "Sage Green/Natural Oak", hex: "#9CAF88" }
    ],
    materials: ["Oak", "Powder-coated Steel", "Felt"],
    careInstructions: "Wipe clean with a damp cloth. For wooden parts, use appropriate wood cleaner. Check and tighten hardware periodically. Avoid placing hot items directly on surface.",
    reviews: [
      {
        author: "Rachel T.",
        rating: 5,
        date: "March 20, 2025",
        content: "Perfect size and the hidden storage is so useful! The soft-close mechanism is a nice touch. Very happy with this purchase."
      },
      {
        author: "David L.",
        rating: 4,
        date: "February 5, 2025",
        content: "Great little table with clever storage. Assembly was easy and the quality is excellent."
      }
    ]
  },
  {
    id: 12,
    name: "Umeå Wall Shelf",
    price: 249,
    description: "Floating wall shelf with integrated wireless charging.",
    fullDescription: "The Umeå Wall Shelf is a modern solution for today's tech-savvy homes. This innovative floating shelf features an integrated wireless charging pad, perfect for keeping devices powered while maintaining a clean, organized space. The minimalist design and hidden mounting system create a sleek, floating appearance.",
    category: "storage",
    categoryName: "Storage",
    image: "/placeholder.svg?height=600&width=600",
    images: [
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800"
    ],
    rating: 4.5,
    reviewCount: 42,
    features: [
      "Integrated wireless charging",
      "Hidden mounting system",
      "Cable management solution",
      "LED charging indicator",
      "15W fast charging capability"
    ],
    dimensions: [
      { name: "Length", value: "60 cm" },
      { name: "Depth", value: "20 cm" },
      { name: "Height", value: "5 cm" },
      { name: "Weight Capacity", value: "5 kg" }
    ],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#000000" },
      { name: "Oak", hex: "#D2B48C" }
    ],
    materials: ["MDF", "Oak Veneer", "Electronics"],
    careInstructions: "Dust regularly with a soft, dry cloth. Keep charging surface clean for optimal performance. Do not exceed weight capacity. Avoid water contact with electronic components.",
    reviews: [
      {
        author: "Michael P.",
        rating: 5,
        date: "March 15, 2025",
        content: "Love the wireless charging feature! It's perfect for my bedside setup and looks very sleek on the wall."
      },
      {
        author: "Sarah K.",
        rating: 4,
        date: "February 20, 2025",
        content: "Great concept and execution. Installation was straightforward and the charging works perfectly."
      }
    ]
  }
]

export const getAllProducts = (): Product[] => {
  return products
}

export const getProductById = (id: number): Product | undefined => {
  return products.find((product) => product.id === id)
}

export const getRelatedProducts = (id: number): Product[] => {
  const product = products.find((product) => product.id === id)
  if (!product) {
    return []
  }
  return products.filter((p) => p.category === product.category && p.id !== id).slice(0, 4)
}
