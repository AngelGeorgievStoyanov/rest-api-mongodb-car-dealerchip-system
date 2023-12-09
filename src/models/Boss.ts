import { Schema, model, Types } from "mongoose";

export interface IBoss {
  _id?: Types.ObjectId;
  refN: number;
  price: { type: Number };
  currency: { type: String };
  bossDescription: { type: String };
}

const bossSchemaDefinition = {
  refN: { type: Number, required: true },
  price: { type: Number, default: 0 },
  currency: { type: String, default: "" },
  bossDescription: { type: String, default: "" },
};

const bossSchema = new Schema<IBoss>(bossSchemaDefinition);

const Boss = model<IBoss>("Boss", bossSchema);

export { Boss };
