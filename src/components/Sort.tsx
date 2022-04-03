import "../css/Sort.css";

// import { useProductsQuery } from "../features/product/productsApi";
const Sort = ({ handleSort }: any) => {
  // const { data } = useProductsQuery();

  // const sortedProduct= ()=>{

  // }

  return (
    <div>
      <div className="list-item">
        <div className="section">
          <button value="Highest price" onClick={handleSort}>
            Highest Price
          </button>
          <button value="Lowest price" onClick={handleSort}>
            Lowest Price
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sort;
