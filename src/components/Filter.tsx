import "../css/Filter.css";
import { useProductsQuery } from "../features/product/productsApi";

const Filter = ({ handleChange }: any) => {
  const { data } = useProductsQuery();
  console.log("data from filter", data);

  const filteredCategory = data
    ?.map((item) => item.category)
    .filter((value, index, self) => self.indexOf(value) === index);

  console.log("filteredCategory", filteredCategory);

  return (
    <div className="filter">
      {filteredCategory?.map((item, index) => {
        return (
          <div className="list-item" key={index}>
            <div className="filter-section">
              <input
                type="checkbox"
                id={`custom-checkbox-${index}`}
                onChange={handleChange}
                value={item}
              />
              <label htmlFor={`custom-checkbox-${index}`}>
                {item.toUpperCase()}
              </label>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Filter;
