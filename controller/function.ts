import { Request, Response } from "express";
import userModel from "../model/schema";
import bcrypt from "bcrypt";

export const register = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    // genetate encrypted password

    const { fullName, password, email, isAdmin, stack } = req.body;
    const salt: string = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const create = await userModel.create({
      fullName,
      password: hash,
      email,
      isAdmin,
      stack,
    });

    if (!create) {
      return res.status(401).json({
        message:
          "Please submit Your details----fullName,password,email, isAdmin,stack,        ",
      });
    }

    return res.status(201).json({
      message: "Successfully created data",
      data: create,
    });
  } catch (error) {
    return res.status(400).json({
      message: "An error occured in register",
      error: error,
    });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    const checkPassword = await bcrypt.compare(password, user!.password);
    if (!email && !checkPassword) {
      return res.status(401).json({
        message: "enter your email",
      });
    }

    if (!user) {
      return res.status(401).json({
        status: "User not Found",
      });
    }

    if (!checkPassword) {
      return res.status(401).json({
        status: "User not Found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "An error occured in login",
      error: error,
    });
  }
};

export const getAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const getall = await userModel.find();
    return res.status(201).json({
      message: `${getall.length} user(s)`,
      data: getall,
    });
  } catch (error) {
    return res.status(400).json({
      message: "An error occured in get All",
      error: error,
    });
  }
};

export const deleteAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const deleteAll = await userModel.deleteMany();
    return res.status(201).json({
      message: "Deleted All Data",
    });
  } catch (error) {
    return res.status(400).json({
      message: "An error occured in delet All",
      error: error,
    });
  }
};
