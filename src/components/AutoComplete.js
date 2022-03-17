import "./AutoComplete.css";
import { useState } from "react";

function AutoComplete() {
  const [inputValue, setInputValue] = useState("");
  const onChange = (text) => {
    console.log(text);
    setInputValue(text);
  };
  return (
    <div className="AutoComplete">
      <input
        className="AutoComplete__input"
        type="text"
        value={inputValue}
        onChange={(event) => onChange(event.target.value)}
      />
      <button className="AutoComplete__button">coucou</button>
    </div>
  );
}

export default AutoComplete;
