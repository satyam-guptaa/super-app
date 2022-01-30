import React from 'react';
import '../cart/cart.css';

const Cart = ({
  itemsInCart,
  handleIncrement,
  handleDecrement,
  handleRemoveBtn,
}) => {
  const totalArr = itemsInCart.map((item) => item.price * item.count);
  const netAmount =
    itemsInCart.length > 0 ? totalArr.reduce((a, b) => a + b) : 0;

  return (
    <div className="cart-body">
      <h2 className="headingLine">Your Shopping Bag</h2>
      <div className="cart-container">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th style={{ width: '200px' }}>Total (₹)</th>
              <th></th>
            </tr>
          </thead>
          {itemsInCart.map((item) => {
            return (
              <tbody key={item._id}>
                <tr>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      onClick={() => handleIncrement(item)}
                      className="add-remove-btn"
                      disabled={item.count === 5}
                    >
                      +
                    </button>
                    {item.count}
                    <button
                      onClick={() => handleDecrement(item)}
                      className="add-remove-btn"
                      disabled={item.count <= 1 ? true : false}
                    >
                      -
                    </button>
                  </td>
                  <td>{item.price * item.count}</td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveBtn(item)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
      <div className="buy-container">
        <p>
          Net Amount {'   '} <span>{netAmount} ₹</span>
        </p>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
