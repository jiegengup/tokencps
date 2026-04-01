import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  packageType?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export const useCartStore = create<CartState>()(persist(
  (set) => ({
    items: [],
    total: 0,
    addItem: (item) => {
      set((state) => {
        const existingItem = state.items.find((i) => i.id === item.id);
        let newItems;
        if (existingItem) {
          newItems = state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          );
        } else {
          newItems = [...state.items, item];
        }
        const newTotal = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
        return { items: newItems, total: newTotal };
      });
    },
    removeItem: (id) => {
      set((state) => {
        const newItems = state.items.filter((i) => i.id !== id);
        const newTotal = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
        return { items: newItems, total: newTotal };
      });
    },
    clearCart: () => {
      set({ items: [], total: 0 });
    },
    updateQuantity: (id, quantity) => {
      set((state) => {
        const newItems = state.items.map((i) =>
          i.id === id ? { ...i, quantity } : i
        );
        const newTotal = newItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
        return { items: newItems, total: newTotal };
      });
    },
  }),
  {
    name: 'cart-storage',
  }
));
