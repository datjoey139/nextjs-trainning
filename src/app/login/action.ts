"use server"
import userService from "@/services/auth";

export async function login(email: string, password: string): Promise<boolean> {
    const isAuthenticated = await userService.login(email, password);
    return isAuthenticated;
}
