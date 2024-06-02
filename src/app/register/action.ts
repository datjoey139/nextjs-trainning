"use server";
import { User } from "@/models/user";
import userService from "@/services/auth";

export async function register(
  email: string,
  password: string
): Promise<boolean> {
  const isAuthenticated = await userService.register(email, password);
  return isAuthenticated;
}
