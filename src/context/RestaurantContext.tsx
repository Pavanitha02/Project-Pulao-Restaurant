"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  isVeg: boolean;
  isChefRecommended?: boolean;
  isPopular?: boolean;
  spicyLevel?: 0 | 1 | 2 | 3; // 0 = mild, 3 = very spicy
  image: string;
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  occasion: string;
  specialRequests?: string;
  status: "pending" | "approved" | "cancelled";
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface Timing {
  weekday: string;
  weekend: string;
  delivery: string;
}

export interface Offer {
  id: string;
  code: string;
  description: string;
  discountPercentage: number;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

interface RestaurantContextType {
  menuItems: MenuItem[];
  reservations: Reservation[];
  inquiries: Inquiry[];
  timings: Timing;
  offers: Offer[];
  cart: CartItem[];
  addMenuItem: (item: Omit<MenuItem, "id">) => void;
  updateMenuItem: (id: string, updated: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  addReservation: (res: Omit<Reservation, "id" | "status" | "createdAt">) => void;
  updateReservationStatus: (id: string, status: Reservation["status"]) => void;
  addInquiry: (inq: Omit<Inquiry, "id" | "createdAt">) => void;
  updateTimings: (newTimings: Timing) => void;
  addOffer: (offer: Omit<Offer, "id">) => void;
  deleteOffer: (id: string) => void;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

const DEFAULT_MENU: MenuItem[] = [
  // Biryanis
  {
    id: "b1",
    name: "Shreyas Grand Special Mutton Fry Piece Biryani",
    category: "Biryanis",
    price: 380,
    description: "Tender, juicy mutton fry pieces slow-cooked with aromatic, premium long-grain Basmati rice and our signature spice blend.",
    isVeg: false,
    isChefRecommended: true,
    isPopular: true,
    spicyLevel: 3,
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "b2",
    name: "Special Chicken Dum Biryani",
    category: "Biryanis",
    price: 320,
    description: "Authentic Hyderabadi style dum biryani with marinated chicken pieces cooked under pressure with layers of fragrant basmati rice.",
    isVeg: false,
    isChefRecommended: false,
    isPopular: true,
    spicyLevel: 2,
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "b3",
    name: "Paneer Tikka Biryani",
    category: "Biryanis",
    price: 280,
    description: "Tandoori grilled paneer tikka cubes layered with saffron infused basmati rice, mint, and fried onions.",
    isVeg: true,
    isChefRecommended: false,
    isPopular: false,
    spicyLevel: 1,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600&auto=format&fit=crop"
  },
  // Taste of Pulaos
  {
    id: "p1",
    name: "Raju Gari Kodi Pulao",
    category: "Taste Of Pulaos",
    price: 340,
    description: "A legendary Andhra delicacy of tender chicken sautéed in a fiery green chilli paste and Chittimutyalu short-grain rice.",
    isVeg: false,
    isChefRecommended: true,
    isPopular: true,
    spicyLevel: 3,
    image: "/images/luxury_biryani_pulao.png"
  },
  {
    id: "p2",
    name: "Kaju Paneer Pulao",
    category: "Taste Of Pulaos",
    price: 310,
    description: "Rich roasted cashews and soft paneer cubes tossed in a lightly spiced aromatic ghee pulao rice.",
    isVeg: true,
    isChefRecommended: false,
    isPopular: false,
    spicyLevel: 1,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "p3",
    name: "Gongura Mutton Pulao",
    category: "Taste Of Pulaos",
    price: 410,
    description: "Tender chunks of mutton cooked with tangy sorrel (Gongura) leaves, hand-ground Andhra spices, and premium rice.",
    isVeg: false,
    isChefRecommended: true,
    isPopular: true,
    spicyLevel: 3,
    image: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "p4",
    name: "Prawns Fry Pulao",
    category: "Taste Of Pulaos",
    price: 390,
    description: "Crispy pan-fried prawns seasoned with southern spices, layered over delicate ghee rice.",
    isVeg: false,
    isChefRecommended: false,
    isPopular: false,
    spicyLevel: 2,
    image: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?q=80&w=600&auto=format&fit=crop"
  },
  // Chinese Starters
  {
    id: "c1",
    name: "Dragon Chicken",
    category: "Chinese Starters",
    price: 260,
    description: "Crispy chicken strips tossed in a fiery red sauce with cashew nuts, bell peppers, and fresh spring onions.",
    isVeg: false,
    isChefRecommended: false,
    isPopular: true,
    spicyLevel: 2,
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "c2",
    name: "Crispy Chilli Paneer",
    category: "Chinese Starters",
    price: 240,
    description: "Batter-fried paneer cubes tossed with fresh bell peppers, onions, soy sauce, and green chillies.",
    isVeg: true,
    isChefRecommended: false,
    isPopular: false,
    spicyLevel: 2,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600&auto=format&fit=crop"
  },
  // South Indian Non Veg
  {
    id: "s1",
    name: "Nellore Chepala Pulusu",
    category: "South Indian Non Veg",
    price: 360,
    description: "Traditional tangy and spicy Andhra fish curry slow-simmered in tamarind extract and country spices in clay pots.",
    isVeg: false,
    isChefRecommended: true,
    isPopular: true,
    spicyLevel: 3,
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "s2",
    name: "Andhra Kodi Vepudu",
    category: "South Indian Non Veg",
    price: 290,
    description: "Dry, spicy chicken fry roasted with fresh curry leaves, crushed black pepper, and stone-ground spices.",
    isVeg: false,
    isChefRecommended: false,
    isPopular: true,
    spicyLevel: 3,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=600&auto=format&fit=crop"
  },
  // Tandoori Starters
  {
    id: "t1",
    name: "Murgh Malai Tikka",
    category: "Tandoori Starters",
    price: 310,
    description: "Velvety chicken chunks marinated in cream, cheese, cardamom, and white pepper, chargrilled in the clay oven.",
    isVeg: false,
    isChefRecommended: true,
    isPopular: false,
    spicyLevel: 0,
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "t2",
    name: "Tandoori Chicken (Half)",
    category: "Tandoori Starters",
    price: 270,
    description: "Classic spring chicken marinated in yogurt and spiced kashmiri chillies, grilled to smoky perfection.",
    isVeg: false,
    isChefRecommended: false,
    isPopular: true,
    spicyLevel: 2,
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=600&auto=format&fit=crop"
  },
  // Main Course
  {
    id: "m1",
    name: "Shreyas Butter Chicken Masala",
    category: "Main Course",
    price: 320,
    description: "Succulent tandoori chicken cooked in a rich, buttery, velvety tomato gravy with a hint of fenugreek.",
    isVeg: false,
    isChefRecommended: false,
    isPopular: true,
    spicyLevel: 1,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "m2",
    name: "Nellore Special Dal Tadka",
    category: "Main Course",
    price: 190,
    description: "Yellow lentils tempered with aromatic cumin seeds, garlic, red chillies, and organic ghee.",
    isVeg: true,
    isChefRecommended: false,
    isPopular: false,
    spicyLevel: 1,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=600&auto=format&fit=crop"
  },
  // Fried Rice & Noodles
  {
    id: "fr1",
    name: "Egg Fried Rice",
    category: "Fried Rice & Noodles",
    price: 210,
    description: "Classic wok-tossed long grain rice with fluffy scrambled eggs, spring onions, and oriental sauces.",
    isVeg: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1603133872878-6966b46880a0?q=80&w=600&auto=format&fit=crop"
  },
  // Breads
  {
    id: "br1",
    name: "Butter Naan",
    category: "Breads",
    price: 55,
    description: "Soft, leavened clay-oven baked flatbread smeared with rich premium butter.",
    isVeg: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "br2",
    name: "Garlic Butter Naan",
    category: "Breads",
    price: 65,
    description: "Butter naan infused with minced garlic and chopped fresh coriander leaves.",
    isVeg: true,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600&auto=format&fit=crop"
  },
  // Desserts and Beverages
  {
    id: "d1",
    name: "Saffron Double Ka Meetha",
    category: "Desserts and Beverages",
    price: 150,
    description: "Classic Hyderabadi bread pudding soaked in saffron milk, ghee, and loaded with dry fruits.",
    isVeg: true,
    isChefRecommended: true,
    isPopular: true,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "d2",
    name: "Elachi Apricot Delight",
    category: "Desserts and Beverages",
    price: 180,
    description: "Rich stewed apricots layered with creamy house custard and pistachio crumbles.",
    isVeg: true,
    isChefRecommended: false,
    isPopular: false,
    image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=600&auto=format&fit=crop"
  }
];

const DEFAULT_TIMINGS: Timing = {
  weekday: "11:00 AM - 11:00 PM",
  weekend: "11:00 AM - 11:30 PM",
  delivery: "11:00 AM - 10:30 PM"
};

const DEFAULT_OFFERS: Offer[] = [
  { id: "o1", code: "SHREYAS15", description: "Get 15% off on your first online reservation or order above ₹500", discountPercentage: 15 },
  { id: "o2", code: "BIRYANILOVE", description: "Save 10% on signature Andhra Pulaos & Biryanis on weekdays", discountPercentage: 10 }
];

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [timings, setTimings] = useState<Timing>(DEFAULT_TIMINGS);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on client-side mount
  useEffect(() => {
    try {
      const storedMenu = localStorage.getItem("shreyas_menu");
      const storedRes = localStorage.getItem("shreyas_reservations");
      const storedInq = localStorage.getItem("shreyas_inquiries");
      const storedTimings = localStorage.getItem("shreyas_timings");
      const storedOffers = localStorage.getItem("shreyas_offers");

      if (storedMenu) setMenuItems(JSON.parse(storedMenu));
      else {
        setMenuItems(DEFAULT_MENU);
        localStorage.setItem("shreyas_menu", JSON.stringify(DEFAULT_MENU));
      }

      if (storedRes) setReservations(JSON.parse(storedRes));
      else {
        setReservations([]);
        localStorage.setItem("shreyas_reservations", JSON.stringify([]));
      }

      if (storedInq) setInquiries(JSON.parse(storedInq));
      else {
        setInquiries([]);
        localStorage.setItem("shreyas_inquiries", JSON.stringify([]));
      }

      if (storedTimings) setTimings(JSON.parse(storedTimings));
      else {
        setTimings(DEFAULT_TIMINGS);
        localStorage.setItem("shreyas_timings", JSON.stringify(DEFAULT_TIMINGS));
      }

      if (storedOffers) setOffers(JSON.parse(storedOffers));
      else {
        setOffers(DEFAULT_OFFERS);
        localStorage.setItem("shreyas_offers", JSON.stringify(DEFAULT_OFFERS));
      }
    } catch (e) {
      console.error("Local storage error:", e);
      setMenuItems(DEFAULT_MENU);
      setOffers(DEFAULT_OFFERS);
    }
    setIsLoaded(true);
  }, []);

  // Sync helpers
  const saveMenu = (newMenu: MenuItem[]) => {
    setMenuItems(newMenu);
    localStorage.setItem("shreyas_menu", JSON.stringify(newMenu));
  };

  const saveReservations = (newRes: Reservation[]) => {
    setReservations(newRes);
    localStorage.setItem("shreyas_reservations", JSON.stringify(newRes));
  };

  const saveInquiries = (newInq: Inquiry[]) => {
    setInquiries(newInq);
    localStorage.setItem("shreyas_inquiries", JSON.stringify(newInq));
  };

  const saveTimings = (newTimings: Timing) => {
    setTimings(newTimings);
    localStorage.setItem("shreyas_timings", JSON.stringify(newTimings));
  };

  const saveOffers = (newOffers: Offer[]) => {
    setOffers(newOffers);
    localStorage.setItem("shreyas_offers", JSON.stringify(newOffers));
  };

  // CRUD Menu
  const addMenuItem = (item: Omit<MenuItem, "id">) => {
    const newItem: MenuItem = {
      ...item,
      id: "item_" + Date.now()
    };
    saveMenu([...menuItems, newItem]);
  };

  const updateMenuItem = (id: string, updated: Partial<MenuItem>) => {
    const next = menuItems.map(m => (m.id === id ? { ...m, ...updated } : m));
    saveMenu(next);
  };

  const deleteMenuItem = (id: string) => {
    const next = menuItems.filter(m => m.id !== id);
    saveMenu(next);
  };

  // Reservation Form
  const addReservation = (res: Omit<Reservation, "id" | "status" | "createdAt">) => {
    const newRes: Reservation = {
      ...res,
      id: "res_" + Date.now(),
      status: "pending",
      createdAt: new Date().toISOString()
    };
    saveReservations([newRes, ...reservations]);
  };

  const updateReservationStatus = (id: string, status: Reservation["status"]) => {
    const next = reservations.map(r => (r.id === id ? { ...r, status } : r));
    saveReservations(next);
  };

  // Contact Form
  const addInquiry = (inq: Omit<Inquiry, "id" | "createdAt">) => {
    const newInq: Inquiry = {
      ...inq,
      id: "inq_" + Date.now(),
      createdAt: new Date().toISOString()
    };
    saveInquiries([newInq, ...inquiries]);
  };

  // Timings
  const updateTimings = (newTimings: Timing) => {
    saveTimings(newTimings);
  };

  // Offers
  const addOffer = (offer: Omit<Offer, "id">) => {
    const newOffer: Offer = {
      ...offer,
      id: "offer_" + Date.now()
    };
    saveOffers([...offers, newOffer]);
  };

  const deleteOffer = (id: string) => {
    const next = offers.filter(o => o.id !== id);
    saveOffers(next);
  };

  // Cart operations
  const addToCart = (item: MenuItem) => {
    const existing = cart.find(c => c.menuItem.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.menuItem.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, { menuItem: item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(c => c.menuItem.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(c => c.menuItem.id === itemId ? { ...c, quantity } : c));
    }
  };

  const clearCart = () => setCart([]);

  if (!isLoaded) {
    return null; // Prevents server/client hydration mismatch
  }

  return (
    <RestaurantContext.Provider
      value={{
        menuItems,
        reservations,
        inquiries,
        timings,
        offers,
        cart,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        addReservation,
        updateReservationStatus,
        addInquiry,
        updateTimings,
        addOffer,
        deleteOffer,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart
      }}
    >
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) throw new Error("useRestaurant must be used within RestaurantProvider");
  return context;
};
