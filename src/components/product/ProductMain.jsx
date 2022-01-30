import React from 'react';
import Product from './product';
import '../product/productMain.css';

const ProductMain = ({
  products,
  handleClickCart,
  buttonText,
  handleFilter,
  category,
  itemsInCart,
}) => {
  return (
    <div id="products-section">
      <aside id="aside">
        {category.map((cat) => {
          return (
            <button
              className="side-button"
              onClick={() => handleFilter(cat.category)}
              key={cat._id}
            >
              {cat.category}
            </button>
          );
        })}
      </aside>
      <main id="main">
        {products.map((item) => {
          return (
            <Product
              item={item}
              itemsInCart={itemsInCart}
              handleClickCart={handleClickCart}
              buttonText={buttonText}
              key={item._id}
            />
          );
        })}
      </main>
    </div>
  );
};

export default ProductMain;
