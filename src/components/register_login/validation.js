import Joi from 'joi-browser';

const validate = (data, schema) => {
  const { error } = Joi.validate(data, schema, { abortEarly: false });
  if (!error) return null;

  const errors = {};
  error.details.map((item) => (errors[item.path[0]] = item.message));

  return errors;
};

const validateInputField = (name, value, schema) => {
  const obj = { [name]: value };
  const newSchema = { [name]: schema[name] };
  const { error } = Joi.validate(obj, newSchema);
  return error ? error.details[0].message : null;
};

export { validate, validateInputField };
