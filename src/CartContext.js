import { createContext, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { MESSAGES } from "./constants/messages";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useLocalStorage("streamCart", []);
  const [warning, setWarning] = useState("");

  const isSubscription = (item) => item.id >= 1 && item.id <= 4;

  const addToCart = (item) => {
    let newWarning = "";

    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      const existingSubscription = prev.find((i) => isSubscription(i));

      if (isSubscription(item)) {
        if (existingItem || existingSubscription) {
          newWarning = MESSAGES.SUBSCRIPTION_LIMIT;
          return prev;
        }

        return [...prev, { ...item, quantity: 1 }];
      }

      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });

    setWarning(newWarning);
  };

  const updateQuantity = (id, delta) => {
    let newWarning = "";

    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) {
          return item;
        }

        if (isSubscription(item) && item.quantity + delta > 1) {
          newWarning = MESSAGES.SUBSCRIPTION_LIMIT;
          return item;
        }

        return {
          ...item,
          quantity: Math.max(1, item.quantity + delta),
        };
      })
    );

    setWarning(newWarning);
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setWarning("");
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        totalPrice,
        warning,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
