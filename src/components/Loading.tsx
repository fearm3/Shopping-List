import spinner from "../assets/spinner.gif";
import { useProductsQuery } from "../features/product/productsApi";
import "../css/Loading.css";

const Loading = () => {
  const { isLoading } = useProductsQuery();
  return (
    <div className="loading">
      {isLoading && <img src={spinner} alt="spinner" />}
    </div>
  );
};

export default Loading;
