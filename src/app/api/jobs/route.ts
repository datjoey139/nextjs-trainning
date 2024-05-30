import { NextRequest } from "next/server";
import { createHandler } from "@/lib/api/handler";
import ApiResponse from "@/lib/api/response";
import services from "@/services";
import { z } from "zod";

export const GET = createHandler(async function (request: NextRequest) {
    const jobs = await services.job.get();

    return ApiResponse.ok({
        items: jobs,
    });
});

const createJobSchema = z.object({
    title: z.string(),
    description: z.string(),
    datetime: z.string().datetime(),
});

export const POST = createHandler(async function (request: NextRequest) {
    const body = await request.json()

    const job = createJobSchema.parse(body);

    await services.job.create({
        title: job.title,
        description: job.description,
        datetime: new Date(job.datetime),
    });

    return ApiResponse.ok();
});
