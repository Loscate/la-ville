import "./App.css";
import Header from "./components/Header";
import { citiesToGuess } from "./cities_fr";
import { useEffect } from "react";
import Game from "./components/Game";

export const cityOfTheDay = (() => {
  const today = new Date();
  const date_to_reply = new Date('2012-10-11');
  const timeinmilisec = today.getTime() - date_to_reply.getTime();
  const nbDayBetween = Math.ceil((timeinmilisec) / (1000 * 60 * 60 * 24));
  console.log(nbDayBetween)
  return citiesToGuess[nbDayBetween % citiesToGuess.length];
})();
console.log(cityOfTheDay)

function App() {
  useEffect(() => {});
  return (
    <div className="App">
      <Header />
      <Game />
    </div>
  );
}

export default App;
