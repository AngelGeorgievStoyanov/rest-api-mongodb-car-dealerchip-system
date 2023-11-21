import bcrypt from "bcrypt";
import User from "../models/User";
import jsonwebtoken from "jsonwebtoken";

const secret = "rest-api-vue-js";

const jwt = jsonwebtoken;

export async function register(
  email: string,
  firstName: string,
  lastName: string,
  hashedPassword: string
) {
  const user = await User.create({
    email,
    firstName,
    lastName,
    hashedPassword: await bcrypt.hash(hashedPassword, 10)
  });
  return createToken(user);
}

function createToken(user: any) {
  const payload = {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
  };

  return {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    accessToken: jwt.sign(payload, secret),
  };
}

export async function findByEmail(email: string) {
  return await User.findOne({ email: `${email}` });
}
