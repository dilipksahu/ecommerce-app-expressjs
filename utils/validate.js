const Joi = require('joi');

const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email:  Joi.string().email({ tlds: { allow: false } }),
    password: Joi.string()
                  .min(8)
                  .max(25)
                  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
                  'must contains atleast one a-z,A-Z,special charater, 0-9 and  min 8 and max 25 charater')
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email:  Joi.string().required(),
    password: Joi.string().required()
  });
  return schema.validate(data);
};

module.exports = {
    registerValidation,
    loginValidation,
  };