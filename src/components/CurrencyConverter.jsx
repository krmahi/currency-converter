// frankfurter: https://www.frankfurter.app/docs/

import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";

const CurrencyConverter = () => {
  const [currencies, setcurrencies] = useState([]);
  const [amount, setamount] = useState(1);
  const [fromCurrency, setfromCurrency] = useState("USD");
  const [toCurrency, settoCurrency] = useState("INR");
  const [convertedAmount, setconvertedAmount] = useState(null);
  const [converting, setconverting] = useState(false);
  const [favorites, setfavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  // currencies ->  https://api.frankfurter.app/currencies

  const fetchCurrencies = async () => {
    try {
      const response = await fetch("https://api.frankfurter.app/currencies");
      const data = await response.json();
      setcurrencies(Object.keys(data));
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  useEffect(() => {
    fetchCurrencies();
  }, []);

  // currencies ->  https://api.frankfurter.app/latest?amount1&from=USD&to=INR
  const convertCurrency = async () => {
    if (!amount) return;
    setconverting(true);
    try {
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await response.json();
      setconvertedAmount(data.rates[toCurrency] + " " + toCurrency);
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setconverting(false);
    }
  };
  const handleFavorite = (currency) => {
    let updatedFavorites = [...favorites];
    if (favorites.includes(currency)) {
      updatedFavorites = updatedFavorites.filter((curr) => curr !== currency);
    } else updatedFavorites.push(currency);
    setfavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const swapCurrencies = () => {
    setfromCurrency(toCurrency);
    settoCurrency(fromCurrency);
  };
  return (
    <div className="max-w-xl mx-auto my-10 p-5 dark:bg-[#262626] rounded-lg shadow-lg">
      <h2 className="mb-8 text-2xl font-semibold dark:text-[#B4B4B4]">
        Currency Converter
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end dark:text-[#B4B4B4]">
        <Dropdown
          favorites={favorites}
          currencies={currencies}
          title="From: "
          currency={fromCurrency}
          setCurrency={setfromCurrency}
          handleFavorite={handleFavorite}
        />
        {/* swap button */}
        <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={swapCurrencies}
            className="p-2 dark:bg-[#343434] rounded-full cursor-pointer dark:hover:bg-[#3d3d3d]"
          >
            <HiArrowsRightLeft />
          </button>
        </div>
        <Dropdown
          favorites={favorites}
          currencies={currencies}
          title="to: "
          currency={toCurrency}
          setCurrency={settoCurrency}
          handleFavorite={handleFavorite}
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium dark:text-[#B4B4B4]"
        >
          Amount:
        </label>
        <input
          value={amount}
          id="amount"
          onChange={(e) => setamount(e.target.value)}
          type="number"
          className="w-full p-2 dark:bg-[#262626] dark:text-[#B4B4B4] border dark:border-[#959595] rounded-lg shadow-sm focus:outline-none focus:ring-2 dark:focus:ring-[#659CA3] mt-1"
        />
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={convertCurrency}
          className={`px-5 py-2 bg-[#659CA3] text-white rounded-lg hover:bg-[#4d777c] focus:outline-none  ${
            converting ? "animate-pulse" : ""
          }`}
        >
          Convert
        </button>
      </div>
      {convertedAmount && (
        <div className="mt-4 text-lg font-medium text-right text-[#659CA3]">
          Converted Amount: {convertedAmount}
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
