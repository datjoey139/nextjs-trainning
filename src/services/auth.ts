import { errors } from "@/lib/app-error";
import repositories, { RepositoryRegistry } from "@/repositories";
import bcrypt from "bcrypt";
import { jwtVerify, SignJWT } from "jose";
import mongoose from "mongoose";

class AuthService {
  async login(username: string, password: string): Promise<string> {
    const user = await repositories.user.getUserByEmail(username);
    if (!user) {
      throw errors.userNotFound;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw errors.invalidUsernameOrPassword;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = await new SignJWT({ username: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode(secret));
    return token;
  }

  async register(email: string, password: string): Promise<boolean> {
    if (await repositories.user.checkUserByEmail(email)) {
      throw errors.usernameAlreadyExists;
    }

    const hashedPassword = await bcrypt.hash(password, 6);

    const user = {
      _id: new mongoose.Types.ObjectId(),
      email,
      password: hashedPassword,
    };

    await repositories.user.createUser(user);
    return true;
  }
}

const authService = new AuthService();

export default authService;
