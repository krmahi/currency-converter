import React from "react";

const currencyDropdown = ({
  currencies,
  currenc,
  setCurrency,
  favorite,
  handleFavorite,
  title = "",
}) => {
  // console.log(currencies);
  return (
    <div>
      <label htmlFor={title}>{title}</label>
      <div>
        <select>
          {currencies?.map((currency) => {
            return (
              <option value={currency} key={currency}>
                {currency}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default currencyDropdown;
