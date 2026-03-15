import { useState } from "react";

function StreamList() {
  const [userInput, setUserInput] = useState("");

  const events = [
    {
      id: 1,
      icon: "event",
      title: "Friday Watch Party",
      date: "March 15, 2026",
      description: "Join your group to watch a featured action movie together.",
    },
    {
      id: 2,
      icon: "playlist_add_check",
      title: "Group List Updated",
      date: "March 17, 2026",
      description: "Melissa added 3 new comedy films to the shared StreamList.",
    },
    {
      id: 3,
      icon: "credit_card",
      title: "Subscription Reminder",
      date: "March 20, 2026",
      description: "Review your subscription plan and payment settings.",
    },
    {
      id: 4,
      icon: "movie",
      title: "New Release Alert",
      date: "March 22, 2026",
      description: "A newly added movie is now available to stream in the app.",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("User input:", userInput);
    alert(`You searched for: ${userInput}`);
    setUserInput("");
  };

  return (
    <main className="streamlist-page">
      <section className="hero-section">
        <h1>Welcome to StreamList</h1>
        <p>
          Search for movies, track shared activity, and stay updated on events
          from EZTechMovie.
        </p>
      </section>

      <section className="search-section">
        <h2>Find a Movie</h2>
        <form onSubmit={handleSubmit} className="movie-form">
          <input
            type="text"
            placeholder="Enter a movie title"
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
          />
          <button type="submit">
            <span className="material-symbols-outlined">search</span>
            Search
          </button>
        </form>
      </section>

      <section className="events-section">
        <h2>Upcoming User Events</h2>
        <div className="events-grid">
          {events.map((eventItem) => (
            <article key={eventItem.id} className="event-card">
              <div className="event-icon">
                <span className="material-symbols-outlined">
                  {eventItem.icon}
                </span>
              </div>

              <div className="event-content">
                <h3>{eventItem.title}</h3>
                <p className="event-date">{eventItem.date}</p>
                <p>{eventItem.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default StreamList;
