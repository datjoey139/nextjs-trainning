import { errors } from "@/lib/app-error";
import repositories, { RepositoryRegistry } from "@/repositories";
import bcrypt from "bcrypt";
import { jwtVerify, SignJWT } from "jose";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { encrypt } from "@/lib/app/auth";

class AuthService {
  async login(email: string, password: string): Promise<string> {
    const user = await repositories.user.getUserByEmail(email);
    if (!user) {
      throw errors.invalidUsernameOrPassword;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw errors.invalidUsernameOrPassword;
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new SignJWT({ email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(secret);  

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
