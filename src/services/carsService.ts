import { Boss } from "../models/Boss";
import { Cars } from "../models/Cars";

export async function crateCars(
  refN: number,
  brand: string,
  model: string,
  publicPrice: number,
  kilometers: number,
  description: string,
  pictures: string[],
  listPrice: number,
  repairCost: number,
  importDate: Date,
  driver: string,
  soldTo: string,
  loadedFrom: string,
  documents: string,
  documentType: string,
  price?: number,
  currency?: string,
  bossDescription?: string
) {
  const car = await Cars.create({
    refN,
    brand,
    model,
    publicPrice,
    kilometers,
    description,
    pictures,
    listPrice,
    repairCost,
    importDate,
    driver,
    soldTo,
    loadedFrom,
    documents,
    documentType,
  });

  const boss = await Boss.create({
    refN,
    price,
    currency,
    bossDescription,
  });
  return car;
}

export async function findAll() {
  return Cars.find();
}
