import React, { useState } from "react";
import { useProductsQuery } from "../services/products";

const FilterComponent = ({ handleChange }: any) => {
  const { data, isLoading, isSuccess } = useProductsQuery();
  console.log("data", data);

  const filteredCategory = data
    ?.map((item) => item.category)
    .filter((value, index, self) => self.indexOf(value) === index);

  console.log(filteredCategory);

  return (
    <div className="App">
      <h3>Select Toppings</h3>
      {filteredCategory?.map((item, index) => {
        return (
          <div className="toppings-list-item" key={index}>
            <div className="left-section">
              <input
                type="checkbox"
                id={`custom-checkbox-${index}`}
                onChange={handleChange}
                /* name={item}*/
                value={item}
              />
              <label htmlFor={`custom-checkbox-${index}`}>{item}</label>
            </div>
            <div className="right-section"></div>
          </div>
        );
      })}
    </div>
  );
};

export default FilterComponent;
