import express, { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
import {
  editUserById,
  findAll,
  findByEmail,
  getUserById,
  login,
  register,
} from "../services/userService";
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
      console.log(err.message || err);
      res.status(400).json(err.message);
    }
  } catch (err: any) {
    console.log(err.message || err);
    res.status(400).json(err.message);
  }
});

authController.post("/login", async (req: Request, res: Response) => {
  try {
    const token = await login(req.body.email, req.body.password);
    res.status(200).json(token);
  } catch (err: any) {
    console.log(err.message || err);
    res.status(401).json(err.message);
  }
});

authController.get("/", async (req: Request, res: Response) => {
  try {
    const users = await findAll();
    res.status(200).json(users);
  } catch (err: any) {
    console.log(err.message || err);
    res.status(400).json(err.message);
  }
});

authController.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id: id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({
        message: `No user with id :${id}`,
      });
    const user = await getUserById(id);
    res.status(200).json(user);
  } catch (err: any) {
    console.log(err.message || err);
    res.status(404).json(err.message);
  }
});

authController.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id: id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({
        message: `No user with id :${id}`,
      });
    const existing = await getUserById(id);
    if (existing) {
      try {
        const result = await editUserById(id, req.body);
        res.status(200).json(result);
      } catch (err: any) {
        throw new Error(err);
      }
    }
  } catch (err: any) {
    res.status(404).json(err.message);
  }
});

export default authController;
