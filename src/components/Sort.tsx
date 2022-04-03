import "../css/Sort.css";

const Sort = ({ handleSort }: any) => {
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
