import { Address, FAQItem, Order, Product, Testimonial } from "./types";

export const collections = [
  {
    slug: "the-line",
    name: "The Line",
    tagline: "Tailored essentials, cut for movement",
    image:
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=1200&q=80"
  },
  {
    slug: "field-study",
    name: "Field Study",
    tagline: "Technical outerwear for the in-between seasons",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&q=80"
  },
  {
    slug: "night-runner",
    name: "Night Runner",
    tagline: "Footwear built on a lower, longer platform",
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&q=80"
  }
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "vantage-wool-overcoat",
    name: "Wool Overcoat",
    category: "apparel",
    collection: "the-line",
    price: 480,
    isNew: true,
    rating: 4.8,
    reviewCount: 132,
    colors: [
      {
        name: "Ink",
        hex: "#0A0A0B",
        image:
          "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=1000&q=80",
        hoverImage:
          "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=1000&q=80"
      },
      {
        name: "Stone",
        hex: "#A39E93",
        image:
          "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=1000&q=80"
      }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "A double-faced wool overcoat with a clean, unbroken silhouette. Structured through the shoulder and left open through the body for a fall that reads architectural rather than boxy.",
    details: [
      "Double-faced Italian wool, 620gsm",
      "Interior utility pocket with magnetic close",
      "Horn-effect button placket",
      "Dry clean only"
    ],
    materials: "90% wool, 10% cashmere",
    sku: "VF-OC-001"
  },
  {
    id: "p2",
    slug: "flow-tech-shell",
    name: "Flow Tech Shell",
    category: "apparel",
    collection: "field-study",
    price: 310,
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 214,
    colors: [
      {
        name: "Graphite",
        hex: "#3A3A3D",
        image:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1000&q=80"
      },
      {
        name: "Bone",
        hex: "#F6F5F2",
        image:
          "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1000&q=80"
      }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description:
      "A three-layer waterproof shell engineered for city weather. Taped seams, a storm-ready hood, and a packable build that compresses into its own chest pocket.",
    details: [
      "3-layer waterproof membrane, 20k/20k rating",
      "Fully taped seams",
      "Packs into internal chest pocket",
      "Machine wash cold"
    ],
    materials: "100% recycled nylon shell",
    sku: "VF-FS-014"
  },
  {
    id: "p3",
    slug: "current-crewneck",
    name: "Current Heavyweight Crew",
    category: "apparel",
    collection: "the-line",
    price: 128,
    isBestSeller: true,
    rating: 4.7,
    reviewCount: 401,
    colors: [
      {
        name: "Ink",
        hex: "#0A0A0B",
        image:
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1000&q=80"
      },
      {
        name: "Moss",
        hex: "#4A5942",
        image:
          "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1000&q=80"
      },
      {
        name: "Bone",
        hex: "#F6F5F2",
        image:
          "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1000&q=80"
      }
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description:
      "440gsm loopback cotton, garment-dyed for a broken-in feel from the first wear. Dropped shoulder, ribbed hem, and a longer body length.",
    details: [
      "440gsm loopback cotton",
      "Garment-dyed for tonal depth",
      "Dropped shoulder seam",
      "Machine wash cold, tumble dry low"
    ],
    materials: "100% organic cotton",
    sku: "VF-CN-022"
  },
  {
    id: "p4",
    slug: "night-runner-low",
    name: "Night Runner Low",
    category: "footwear",
    collection: "night-runner",
    price: 225,
    isNew: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 358,
    colors: [
      {
        name: "Triple Ink",
        hex: "#0A0A0B",
        image:
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1000&q=80"
      },
      {
        name: "Bone/Current",
        hex: "#2F5D50",
        image:
          "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=1000&q=80"
      }
    ],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11", "12"],
    description:
      "A lower, longer platform built on a proprietary foam compound. Knit upper with fused overlays for structure without added weight.",
    details: [
      "Dual-density foam midsole",
      "Engineered knit upper",
      "Fused synthetic overlays",
      "Wipe clean with a damp cloth"
    ],
    materials: "Engineered knit, EVA foam sole",
    sku: "VF-NR-101"
  },
  {
    id: "p5",
    slug: "trail-mid-boot",
    name: "Trail Mid Boot",
    category: "footwear",
    collection: "field-study",
    price: 265,
    rating: 4.6,
    reviewCount: 97,
    colors: [
      {
        name: "Umber",
        hex: "#5A4632",
        image:
          "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=1000&q=80"
      }
    ],
    sizes: ["7", "8", "9", "10", "11", "12"],
    description:
      "A weatherproofed mid-boot with a lugged rubber outsole. Full-grain leather upper treated for water resistance without a membrane liner.",
    details: [
      "Water-resistant full-grain leather",
      "Lugged rubber outsole, 6mm",
      "Reinforced toe cap",
      "Condition leather every 3 months"
    ],
    materials: "Full-grain leather, rubber sole",
    sku: "VF-TB-045"
  },
  {
    id: "p6",
    slug: "vantage-court-sneaker",
    name: "Vantage Court Sneaker",
    category: "footwear",
    collection: "the-line",
    price: 195,
    rating: 4.5,
    reviewCount: 176,
    colors: [
      {
        name: "Bone",
        hex: "#F6F5F2",
        image:
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1000&q=80"
      },
      {
        name: "Ink",
        hex: "#0A0A0B",
        image:
          "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=1000&q=80"
      }
    ],
    sizes: ["7", "7.5", "8", "8.5", "9", "9.5", "10", "10.5", "11"],
    description:
      "A minimal court silhouette in full-grain leather with a vulcanized rubber sole. Built to be resoled, not replaced.",
    details: [
      "Full-grain leather upper",
      "Vulcanized rubber outsole",
      "Resoleable construction",
      "Wipe clean, avoid direct heat"
    ],
    materials: "Full-grain leather, natural rubber",
    sku: "VF-CS-078"
  },
  {
    id: "p7",
    slug: "structured-tote",
    name: "Structured Tote",
    category: "accessories",
    collection: "the-line",
    price: 340,
    isNew: true,
    rating: 4.8,
    reviewCount: 64,
    colors: [
      {
        name: "Ink",
        hex: "#0A0A0B",
        image:
          "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=1000&q=80"
      },
      {
        name: "Umber",
        hex: "#5A4632",
        image:
          "https://images.unsplash.com/photo-1591561582301-7ce6588cc286?w=1000&q=80"
      }
    ],
    sizes: ["One Size"],
    description:
      "Full-grain leather tote with a self-standing structured base. Interior laptop sleeve and a detachable zip pouch for small items.",
    details: [
      "Full-grain vegetable-tanned leather",
      "Self-standing structured base",
      "Fits 15-inch laptop",
      "Condition periodically with leather balm"
    ],
    materials: "100% full-grain leather",
    sku: "VF-BG-009"
  },
  {
    id: "p8",
    slug: "signal-cap",
    name: "Signal Cap",
    category: "accessories",
    collection: "field-study",
    price: 58,
    isBestSeller: true,
    rating: 4.6,
    reviewCount: 288,
    colors: [
      {
        name: "Ink",
        hex: "#0A0A0B",
        image:
          "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=1000&q=80"
      },
      {
        name: "Current",
        hex: "#2F5D50",
        image:
          "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=1000&q=80"
      }
    ],
    sizes: ["One Size"],
    description:
      "A six-panel cap in brushed cotton twill with an embroidered vantage mark at the back closure. Unstructured crown, curved brim.",
    details: [
      "Brushed cotton twill",
      "Embroidered brass closure",
      "Unstructured six-panel crown",
      "Spot clean only"
    ],
    materials: "100% cotton twill",
    sku: "VF-CP-033"
  },
  {
    id: "p9",
    slug: "wool-scarf",
    name: "Merino Wool Scarf",
    category: "accessories",
    collection: "the-line",
    price: 95,
    rating: 4.7,
    reviewCount: 52,
    colors: [
      {
        name: "Moss",
        hex: "#4A5942",
        image:
          "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=1000&q=80"
      }
    ],
    sizes: ["One Size"],
    description:
      "An oversized scarf in brushed merino wool with a fringed edge finish. Woven in a mid-weight gauge for year-round layering.",
    details: [
      "180cm x 45cm",
      "Brushed merino wool",
      "Fringed edge finish",
      "Hand wash cold"
    ],
    materials: "100% merino wool",
    sku: "VF-SC-061"
  },
  {
    id: "p10",
    slug: "vantage-candle",
    name: "No. 02 Candle — Cedar & Salt",
    category: "lifestyle",
    collection: "the-line",
    price: 62,
    isNew: true,
    rating: 4.9,
    reviewCount: 41,
    colors: [
      {
        name: "Natural",
        hex: "#EEECE6",
        image:
          "https://images.unsplash.com/photo-1602874801007-bd36c0b56166?w=1000&q=80"
      }
    ],
    sizes: ["One Size"],
    description:
      "A slow-burn soy and coconut wax candle poured in a reusable ceramic vessel. Notes of cedar, sea salt, and vetiver.",
    details: [
      "60 hour burn time",
      "Coconut-soy wax blend",
      "Reusable matte ceramic vessel",
      "Trim wick to 5mm before each burn"
    ],
    materials: "Soy-coconut wax, cotton wick",
    sku: "VF-CD-002"
  },
  {
    id: "p11",
    slug: "travel-duffel",
    name: "Weekend Duffel",
    category: "lifestyle",
    collection: "field-study",
    price: 285,
    rating: 4.7,
    reviewCount: 88,
    colors: [
      {
        name: "Graphite",
        hex: "#3A3A3D",
        image:
          "https://images.unsplash.com/photo-1547949003-9792a18a2645?w=1000&q=80"
      }
    ],
    sizes: ["One Size"],
    description:
      "A weatherproofed canvas duffel with a rigid base and a dedicated shoe compartment. Sized to clear most carry-on limits.",
    details: [
      "Waxed canvas exterior",
      "Rigid recycled-plastic base",
      "Separate ventilated shoe compartment",
      "Wipe clean with a damp cloth"
    ],
    materials: "Waxed canvas, leather trim",
    sku: "VF-DF-017"
  },
  {
    id: "p12",
    slug: "relaxed-trouser",
    name: "Relaxed Wool Trouser",
    category: "apparel",
    collection: "the-line",
    price: 210,
    rating: 4.6,
    reviewCount: 143,
    colors: [
      {
        name: "Ink",
        hex: "#0A0A0B",
        image:
          "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1000&q=80"
      },
      {
        name: "Stone",
        hex: "#A39E93",
        image:
          "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=1000&q=80"
      }
    ],
    sizes: ["28", "30", "32", "34", "36", "38"],
    description:
      "A relaxed-through-the-leg trouser in mid-weight wool twill, finished with a clean waistband and no visible topstitching.",
    details: [
      "Mid-weight wool twill",
      "Clean waistband, hidden hook closure",
      "Tapered leg opening",
      "Dry clean recommended"
    ],
    materials: "95% wool, 5% elastane",
    sku: "VF-TR-058"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Marisol D.",
    location: "Chicago, IL",
    quote:
      "The overcoat is the best piece of outerwear I've owned. It doesn't look like anything else in my closet, and the wool has only gotten better with wear.",
    rating: 5
  },
  {
    id: "t2",
    name: "Andre K.",
    location: "Austin, TX",
    quote:
      "Sizing was accurate, shipping was fast, and the Night Runner Low is genuinely more comfortable than shoes twice the price.",
    rating: 5
  },
  {
    id: "t3",
    name: "Priya S.",
    location: "Brooklyn, NY",
    quote:
      "Every piece I've bought from Vantage Flow has held up to daily wear. This is a brand that clearly designs for real life, not just photos.",
    rating: 4
  }
];

export const faqs: FAQItem[] = [
  {
    question: "What is your return policy?",
    answer:
      "Unworn items in original condition can be returned within 30 days of delivery for a full refund to your original payment method. Final sale items are marked as such on the product page."
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping within the continental US takes 3–5 business days. Express shipping (1–2 business days) is available at checkout. International shipping timelines vary by destination, typically 7–14 business days."
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to over 30 countries. Duties and import taxes are calculated at checkout so there are no surprise charges on delivery."
  },
  {
    question: "How do I find my size?",
    answer:
      "Every product page includes a size guide link with detailed measurements. If you're between sizes, our general recommendation is noted on each product page based on that item's fit."
  },
  {
    question: "Can I exchange an item for a different size?",
    answer:
      "Yes. Start an exchange from your account's order history, or contact us and we'll issue a prepaid label. Exchanges are free within the continental US."
  },
  {
    question: "How do I care for wool and leather pieces?",
    answer:
      "Care instructions are listed on each product's detail tab and on the garment's care label. As a general rule, wool pieces should be dry cleaned and leather goods conditioned every few months."
  }
];

export const mockAddresses: Address[] = [
  {
    id: "addr1",
    label: "Home",
    fullName: "Jordan Ellis",
    line1: "412 Ashland Ave, Apt 3B",
    city: "Chicago",
    state: "IL",
    zip: "60614",
    country: "United States",
    isDefault: true
  },
  {
    id: "addr2",
    label: "Office",
    fullName: "Jordan Ellis",
    line1: "88 Wacker Dr, Floor 12",
    city: "Chicago",
    state: "IL",
    zip: "60601",
    country: "United States"
  }
];

export const mockOrders: Order[] = [
  {
    id: "VF-10482",
    date: "June 18, 2026",
    status: "Delivered",
    total: 438,
    items: [
      {
        name: "Flow Tech Shell",
        image:
          "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&q=80",
        quantity: 1,
        price: 310
      },
      {
        name: "Current Heavyweight Crew",
        image:
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&q=80",
        quantity: 1,
        price: 128
      }
    ]
  },
  {
    id: "VF-10217",
    date: "May 2, 2026",
    status: "Shipped",
    total: 225,
    items: [
      {
        name: "Night Runner Low",
        image:
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&q=80",
        quantity: 1,
        price: 225
      }
    ]
  },
  {
    id: "VF-09950",
    date: "March 21, 2026",
    status: "Delivered",
    total: 190,
    items: [
      {
        name: "Signal Cap",
        image:
          "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=200&q=80",
        quantity: 2,
        price: 58
      },
      {
        name: "Merino Wool Scarf",
        image:
          "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=200&q=80",
        quantity: 1,
        price: 95
      }
    ]
  }
];
