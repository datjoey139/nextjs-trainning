import { errors } from "@/lib/app-error";
import repositories, { RepositoryRegistry } from "@/repositories";
import bcrypt from "bcrypt";
import { jwtVerify, SignJWT } from "jose";
import mongoose from "mongoose";
import { cookies } from "next/headers";
import { encrypt } from "@/lib/app/auth";

class AuthService {
  async login(username: string, password: string): Promise<boolean> {
    const user = await repositories.user.getUserByEmail(username);
    if (!user) {
      throw errors.userNotFound;
    }
    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated) {
        return false;
    }
    // Create the session
    const expires = new Date(Date.now() + 3600 * 1000);
    const session = await encrypt({ data: user, expires });
    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });

    return true;
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
