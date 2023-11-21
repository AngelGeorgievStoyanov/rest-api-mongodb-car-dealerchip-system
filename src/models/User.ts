import { Schema, model, Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  hashedPassword: string;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: [true, "First name is required"] },
  lastName: { type: String, required: [true, "Lasst name is required"] },
  email: { type: String, required: [true, "Email is required"], unique: true },
  hashedPassword: { type: String, required: true },
});

userSchema.index(
  { email: 1 },
  {
    collation: {
      locale: "en",
      strength: 2,
    },
  }
);

const User = model<IUser>("User", userSchema);

export default User;
