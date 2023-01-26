import Joi from "joi";
import { userData } from "../Interface/user.interface";

export const userDataValidaton = (user: userData) => {
  const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(36).required(),
  });

  return userSchema.validate(user);
};

export const loginValidation = (login: {
  email: string;
  password: string;
}) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(36).required(),
  });

  return loginSchema.validate(login);
};
