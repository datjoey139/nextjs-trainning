import { NextRequest, NextResponse } from "next/server";
import type { HandlerFunc, Middleware } from "@/lib/api/types";

export function withMiddlewares<RequestT, ResponseT, OptsT>(
    handler: HandlerFunc<RequestT, ResponseT, OptsT>,
    ...middlewares: Middleware<RequestT, ResponseT, OptsT>[]
): HandlerFunc<RequestT, ResponseT, OptsT> {
    return middlewares.
        reduceRight<HandlerFunc<RequestT, ResponseT, OptsT>>(
            (prev, curr) => (req, opts) =>
                curr(req, opts, prev),
            handler,
        );
}
