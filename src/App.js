import React, { useEffect, useState } from "react";
import "./App.css";
import ConverterRow from "./components/ConverterRow";
import SearchCountry from "./components/SearchCountry";

const BASE_URL =
  "http://data.fixer.io/api/latest?access_key=3b4c8203789e6790d094394a8c57c55f";

function App() {
  //current iteration of the state
  const [currencyOption, setCurrencyOption] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  //separate variable to know if we change in the from or to currency input
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  // Check the two input boxes and see which one has an input
  //if it's true the the amount we have in the state is from the fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate || 0;
    //else it is from the toAmount
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate || 0;
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())

      .then((data) => {
        //set the currency to the choosen array
        const firstCurrency = Object.keys(data.rates)[128];
        //convert the data to the options in an array first on is base, key portion of the rates and rates
        setCurrencyOption([data.base, ...Object.keys(data.rates)]);
        //set the from currency to base
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
        // console.log(data);
      });
  }, []);

  //call this function when the currencies changes
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}`).then((
        res //?base=${fromCurrency}&symbols=$
        //https://data.fixer.io/api/latest?access_key=3b4c8203789e6790d094394a8c57c55f&base=${fromCurrency}&symbols=${toCurrency}
      ) => res.json().then((data) => setExchangeRate(data.rates[toCurrency])));
    }
  }, [fromCurrency, toCurrency]);

  //${BASE_URL}?base=${fromCurrency}&base=${toCurrency}

  //helps to change the input value
  function handleFromAmountChange(e) {
    setAmount(e.target.value);
    //let it know that we have changed it in the fromAmount
    setAmountInFromCurrency(true);
  }
  function handleToAmountChange(e) {
    setAmount(e.target.value);
    //let it know that we have changed it in the toAmount
    setAmountInFromCurrency(false);
  }

  return (
    <div>
      <div className="container-1">
        <h1>Currency Converter</h1>
        <ConverterRow
          //pass the currency option as a prop
          //to be able to populate them in
          currencyOption={currencyOption}
          selectedCurrency={fromCurrency}
          onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
          handleInput={handleFromAmountChange}
        />
        <div className="equal">=</div>
        <ConverterRow
          currencyOption={currencyOption}
          selectedCurrency={toCurrency}
          onChangeCurrency={(e) => setToCurrency(e.target.value)}
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
          handleInput={handleToAmountChange}
        />
      </div>

      <div className="container-2">
        <h1>Choose and Learn more about the Countries</h1>
        <SearchCountry />
      </div>
    </div>
  );
}
export default App;
