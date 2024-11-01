import React, { createContext, useContext } from 'react';

export type Farm = {
  id: number;
  name: string;
  description: string;
  image: string;
  location: string;
  specialty: string;
  rating: number;
  certifications: string[];
};

const farms: Farm[] = [
  {
    id: 1,
    name: "Miller's Family Farm",
    description: "Three generations of sustainable farming practices, specializing in heirloom vegetables and fruits.",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80",
    location: "Vermont",
    specialty: "Heirloom Vegetables",
    rating: 4.8,
    certifications: ["organic", "sustainable"]
  },
  {
    id: 2,
    name: "Green Valley Organics",
    description: "Certified organic farm focusing on regenerative agriculture and biodiversity.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80",
    location: "California",
    specialty: "Organic Produce",
    rating: 4.9,
    certifications: ["organic", "biodynamic"]
  },
  {
    id: 3,
    name: "Sunny Bee Apiaries",
    description: "Family-owned apiary producing pure, raw honey through sustainable beekeeping practices.",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80",
    location: "Oregon",
    specialty: "Raw Honey",
    rating: 4.7,
    certifications: ["organic"]
  },
  {
    id: 4,
    name: "Happy Hens Farm",
    description: "Free-range poultry farm committed to animal welfare and producing the highest quality eggs.",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80",
    location: "Washington",
    specialty: "Free-Range Eggs",
    rating: 4.9,
    certifications: ["humane", "organic"]
  }
];

const FarmsContext = createContext<{
  farms: Farm[];
  getFarmById: (id: number) => Farm | undefined;
} | undefined>(undefined);

export function FarmsProvider({ children }: { children: React.ReactNode }) {
  const getFarmById = (id: number) => {
    return farms.find(farm => farm.id === id);
  };

  return (
    <FarmsContext.Provider value={{ farms, getFarmById }}>
      {children}
    </FarmsContext.Provider>
  );
}

export function useFarms() {
  const context = useContext(FarmsContext);
  if (context === undefined) {
    throw new Error('useFarms must be used within a FarmsProvider');
  }
  return context;
}