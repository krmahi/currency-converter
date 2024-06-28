import React from "react";
import { HiOutlineStar, HiStar } from "react-icons/hi2";

const currencyDropdown = ({
  currencies,
  currency,
  setCurrency,
  favorites,
  handleFavorite,
  title = "",
}) => {
  const isFavorite = (curr) => favorites.includes(curr);
  return (
    <div>
      <label
        htmlFor={title}
        className="block text-sm font-medium dark:text-[#B4B4B4]"
      >
        {title}
      </label>
      <div className="mt-1 relative">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 dark:bg-[#343434] border dark:border-[#959595] rounded-lg shadow-sm focus:outline-none focus:ring-2 dark:focus:ring-[#659CA3] overflow-hidden"
        >
          {favorites.map((currency) => {
            return (
              <option
                className="dark:bg-[#4d4d4d]"
                value={currency}
                key={currency}
              >
                {currency}
              </option>
            );
          })}
          {currencies
            .filter((c) => !favorites.includes(c))
            .map((currency) => {
              return (
                <>
                  <option value={currency} key={currency}>
                    {currency}
                  </option>
                </>
              );
            })}
        </select>
        <button
          onClick={() => handleFavorite(currency)}
          className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5"
        >
          {isFavorite(currency) ? (
            <HiStar color="#DCBF00" />
          ) : (
            <HiOutlineStar />
          )}
        </button>
      </div>
    </div>
  );
};

export default currencyDropdown;
