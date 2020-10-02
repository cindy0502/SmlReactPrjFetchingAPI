import React, { useState, useEffect } from "react";
import axios from "axios";

//for optimization check : http://bytesizematters.com/
function SearchCountry() {
  //current iteration of the state
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});

  useEffect(() => {
    const getCountry = async () => {
      await axios
        .get("https://restcountries.eu/rest/v2/all?fields=name")
        .then((response) => {
          // console.log("Response", response);
          setCountries(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getCountry();
  }, []);

  const selectCountry = async (event) => {
    let name = event.target.value;

    await axios
      .get(
        `https://restcountries.eu/rest/v2/name/${name}?fields=name;capital;population;currencies`
      )
      .then((response) => {
        console.log("Response", response);
        setSelectedCountry(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="country-container">
      <select className="country-selector" onChange={selectCountry}>
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.id}>{country.name}</option>
        ))}
      </select>
      <div>
        <div className="country-info">
          <p>
            <strong>Capital City:</strong>
            <span className="country">{selectedCountry?.capital}</span>
          </p>
          <p>
            <strong>Population:</strong>
            <span className="country">{selectedCountry?.population}</span>
          </p>
          <p>
            <strong>Currency:</strong>
            <span className="country">
              {selectedCountry?.currencies &&
                selectedCountry?.currencies[0]?.code +
                  "  " +
                  selectedCountry?.currencies[0]?.symbol}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SearchCountry;
