import { NextFunction, Request, Response } from "express";
import userModel from "../model/schema";
import bcrypt from "bcrypt";
import { asyncHandler } from "../Util/asyncHandler";
import { userData } from "../Interface/user.interface";
import { AppError, HttpCode } from "../Util/AppError";

export const register = asyncHandler(
  async (
    req: Request<{}, {}, userData>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    // genetate encrypted password

    const { name, password, email } = req.body;
    const salt: string = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const create = await userModel.create({
      name,
      password: hash,
      email,
    });

    if (!create) {
      next(
        new AppError({
          message: "Account not Created",
          httpCode: HttpCode.Bad_Request,
          isOperational: true,
        })
      );
    }

    return res.status(201).json({
      message: "Successfully created data",
      data: create,
    });
  }
);

export const login = asyncHandler(
  async (
    req: Request<{}, {}, userData>,
    res: Response,
    next: NextFunction
  ): Promise<Response> => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      const checkPassword = await bcrypt.compare(password, user!.password);
      if (!email && !checkPassword) {
        next(
          new AppError({
            message: "User not found",
            httpCode: HttpCode.Not_Found,
            isOperational: true,
          })
        );
      }

      if (!user) {
        next(
          new AppError({
            message: "User not found",
            httpCode: HttpCode.Not_Found,
            isOperational: true,
          })
        );
      }

      if (!checkPassword) {
        next(
          new AppError({
            message: "Email or password not correct",
            httpCode: HttpCode.Unauthorized,
            isOperational: true,
          })
        );
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
  }
);

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
