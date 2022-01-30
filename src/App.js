import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Switch } from 'react-router';
import Navbar from './components/navbar/navbar';
import ProductMain from './components/product/ProductMain';
import Login from './components/register_login/login';
import Cart from './components/cart/cart';
import Home from './components/homepage/home';
import Register from './components/register_login/register';
import jwt from 'jsonwebtoken';
import Logout from './components/register_login/logout';

toast.configure();

function App() {
  const [products, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [itemsInCart, setItemsInCart] = useState([]);
  const [user, setUser] = useState();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const user = jwt.decode(token);
    const url = process.env.REACT_APP_REST_URL;
    setUser(user);

    async function getData() {
      const productsData = await axios.get(url + '/products');
      const categoryData = await axios.get(url + '/category');
      if (user) {
        const cartData = await axios.get(url + '/cart', {
          headers: {
            auth: token,
          },
        });
        setItemsInCart(cartData.data);
      }
      const modifiedResponse = productsData.data.map((item) => ({
        ...item,
        count: 1,
      }));

      setProduct(modifiedResponse);
      setFilteredProducts(modifiedResponse);
      setCategory(categoryData.data.sort().reverse());
    }
    getData();
  }, []);

  // const idArr = itemsInCart.map((item) => item._id);
  const handleClickCart = (item) => {
    //Grabbing the uniqueItems from the itemsInCart array
    // const idArr = itemsInCart.map((item) => item._id);
    // console.log(item);
    // if (idArr.includes(item._id))
    //   return toast.warn('Item already in cart', {
    //     position: toast.POSITION.TOP_CENTER,
    //     autoClose: 2000,
    //   });
    const sentItem = { ...item };
    delete sentItem._id;
    const postItemInCart = async (item) => {
      try {
        const { data } = await axios.post(
          process.env.REACT_APP_REST_URL + '/cartItem',
          sentItem,
          {
            headers: {
              auth: token,
            },
          }
        );
        setItemsInCart((prevState) => [...prevState, data]);
        toast.success('Item Added', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      } catch (error) {
        toast.error('Please Login/Register', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    };
    postItemInCart(item);
  };

  const handleFilter = (category) => {
    if (category === 'All') return setFilteredProducts(products);
    const newArr = [...products];
    const filtered = newArr.filter((item) => item.category === category);
    setFilteredProducts(filtered);
  };

  const handleIncrement = async (item) => {
    const { data } = await axios.patch(
      process.env.REACT_APP_REST_URL + '/cart/' + item._id,
      {
        count: item.count + 1,
      }
    );
    const newItemsInCart = [...itemsInCart];
    const i = newItemsInCart.indexOf(item);
    newItemsInCart[i] = data;
    setItemsInCart(newItemsInCart);
  };

  const handleDecrement = async (item) => {
    const { data } = await axios.patch(
      process.env.REACT_APP_REST_URL + '/cart/' + item._id,
      {
        count: item.count - 1,
      }
    );
    const newItemsInCart = [...itemsInCart];
    const i = newItemsInCart.indexOf(item);
    newItemsInCart[i] = data;
    setItemsInCart(newItemsInCart);
  };

  const handleRemoveBtn = async (item) => {
    const { data } = await axios.delete(
      process.env.REACT_APP_REST_URL + '/cart/' + item._id,
      {
        data: { buyer: user._id },
      }
    );
    setItemsInCart(data);
    toast.error('Item Removed', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  return (
    <>
      <Navbar itemsInCart={itemsInCart} user={user} />
      <div>
        <Switch>
          <Route
            path="/products"
            render={(props) => (
              <ProductMain
                products={filteredProducts}
                itemsInCart={itemsInCart}
                handleClickCart={handleClickCart}
                handleFilter={handleFilter}
                category={category}
                {...props}
              />
            )}
          ></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route
            path="/cart"
            render={(props) => (
              <Cart
                itemsInCart={itemsInCart}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                handleRemoveBtn={handleRemoveBtn}
                {...props}
              />
            )}
          ></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/" component={Home} exact></Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
