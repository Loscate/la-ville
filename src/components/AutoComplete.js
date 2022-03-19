import "./AutoComplete.css";
import { ReactComponent as Check } from './check.svg';
import { useRef, useState } from "react";
import { cities } from '../cities_fr'

function AutoComplete({ onValidate }) {
  const [inputValue, setInputValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const onChange = (text) => {
    setInputValue(text);
  };
  const input = useRef();
  const onBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsFocus(false);
    }
  }
  const clickCity = (cityName) => {
    input.current.focus()
    setIsFocus(true);
    setInputValue(cityName);
  }
  const getCities = () => {
    const filteredCities = cities.filter(city => city.city.toLowerCase().startsWith(inputValue.toLowerCase()))
    filteredCities.sort((a, b) => a.city > b.city);
    return filteredCities.map((city, i) => <li className="AutoComplete__dropdown_item" key={i} onClick={() => clickCity(city.city)}>{city.city}</li>).slice(0, 100)
  }
  const validate = () => {
    onValidate(inputValue)
    setInputValue('')
    setIsFocus(false);
  }
  const onKeyPress = (key) => {
    if (key === "Enter") {
      validate()
    }
  }
  return (
    <div
      className="AutoComplete"
      tabIndex='0'
      onFocus={() => setIsFocus(true)}
      onBlur={(event) => onBlur(event)}
    >
      <input
        className="AutoComplete__input"
        type="text"
        value={inputValue}
        ref={input}
        onChange={(event) => onChange(event.target.value)}
        onKeyPress={event => onKeyPress(event.key)}
      />
      <div className="AutoComplete__button" onClick={() => validate()}><Check /></div>
      {isFocus &&
        <div className="AutoComplete__dropdown">
          <ul className="AutoComplete__dropdown_list">
            {getCities()}
          </ul>
        </div>
      }
    </div>
  );
}

export default AutoComplete;
