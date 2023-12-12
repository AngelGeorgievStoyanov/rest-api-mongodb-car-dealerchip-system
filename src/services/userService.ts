import bcrypt from "bcrypt";
import User, { IUser } from "../models/User";
import jsonwebtoken from "jsonwebtoken";

const secret = "rest-api-vue-js";

const jwt = jsonwebtoken;

export async function register(
  email: string,
  firstName: string,
  lastName: string,
  hashedPassword: string,
  role?: string
) {
  const user = await User.create({
    email,
    firstName,
    lastName,
    hashedPassword: await bcrypt.hash(hashedPassword, 10),
    role
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
    role: user.role,
  };

  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    accessToken: jwt.sign(payload, secret),
  };
}

export async function findByEmail(email: string) {
  return await User.findOne({ email: `${email}` });
}

export async function findAll() {
  return User.find();
}

export async function getUserById(id: string) {
  try {
    const existing = await User.findById(id.trim());
    if (existing) {
      return existing;
    } else {
      throw new Error("User not found");
    }
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function editUserById(id: string, user: IUser) {
  let existing = await User.findById(id);
  if (existing) {
    existing.firstName = user.firstName;
    existing.lastName = user.lastName;
    existing.email = existing.email;
    existing.role = user.role;
    return existing.save();
  }
}
