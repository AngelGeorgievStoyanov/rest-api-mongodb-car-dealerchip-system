import express, { Request, Response } from "express";
import { crateCars, findAll } from "../services/carsService";

const carsController = express.Router();

carsController.post("/create", async (req: Request, res: Response) => {
  try {
    const car = await crateCars(
      req.body.refN,
      req.body.brand,
      req.body.model,
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
    console.log(err);
    res.status(400).json(err.message);
  }
});


carsController.get("/", async (req: Request, res: Response) => {
    try {
      const cars = await findAll();
      res.status(200).json(cars);
    } catch (err: any) {
      console.log(err);
      res.status(400).json(err.message);
    }
  });

export default carsController;
