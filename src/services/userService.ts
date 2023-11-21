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
    hashedPassword: await bcrypt.hash(hashedPassword, 10),
  });
  return createToken(user);
}

export async function login(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Incorrect email or password");
  }

  const match = await bcrypt.compare(password, user.hashedPassword);
  if (!match) {
    throw new Error("Incorrect email or password");
  }

  return createToken(user);
}

function createToken(user: any) {
  const payload = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    accessToken: jwt.sign(payload, secret),
  };
}

export async function findByEmail(email: string) {
  return await User.findOne({ email: `${email}` });
}
