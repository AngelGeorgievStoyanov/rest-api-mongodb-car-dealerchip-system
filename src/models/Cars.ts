import { Schema, model, Types } from "mongoose";

export interface ICarBase {
  _id?: Types.ObjectId;
  refN: number;
  brand: string;
  carModel : string;
  publicPrice: number;
  kilometers: number;
  description: string;
  pictures: string[];
  listPrice: number;
  repairCost: number;
  importDate: Date;
  driver: string;
  soldTo: string;
  loadedFrom: string;
  documents: DocumentStatus;
  documentType: string;
}

export enum DocumentStatus {
  YES = "YES",
  NO = "NO",
}



const carSchemaDefinition = {
  refN: { type: Number, required: true },
  brand: { type: String, required: true },
  carModel : { type: String, required: true },
  publicPrice: { type: Number, required: true },
  kilometers: { type: Number, required: true },
  description: { type: String, required: true },
  pictures: { type: [String], default: [] },
  listPrice: { type: Number },
  repairCost: { type: Number },
  importDate: { type: Date },
  driver: { type: String },
  soldTo: { type: String },
  loadedFrom: { type: String },
  documents: { type: String, enum: Object.values(DocumentStatus) },
  documentType: { type: String },
 
};

const carSchema = new Schema<ICarBase>(carSchemaDefinition);

const Cars = model<ICarBase>('Cars', carSchema);

export { Cars };
