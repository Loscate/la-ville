import "./App.css";
import Header from "./components/Header";
import { cities, citiesToGuess } from "./cities_fr";
import { useEffect, useState } from "react";
import Game from "./components/Game";

export const cityOfTheDay = (() => {
  const today = Date.now();
  const startDate = new Date("01/01/1980").valueOf();
  const nbDayBetween = Math.round((today - startDate) / (1000 * 60 * 60 * 24));
  return citiesToGuess[nbDayBetween % citiesToGuess.length];
})();

function App() {
  useEffect(() => {});
  console.log(cityOfTheDay);
  return (
    <div className="App">
      <Header />
      <Game />
    </div>
  );
}

export default App;
