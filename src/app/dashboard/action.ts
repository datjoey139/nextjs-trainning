"use server";

import { Job } from "@/models/job";
import jobService from "@/services/job";

"use server";
import { call, getSession } from "@/lib/app/auth";

export async function callFunction(fName: string) {
  return call(fName);
}

export async function getSessionData() {
  const session = await getSession();
  return session;
}

export async function createJob(job: Job) {
  return await jobService.create(job);
}
