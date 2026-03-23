import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeItem, totalPrice } = useContext(CartContext);

  return (
    <div className="stream-cart">
      <h2>Your Stream Selection</h2>
      {cartItems.map(item => (
        <div key={item.id} className="cart-card">
          <h4>{item.name}</h4>
          <div className="controls">
            <button onClick={() => updateQuantity(item.id, -1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
          </div>
          <p>${(item.price * item.quantity).toFixed(2)}</p>
          <button className="delete-btn" onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <div className="cart-footer">
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Cart;
