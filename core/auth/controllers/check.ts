import express from "express";
import { userService } from "../services/user";

export const checkHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const response = await userService.getProfile();
    return res.json({ response });
  } catch (error) {
    console.log(error);
  }
};
