"use server";

import loginService from "@/services/auth";
import { encrypt } from "@/lib/app/auth";
import { cookies } from "next/headers";

export async function login(email: string, password: string) {
  const data  = await loginService.login(email, password);
  if (data) {
    // Create the session
    const expires = new Date(Date.now() + 3600 * 1000);
    const session = await encrypt({ data: data, expires });
    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
  }
}
