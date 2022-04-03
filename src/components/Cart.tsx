import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";

import "../css/Cart.css";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../features/product/productSlice";

const Cart = () => {
  const product = useSelector((state: any) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [dispatch, product]);

  const handleRemoveFromCart = (cartItem: any) => {
    dispatch(removeFromCart(cartItem));
  };
  const handleDecreaseCart = (cartItem: any) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleIncreaseCart = (cartItem: any) => {
    dispatch(addToCart(cartItem));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {product.cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Cart is empty</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles grid">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {product.cartItems?.map((cartItem: any) => (
              <div className="cart-item grid" key={cartItem.id}>
                <div className="cart-product">
                  <img
                    className="image"
                    src={cartItem.image}
                    alt={cartItem.title}
                  />
                  <div>
                    <h3>{cartItem.title}</h3>
                    <p>{cartItem.description}</p>
                    <button onClick={() => handleRemoveFromCart(cartItem)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-product-price">{cartItem.price}$</div>
                <div className="cart-product-quantity">
                  <button onClick={() => handleDecreaseCart(cartItem)}>
                    -
                  </button>
                  <div className="count">{cartItem.cartQuantity}</div>
                  <button onClick={() => handleIncreaseCart(cartItem)}>
                    +
                  </button>
                </div>
                <div className="cart-product-total-price">
                  {cartItem.price * cartItem.cartQuantity}$
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button className="clear-cart" onClick={() => handleClearCart()}>
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">
                  {product.cartTotalAmount.toFixed(2)}$
                </span>
              </div>
              <p>Includes taxes</p>
              <button>Checkout</button>
              <div className="continue-shopping">
                <Link to="/">
                  <span>Continue Shopping</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    className="bi bi-arrow-return-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
