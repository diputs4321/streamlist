import { useContext } from "react";
import { CartContext } from "../CartContext";
import "./Cart.css";

function Cart() {
  const { cartItems, updateQuantity, removeItem, totalPrice, warning } =
    useContext(CartContext);

  return (
    <div className="stream-cart">
      <h2>Your Cart</h2>

      {warning && <p className="warning-label">{warning}</p>}

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-card">
              <div>
                <h4>{item.service}</h4>
                <p>{item.serviceInfo}</p>
                <p>${item.price.toFixed(2)} each</p>
              </div>

              <div className="controls">
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>

              <div>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  className="delete-btn"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-footer">
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;