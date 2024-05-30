import { createHandler } from "@/lib/api/handler";
import ApiResponse from "@/lib/api/response";
import { authMiddleware } from "@/middlewares/auth";
import services from "@/services";
import { NextRequest } from "next/server";

export const GET = createHandler(async function (
    request: NextRequest,
    { params: { id } }: { params: { id: string } },
) {
    const job = await services.job.getByID(id);

    return ApiResponse.ok(job);
}, authMiddleware());
