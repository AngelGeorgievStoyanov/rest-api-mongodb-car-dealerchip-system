import { Boss } from "../models/Boss";
import { Cars, ICarBase } from "../models/Cars";

export async function crateCars(
  refN: number,
  brand: string,
  carModel: string,
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
    carModel,
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

export async function getCarById(id: string) {
  try {
    const existing = await Cars.findById(id.trim());
    if (existing) {
      return existing;
    } else {
      throw new Error("Car not found");
    }
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function editCarById(id: string, car: ICarBase) {
  let existing = await Cars.findById(id);
  if (existing) {
    existing.refN = car.refN;
    existing.brand = car.brand;
    existing.carModel = car.carModel;
    existing.publicPrice = car.publicPrice;
    existing.kilometers = car.kilometers;
    existing.description = car.description;
    existing.pictures = car.pictures;
    existing.listPrice = car.listPrice;
    existing.repairCost = car.repairCost;
    existing.importDate = car.importDate;
    existing.driver = car.driver;
    existing.soldTo = car.soldTo;
    existing.loadedFrom = car.loadedFrom;
    existing.documents = car.documents;
    existing.documentType = car.documentType;
    return existing.save();
  }
}
export async function deleteCarById(id: string) {
  return Cars.findByIdAndDelete(id);
}
