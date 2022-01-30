import React, { useState } from 'react';
import '../register_login/register.css';
import RegInputs from './registerInputs';
import Joi from 'joi-browser';
import { validate, validateInputField } from '../register_login/validation';
import axios from 'axios';

const Register = (props) => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState({});

  const schema = {
    name: Joi.string().required().label('Name'),
    email: Joi.string().required().label('Email'),
    password: Joi.string().required().label('Password'),
  };

  const errors = validate(user, schema);
  const urlEndpoint = process.env.REACT_APP_REST_URL + '/users';

  const handleSubmit = (e) => {
    e.preventDefault();
    //not updating state with a null hence returning
    if (errors) return setError(errors);
    //Not submitting or not calling the server
    async function registeringUser() {
      try {
        const { data } = await axios.post(urlEndpoint, user);
        localStorage.setItem('token', data.token);
        window.location = '/';
      } catch (error) {
        const errors = { ...error };
        errors.email = error.response.data;
        setError(errors);
      }
    }
    registeringUser();
  };

  const handleChange = ({ target }) => {
    const errors = { ...error };
    const errorMessage = validateInputField(target.name, target.value, schema);
    //  if no eror then delete the ppt
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
        <h1 style={{ marginBottom: '15px' }}>Register</h1>
        <RegInputs
          name="name"
          label="Name"
          type="text"
          onChange={handleChange}
          value={user.name}
          error={error.name}
        />
        <RegInputs
          name="email"
          label="Email"
          type="email"
          onChange={handleChange}
          value={user.email}
          error={error.email}
        />
        <RegInputs
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
          value={user.password}
          error={error.password}
        />
        <button type="submit" disabled={errors} className="register-login-btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
