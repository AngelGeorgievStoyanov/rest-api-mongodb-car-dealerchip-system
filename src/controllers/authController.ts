import express, { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import { findByEmail, login, register } from "../services/userService";
const authController = express.Router();

authController.post("/register", async (req: Request, res: Response) => {
  try {
    const existing = await findByEmail(req.body.email);

    if (existing) {
      throw new Error("Email is taken");
    }

    try {
      const token = await register(
        req.body.email,
        req.body.firstName,
        req.body.lastName,
        req.body.password
      );

      res.status(201).json(token);
    } catch (err: any) {
      console.log(err);
      res.status(400).json(err.message);
    }
  } catch (err: any) {
    console.log(err);
    res.status(400).json(err.message);
  }
});

authController.post("/login", async (req: Request, res: Response) => {
  try {
    const token = await login(req.body.email, req.body.password);
    res.status(200).json(token);
  } catch (err: any) {
    console.log(err);
    res.status(401).json(err.message);
  }
});

export default authController;
