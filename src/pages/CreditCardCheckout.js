import { useContext, useState } from "react";
import { CartContext } from "../CartContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { formatPrice } from "../utils/formatPrice";
import {
  formatCardNumber,
  isValidCardNumber,
  formatExpiry,
  maskCardNumber,
} from "../utils/CreditCardUtils";
import "./CreditCardCheckout.css";

const emptyForm = {
  cardholderName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

function CreditCardCheckout() {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const [savedCards, setSavedCards] = useLocalStorage("savedCards", []);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    let nextValue = value;

    if (name === "cardNumber") {
      nextValue = formatCardNumber(value);
    }

    if (name === "expiry") {
      nextValue = formatExpiry(value);
    }

    if (name === "cvv") {
      nextValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }));
  };

  const validateForm = () => {
    if (!formData.cardholderName.trim()) {
      return "Enter the cardholder name.";
    }

    if (!isValidCardNumber(formData.cardNumber)) {
      return "Card number must use the format 1234 5678 9012 3456.";
    }

    if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) {
      return "Expiry must use MM/YY.";
    }

    if (!/^\d{3,4}$/.test(formData.cvv)) {
      return "CVV must be 3 or 4 digits.";
    }

    return "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationMessage = validateForm();

    if (validationMessage) {
      setMessage(validationMessage);
      return;
    }

    const cardRecord = {
      id: editingId ?? Date.now(),
      ...formData,
    };

    if (editingId) {
      setSavedCards((prev) =>
        prev.map((card) => (card.id === editingId ? cardRecord : card))
      );
      setMessage("Card updated and saved to localStorage.");
    } else {
      setSavedCards((prev) => [...prev, cardRecord]);
      setMessage("Card saved to localStorage.");
    }

    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleEdit = (card) => {
    setFormData({
      cardholderName: card.cardholderName,
      cardNumber: card.cardNumber,
      expiry: card.expiry,
      cvv: card.cvv,
    });
    setEditingId(card.id);
    setMessage("");
  };

  const handleDelete = (id) => {
    setSavedCards((prev) => prev.filter((card) => card.id !== id));

    if (editingId === id) {
      setEditingId(null);
      setFormData(emptyForm);
    }

    setMessage("Card removed.");
  };

  const handleDemoCheckout = () => {
    if (cartItems.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }

    if (savedCards.length === 0) {
      setMessage("Save a card before completing checkout.");
      return;
    }

    clearCart();
    setMessage("Demo checkout complete. Your cart has been cleared.");
  };

  return (
    <main className="checkout-page">
      <section className="checkout-summary">
        <h1>Credit Card Checkout</h1>
        <p>Save a card for this demo and complete the EZTechMovie checkout flow.</p>
        <p>
          <strong>Items in cart:</strong> {cartItems.length}
        </p>
        <p>
          <strong>Total:</strong> ${formatPrice(totalPrice)}
        </p>
      </section>

      <section className="checkout-form-card">
        <h2>{editingId ? "Edit Card" : "Add Card"}</h2>

        <form onSubmit={handleSubmit} className="checkout-form">
          <label>
            Name on Card
            <input
              type="text"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleChange}
              placeholder="Daniel Giddings"
            />
          </label>

          <label>
            Card Number
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
          </label>

          <label>
            Expiration Date
            <input
              type="text"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              placeholder="MM/YY"
              maxLength={5}
            />
          </label>

          <label>
            CVV
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="123"
              maxLength={4}
            />
          </label>

          <div className="checkout-actions">
            <button type="submit">
              {editingId ? "Update Card" : "Save Card"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setFormData(emptyForm);
                  setMessage("");
                }}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        {message && <p className="checkout-message">{message}</p>}
      </section>

      <section className="saved-cards-section">
        <h2>Saved Cards</h2>

        {savedCards.length === 0 ? (
          <p>No saved cards yet.</p>
        ) : (
          savedCards.map((card) => (
            <article key={card.id} className="saved-card">
              <p><strong>{card.cardholderName}</strong></p>
              <p>{maskCardNumber(card.cardNumber)}</p>
              <p>Expires {card.expiry}</p>

              <div className="saved-card-actions">
                <button type="button" onClick={() => handleEdit(card)}>
                  Edit
                </button>
                <button type="button" onClick={() => handleDelete(card.id)}>
                  Delete
                </button>
              </div>
            </article>
          ))
        )}

        <button
          type="button"
          className="complete-checkout-btn"
          onClick={handleDemoCheckout}
        >
          Complete Demo Checkout
        </button>
      </section>
    </main>
  );
}

export default CreditCardCheckout;