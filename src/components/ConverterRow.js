import React from "react";

export default function ConverterRow(props) {
  //destructer the props  into objects
  const {
    currencyOption,
    selectedCurrency,
    onChangeCurrency,
    amount,
    handleInput,
  } = props;
  return (
    <div>
      <input
        type="number"
        className="input"
        value={amount}
        onChange={handleInput}
      />
      {/*pass the onChangeCurrency to the App.js*/}
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {/*once we got the currencyOptions from the props we are apssing it into this loop.
        tranlstes the options to the interface*/}
        {currencyOption.map((currency) => (
          <option key={currency.id} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}
