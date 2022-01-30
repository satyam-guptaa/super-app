import React from 'react';
import jean from './img/jeans.png';
import shoes from './img/shoes.png';
import tshirt from './img/tshirt.png';

const Product = ({ item, handleClickCart }) => {
  const selectImg = (item) => {
    let image = '';
    if (item.category === 'Upperwear') return (image = tshirt);
    if (item.category === 'Bottomwear') return (image = jean);
    if (item.category === 'Shoes') return (image = shoes);
    return image;
  };
  return (
    <div className="product-layout">
      <img id="product-image" src={selectImg(item)} alt="" />
      <p id="item-name">{item.name}</p>
      <div className="product-details">
        <p id="item-price">{item.price} ₹</p>
        <button className="cart-button" onClick={() => handleClickCart(item)}>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
