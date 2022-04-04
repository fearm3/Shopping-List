/* eslint-disable*/
import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/hooks";

import { addToCart, Basket, getTotals } from "../features/product/productSlice";
import Filter from "./Filter";
import { useProductsQuery } from "../features/product/productsApi";
import Sort from "./Sort";
import "../css/Home.css";
import { useSelector } from "react-redux";

function Home() {
  const { data, isLoading, isSuccess } = useProductsQuery();

  const [querry, SetQuerry] = useState("");
  const [sorted, setSorted] = useState("");
  const [state, setState] = useState<string[]>([]);
  const [price, setPrice] = useState<Basket | null>(null);
  const product = useSelector((state: any) => state.product);
  const dispatch = useAppDispatch();

  console.log("data", data);
  console.log("isSuccess", isSuccess);

  let filteredProduct = data
    // eslint-disable-next-line array-callback-return
    ?.filter((val: any) => {
      if (querry === "") {
        return true;
      } else if (querry.length === 1) {
        return true;
      } else if (
        querry.length > 1 &&
        val?.title.toLocaleLowerCase().includes(querry.toLowerCase())
      ) {
        return true;
      }
    })
    .filter((x: any) => {
      if (!state.length) {
        return true;
      } else {
        return state.includes(x.category);
      }
    })
    //@ts-ignore
    .sort((a: any, b: any) => {
      if (sorted === "") {
        return true;
      } else if (sorted === "Highest price") {
        return a.price > b.price ? -1 : 1;
      } else if (sorted === "Lowest price") {
        return b.price > a.price ? -1 : 1;
      }
      return true;
    });

  //! Sort
  const handleSort = (e: any) => {
    setSorted(e.target.value);
  };

  //! Filter
  const handleChange = (e: any) => {
    console.log(e.target.value);
    if (state.includes(e.target.value)) {
      setState(state.filter((x) => x !== e.target.value));
    } else {
      setState([...state, e.target.value]);
    }
  };

  const handleAddToCart = (product: any) => {
    // console.log("addToCart worked!!!", product);
    dispatch(addToCart(product));
  };

  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch, product]);

  return (
    <div className="container">
      <div className="search-input">
        <input
          type="text"
          value={querry}
          onChange={(e) => SetQuerry(e.target.value)}
          placeholder="Search..."
        />
      </div>

      <h3>Select Category</h3>
      <Filter handleChange={handleChange} />

      <Sort handleSort={handleSort} />

      {isLoading && "Loading..."}
      <h2>Shopping Center</h2>
      <div className="products">
        {isSuccess &&
          filteredProduct?.map((product: any) => (
            <div className="products">
              <div key={product.id} className="product">
                <h4>{product?.title}</h4>

                <img src={product?.image} alt={product?.title} />
                <div className="details">
                  <span>{product?.description.slice(0, 199)}</span>
                  <br />
                  <span className="price">{product?.price}$</span>
                </div>
                <button onClick={() => handleAddToCart(product)}>
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
