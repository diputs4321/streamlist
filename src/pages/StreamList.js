import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

function StreamList() {
  const [userInput, setUserInput] = useState("");
  const [items, setItems] = useLocalStorage("streamlistItems", []);

  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!userInput.trim()) return;

    const newItem = {
      id: Date.now(),
      title: userInput,
      completed: false,
    };

    setItems([...items, newItem]);
    setUserInput("");
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleComplete = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleEdit = (id, title) => {
    setEditId(id);
    setEditText(title);
  };

  const handleSaveEdit = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, title: editText } : item
      )
    );
    setEditId(null);
    setEditText("");
  };

  return (
    <main className="streamlist-page">
      <section className="hero-section">
        <h1>Welcome to StreamList</h1>
        <p>
          Add movies or watch events, manage your list, and keep your saved items
          even after refreshing the page.
        </p>
      </section>

      <section className="search-section">
        <h2>Add to Your StreamList</h2>
        <form onSubmit={handleSubmit} className="movie-form">
          <input
            type="text"
            placeholder="Enter a movie or event"
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </section>

      <section className="events-section">
        <h2>Your Saved List</h2>

        {items.length === 0 ? (
          <p>No items added yet.</p>
        ) : (
          <div className="events-grid">
            {items.map((item) => (
              <article key={item.id} className="event-card">
                {editId === item.id ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={() => handleSaveEdit(item.id)}>Save</button>
                  </>
                ) : (
                  <>
                    <h3
                      style={{
                        textDecoration: item.completed ? "line-through" : "none",
                      }}
                    >
                      {item.title}
                    </h3>

                    <button onClick={() => handleComplete(item.id)}>
                      {item.completed ? "Undo" : "Complete"}
                    </button>

                    <button onClick={() => handleEdit(item.id, item.title)}>
                      Edit
                    </button>

                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default StreamList;