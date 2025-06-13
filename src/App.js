import React, { useState } from "react";
import "./App.css";

const candidates = [
  "Cape May Beach",
  "Point Pleasant Beach",
  "Ocean City Beach",
  "Asbury Park Beach",
  "Wildwood Beach"
];
const ranks = ["1st", "2nd", "3rd", "4th", "5th"];

function App() {
  const [votes, setVotes] = useState({});
  const [submittedOrder, setSubmittedOrder] = useState(null);

  const handleChange = (candidate, rank) => {
    setVotes((prev) => {
      const updated = { ...prev };
      // Remove the previous candidate that had this rank
      for (let key in updated) {
        if (updated[key] === rank) updated[key] = null;
      }
      updated[candidate] = rank;
      return updated;
    });
  };

  const handleSubmit = () => {
    const rankedChoices = Object.entries(votes)
      .filter(([_, rank]) => rank !== null && rank !== undefined)
      .sort((a, b) => ranks.indexOf(a[1]) - ranks.indexOf(b[1]))
      .map(([candidate]) => candidate);

    if (rankedChoices.length < ranks.length) {
      setSubmittedOrder({ error: "Please rank all 5 beaches before submitting." });
      return;
    }

    setSubmittedOrder({ order: rankedChoices });
  };

  return (
    <div className="ballot-container">
      <h1>Ranked Choice Voting Demo</h1>
      <p>
        Ranked Choice Voting (RCV) lets you rank candidates in order of preference. Instead of selecting just one, you can rank all options — from your top choice (1st) to your last (5th). This example uses popular New Jersey beaches as candidates to demonstrate how RCV works.
      </p>
      <p>
        Please rank each beach by selecting your preferred choice for each position. Each beach must have a unique rank, and you must rank all five options before submitting.
      </p>

      <table>
        <thead>
          <tr>
            <th>Beach Options</th>
            {ranks.map((rank) => (
              <th key={rank}>{rank}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate}>
              <td><strong>{candidate}</strong></td>
              {ranks.map((rank) => (
                <td key={rank}>
                  <input
                    type="radio"
                    name={candidate}
                    checked={votes[candidate] === rank}
                    onChange={() => handleChange(candidate, rank)}
                    aria-label={`${candidate} ranked ${rank}`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button className="submit-button" onClick={handleSubmit}>
        Submit Your Ballot
      </button>

      {submittedOrder && (
        <div className={`result-box ${submittedOrder.error ? "error" : "success"}`} role="alert">
          {submittedOrder.error ? (
            <p><strong>Error:</strong> {submittedOrder.error}</p>
          ) : (
            <>
              <h3>Your Ranked Choices</h3>
              <p>Thank you for participating in this RCV demonstration. Your ranking is:</p>
              <ol>
                {submittedOrder.order.map((beach, idx) => (
                  <li key={idx}>{beach}</li>
                ))}
              </ol>
              <p>
                To learn more about Ranked Choice Voting and how it works in New Jersey, visit&nbsp;
                <a href="https://www.voterchoicenj.org/" target="_blank" rel="noopener noreferrer">
                  Voter Choice NJ
                </a>.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;