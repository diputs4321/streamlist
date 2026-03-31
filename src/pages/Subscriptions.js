import { useContext } from "react";
import list from "../data";
import { CartContext } from "../CartContext";
import { formatPrice } from "../utils/formatPrice";

function Subscriptions() {
  const { addToCart, warning } = useContext(CartContext);

  return (
    <main className="movies-page">
      <h1>Services</h1>
      <p>
        Choose one subscription service, and add EZTech accessories as many
        times as you want.
      </p>

      {warning && <p className="warning-label">{warning}</p>}

      <div className="movies-grid">
        {list.map((item) => (
          <article key={item.id} className="movie-card">
            <img src={item.img} alt={item.service} />
            <p><strong>{item.service}</strong></p>
            <p>{item.serviceInfo}</p>
            <p>${formatPrice(item.price)}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Subscriptions;