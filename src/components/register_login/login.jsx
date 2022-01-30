import React, { useState } from 'react';
import RegInputs from './registerInputs';
import Joi from 'joi-browser';
import { validate, validateInputField } from '../register_login/validation';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const [error, setError] = useState({});

  const schema = {
    email: Joi.string().required().label('Email'),
    password: Joi.string().required().label('Password'),
  };

  const errors = validate(user, schema);
  const loginUrl = process.env.REACT_APP_REST_URL + '/users/login';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (errors) return setError(errors);
    async function loginUser() {
      try {
        const { data } = await axios.post(loginUrl, user);
        setError({});
        localStorage.setItem('token', data.token);
        toast.success('Logged In', {
          position: 'top-center',
          autoClose: 2000,
        });
        // used window since we want to reload the page on login or reg so that we solve the issue with useeffect only running after reload
        // props.history.push('/');
        window.location = '/';
      } catch (error) {
        const errors = { ...error };
        errors.email = error.response.data;
        setError(errors);
      }
    }
    loginUser();
  };

  const handleChange = ({ target }) => {
    const errors = { ...error };
    const errorMessage = validateInputField(target.name, target.value, schema);
    if (errorMessage) {
      errors[target.name] = errorMessage;
    } else delete errors[target.name];

    const account = { ...user };
    account[target.name] = target.value;
    setUser(account);
    setError(errors);
  };

  return (
    <div className="form-container">
      <form className="register-login-form" onSubmit={handleSubmit}>
        <h1 style={{ marginBottom: '15px' }}>Login</h1>
        <RegInputs
          name="email"
          label="Email"
          type="email"
          value={user.email}
          onChange={handleChange}
          error={error.email}
        />
        <RegInputs
          name="password"
          label="Password"
          type="password"
          value={user.password}
          onChange={handleChange}
          error={error.password}
        />
        <button type="submit" className="register-login-btn" disabled={errors}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
