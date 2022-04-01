import { useState } from "react";
import "./App.css";
import FilterComponent from "./components/filterComponent";
import { useProductsQuery } from "./services/products";

function App() {
  const { data, isLoading, isSuccess } = useProductsQuery();

  const [querry, SetQuerry] = useState("");
  const [state, setState] = useState<string[]>([]);
  console.log("state", state);

  {
    /* Search Input */
  }
  let filteredProduct = data
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

  const handleChange = (e: any) => {
    console.log(e.target.value);
    if (state.includes(e.target.value)) {
      setState(state.filter((x) => x !== e.target.value));
    } else {
      setState([...state, e.target.value]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <input
          type="text"
          style={{ marginTop: "10px", width: "200px" }}
          value={querry}
          onChange={(e) => SetQuerry(e.target.value)}
        />
        <FilterComponent handleChange={handleChange} />
        {isLoading && "Loading..."}
        {filteredProduct?.map((product: any) => (
          <div>
            <span>{product?.title}</span>
            <img src={product.image} alt="image" style={{ width: "100px" }} />
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
