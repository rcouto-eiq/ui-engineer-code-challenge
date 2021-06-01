import { useEffect, useState } from "react";

export default function App() {
  const [advice, setAdvice] = useState("loading...");
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((data) => {
        setAdvice(data.slip.advice);
      })
      .catch((e) => console.error(e));
  });

  function onClick(e) {
    e.preventDefault();

    setAdvice("loading");

    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((data) => {
        setAdvice(data.slip.advice);
      })
      .catch((e) => console.error(e));
  }

  function onSubmit(e) {
    e.preventDefault();

    const term = e.target.term.value;

    fetch("https://api.adviceslip.com/advice/search/" + term)
      .then((response) => response.json())
      .then((data) => {
        setResults(data.slips);
      })
      .catch((e) => console.error(e));
  }

  return (
    <main>
      <h1>Are you looking for advice?</h1>

      <p>"{advice}"</p>

      <form>
        <button onClick={onClick}>Gimme more advice!</button>
      </form>

      <br />

      <form onSubmit={onSubmit}>
        <p>Search for more advice:</p>
        <input type="text" name="term" />
        <button>Search</button>
      </form>

      <ul>
        {results.map((result) => (
          <li>{result.advice}</li>
        ))}
      </ul>
    </main>
  );
}
