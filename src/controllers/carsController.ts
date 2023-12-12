import express, { Request, Response } from "express";
import {
  crateCars,
  deleteCarById,
  editCarById,
  findAll,
  getCarById,
} from "../services/carsService";
import mongoose from "mongoose";

const carsController = express.Router();

carsController.post("/create", async (req: Request, res: Response) => {
  try {
    const car = await crateCars(
      req.body.refN,
      req.body.brand,
      req.body.carModel,
      req.body.publicPrice,
      req.body.kilometers,
      req.body.description,
      req.body.pictures,
      req.body.listPrice,
      req.body.repairCost,
      req.body.importDate,
      req.body.driver,
      req.body.soldTo,
      req.body.loadedFrom,
      req.body.documents,
      req.body.documentType,
      req.body.price,
      req.body.currency,
      req.body.bossDescription
    );
    res.status(201).json(car);
  } catch (err: any) {
    console.log(err.message || err);
    res.status(400).json(err.message);
  }
});

carsController.get("/", async (req: Request, res: Response) => {
  try {
    const cars = await findAll();
    res.status(200).json(cars);
  } catch (err: any) {
    console.log(err.message || err);
    res.status(400).json(err.message);
  }
});

carsController.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id: id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({
        message: `No car with id :${id}`,
      });
    const car = await getCarById(id);
    res.status(200).json(car);
  } catch (err: any) {
    console.log(err.message || err);
    res.status(404).json(err.message);
  }
});

carsController.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id: id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({
        message: `No car with id :${id}`,
      });

    const existing = await getCarById(id);
    if (existing) {
      try {
        const result = await editCarById(id, req.body);

        res.status(200).json(result);
      } catch (err: any) {
        console.log(err.message || err);
        throw new Error(err);
      }
    }
  } catch (err: any) {
    console.log(err.message || err);
    res.status(404).json(err.message);
  }
});

carsController.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id: id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({
        message: `No car with id :${id}`,
      });
    const existing = await getCarById(id);
    if (existing) {
      try {
        const result = await deleteCarById(id);

        res.status(200).json(result);
      } catch (err: any) {
        throw new Error(err);
      }
    }
  } catch (err: any) {
    console.log(err.message || err);
    res.status(404).json(err.message);
  }
});

export default carsController;
