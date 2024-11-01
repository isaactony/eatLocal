import React, { createContext, useContext } from 'react';

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  farm: {
    id: number;
    name: string;
  };
  category: string;
  organic: boolean;
  inStock: boolean;
};

const products: Product[] = [
  {
    id: 1,
    name: "Organic Tomatoes",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&q=80",
    description: "Fresh, locally grown organic tomatoes",
    farm: {
      id: 1,
      name: "Miller's Family Farm"
    },
    category: "Vegetables",
    organic: true,
    inStock: true
  },
  {
    id: 2,
    name: "Farm Fresh Eggs",
    price: 6.99,
    image: "https://images.unsplash.com/photo-1569288052389-dac9b0ac9eac?auto=format&fit=crop&q=80",
    description: "Free-range eggs from happy hens",
    farm: {
      id: 4,
      name: "Happy Hens Farm"
    },
    category: "Dairy & Eggs",
    organic: true,
    inStock: true
  },
  {
    id: 3,
    name: "Raw Honey",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80",
    description: "Pure, unfiltered honey from local wildflowers",
    farm: {
      id: 3,
      name: "Sunny Bee Apiaries"
    },
    category: "Honey & Preserves",
    organic: true,
    inStock: true
  },
  {
    id: 4,
    name: "Organic Spinach",
    price: 3.99,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80",
    description: "Fresh organic spinach leaves",
    farm: {
      id: 2,
      name: "Green Valley Organics"
    },
    category: "Vegetables",
    organic: true,
    inStock: true
  },
  {
    id: 5,
    name: "Heirloom Carrots",
    price: 4.49,
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80",
    description: "Multi-colored organic heirloom carrots",
    farm: {
      id: 1,
      name: "Miller's Family Farm"
    },
    category: "Vegetables",
    organic: true,
    inStock: true
  },
  {
    id: 6,
    name: "Fresh Strawberries",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1543528176-61b239494933?auto=format&fit=crop&q=80",
    description: "Sweet and juicy organic strawberries",
    farm: {
      id: 2,
      name: "Green Valley Organics"
    },
    category: "Fruits",
    organic: true,
    inStock: true
  },
  {
    id: 7,
    name: "Artisanal Cheese",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&q=80",
    description: "Hand-crafted organic cheese",
    farm: {
      id: 4,
      name: "Happy Hens Farm"
    },
    category: "Dairy & Eggs",
    organic: true,
    inStock: true
  },
  {
    id: 8,
    name: "Fresh Basil",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1618164435735-413d3b066c9a?auto=format&fit=crop&q=80",
    description: "Aromatic fresh basil",
    farm: {
      id: 2,
      name: "Green Valley Organics"
    },
    category: "Herbs",
    organic: true,
    inStock: true
  },
  {
    id: 9,
    name: "Organic Apples",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&q=80",
    description: "Crisp and sweet organic apples",
    farm: {
      id: 1,
      name: "Miller's Family Farm"
    },
    category: "Fruits",
    organic: true,
    inStock: true
  },
  {
    id: 10,
    name: "Fresh Mint",
    price: 2.49,
    image: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?auto=format&fit=crop&q=80",
    description: "Fresh mint leaves",
    farm: {
      id: 2,
      name: "Green Valley Organics"
    },
    category: "Herbs",
    organic: true,
    inStock: true
  },
  {
    id: 11,
    name: "Wildflower Honey",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1471943311424-646960669fbc?auto=format&fit=crop&q=80",
    description: "Raw wildflower honey",
    farm: {
      id: 3,
      name: "Sunny Bee Apiaries"
    },
    category: "Honey & Preserves",
    organic: true,
    inStock: true
  },
  {
    id: 12,
    name: "Organic Butter",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&q=80",
    description: "Creamy organic butter",
    farm: {
      id: 4,
      name: "Happy Hens Farm"
    },
    category: "Dairy & Eggs",
    organic: true,
    inStock: true
  }
];

const ProductsContext = createContext<{
  products: Product[];
  getProductsByFarm: (farmId: number | null) => Product[];
  getFeaturedProducts: () => Product[];
} | undefined>(undefined);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const getProductsByFarm = (farmId: number | null) => {
    if (!farmId) return products;
    return products.filter(product => product.farm.id === farmId);
  };

  const getFeaturedProducts = () => {
    return products.slice(0, 4);
  };

  return (
    <ProductsContext.Provider value={{ products, getProductsByFarm, getFeaturedProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}