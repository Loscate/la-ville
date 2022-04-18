import { useState } from "react";
import AutoComplete from "./AutoComplete";
import { distanceLatLong } from "../utils";
import "./Game.css"
import { cityOfTheDay } from "../App";
import { cities } from "../cities_fr";
import { isEqual } from "lodash";
import Modal from "./Modal";
import Map from './Map';

function getCityFromName(cityName) {
  return cities.find(city => city.city.toLowerCase() === cityName.toLowerCase());
}

function getStyleProgressBar(dist) {
  const distMax = 1100;
  const color = (() => {
    if (dist > distMax * 0.75) return 'gray'
    if (dist > distMax * 0.5) return 'red'
    if (dist > distMax * 0.25) return 'orangered'
    if (dist > 0) return 'orange'
    return 'green';
  })()
  const width = `${100 - (dist / distMax * 100)}%`;
  return ({
    backgroundColor: color,
    width: width,
  })
}

function Game() {
  const alreadyGuessed = localStorage.getItem('LaVille_guessToday');
  const [citiesGuessed, setCitiesGuessed] = useState(alreadyGuessed && alreadyGuessed !== 'null' ? JSON.parse(alreadyGuessed) : []);
  const [isWin, setIsWin] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(localStorage.getItem('LaVille_isWin') === 'true');
  const [isOpenModalRules, setIsOpenModalRules] = useState(!isOpenModal);
  const addCity = (city) => {
    if (citiesGuessed.length < 6 && cities.includes(city)) {
      localStorage.setItem('LaVille_guessToday', JSON.stringify([...citiesGuessed, city]));
      setCitiesGuessed(ar => [...ar, city]);
      if (isEqual(city, cityOfTheDay)) {
        localStorage.setItem('LaVille_isWin', true);
        localStorage.setItem('LaVille_lastConn', new Date().valueOf())
        setIsWin(true);
        setIsOpenModal(true);
      }
    }
  }
  const getSquaresEmote = (dist) => {
    const distMax = 1100;
    if (dist > distMax * 0.75) return '⬛◾◾◾◾◾◾◾'
    if (dist > distMax * 0.5) return '🟥🟥🟥◾◾◾◾◾'
    if (dist > distMax * 0.25) return '🟧🟧🟧🟧🟧◾◾◾'
    if (dist > 0) return '🟨🟨🟨🟨🟨🟨◾◾'
    return '🟩🟩🟩🟩🟩🟩🟩🟩'
  }
  const getResumeHTML = () => {
    return (
      <pre>
        La Ville du {(new Date()).toLocaleDateString()} - {citiesGuessed.length} / 6 :<br /><br />
        {citiesGuessed.map((city, i) => <div key={i}>{getSquaresEmote(distanceLatLong(city.lat, cityOfTheDay.lat, city.lng, cityOfTheDay.lng))}</div>)}<br />
        <a href={window.location.href} style={{ color: 'white'}}>{ window.location.href }</a>
      </pre>
    )
  }
  const share = () => {
    const range = document.createRange();
    const resumeDiv = document.querySelector('.Game__resume');
    range.selectNode(resumeDiv);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy')
  }
  const citiesEl = citiesGuessed.map((city, i) => <div className="Game__answer" key={i}><div className='Game__answer_progress' style={getStyleProgressBar(distanceLatLong(city.lat, cityOfTheDay.lat, city.lng, cityOfTheDay.lng))}></div><span>{ i + 1 }.</span><span>{city.city} - { distanceLatLong(city.lat, cityOfTheDay.lat, city.lng, cityOfTheDay.lng) }km</span></div>)
  return (
    <div className="Game">
      <AutoComplete disabled={isWin} onValidate={cityName => addCity(getCityFromName(cityName))} />
      <div className="Game__answers">
        {citiesEl}
        {(new Array(6 - citiesGuessed.length)).fill(0).map((a, i) => <div key={i} className="Game__answer_none"><span>{ citiesGuessed.length + 1 + i }.</span></div>)}
      </div>
      <Map cities={citiesGuessed} />
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} title='Bravo !'>
        <div className='Game__modal_win'>
          <h2>Bravo, tu as trouvé la ville du jour : "{cityOfTheDay.city}" !</h2>
          <h3>Résumé (<span className='Game__share' onClick={() => share()}>Partager</span>) : </h3>
          <div className="Game__resume">
            {getResumeHTML()}
          </div>
        </div>
      </Modal>
      <Modal isOpen={isOpenModalRules} onClose={() => setIsOpenModalRules(false)} title="Règles">
        <div className='Game__modal_win'>
          <h2>Les règles du jeu :</h2>
          <p>
            Vous avez 6 essais pour découvrir la ville du jour. <br/>
            Vous pouvez essayer des villes/villages de plus de 1000 habitants. <br/>
            Lorsque vous saisissez le nom d'une ville, l'outil vous permettra d'autocompléter le nom. <br/>
            S'il n'apparaît pas, c'est soit que vous l'aviez mal orthographié ou bien qu'il a moins de 1000 habitants (ou bien même qu'il n'existe pas :/).<br />
            Après chaque tentative, vous saurez à quelle distance se trouve la ville que vous aviez saisi par rapport à la ville à trouver !<br /><br />
            Si vous rencontrez un problème ou que vous avez des recommandations, veuillez me contacter sur Discord : Loscate#6984.<br/>
            Jeu inspiré de <a rel="noreferrer" target='_blank' href='https://www.nytimes.com/games/wordle/index.html'>Wordle</a>.
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default Game;
