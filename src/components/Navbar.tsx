import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { useProductsQuery } from "../features/product/productsApi";
import Filter from "./Filter";

const Navbar = () => {
  const { data, isLoading, isSuccess } = useProductsQuery();
  const [querry, SetQuerry] = useState("");
  const [state, setState] = useState<string[]>([]);
  const [sorted, setSorted] = useState("");

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
    });
  // .sort((a: any, b: any) => {
  //   if (sorted === "") {
  //     return true;
  //   } else if (sorted === "Highest price") {
  //     return a.price > b.price ? -1 : 1;
  //   } else if (sorted === "Lowest price") {
  //     return b.price > a.price ? -1 : 1;
  //   }
  //   return true;
  // });

  //! Sort
  const handleSort = (e: any) => {
    setSorted(e.target.value);
  };
  const handleChange = (e: any) => {
    console.log(e.target.value);
    if (state.includes(e.target.value)) {
      setState(state.filter((x) => x !== e.target.value));
    } else {
      setState([...state, e.target.value]);
    }
  };
  return (
    <nav className="nav-bar">
      <Link to="/">
        <h2>Shopping Online Market </h2>
      </Link>

      <Filter handleChange={handleChange} />
      <Link to="/cart">
        <div className="nav-basket">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-cart4"
            viewBox="0 0 16 16"
          >
            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
          </svg>
          <span className="shop-quantity">
            <span>5</span>
          </span>
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
