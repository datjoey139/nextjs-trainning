"use server";

import { Job } from "@/models/job";
import jobService from "@/services/job";

export async function createJob(job: Job) {
  return await jobService.create(job);
}
