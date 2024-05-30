import { withMiddlewares } from "./middleware";
import { HandlerFunc, JSONBody, Middleware } from "./types";
import ApiResponse from "./response";
import { NextRequest, NextResponse } from "next/server";

export type APIHandler<OptsT = unknown> = HandlerFunc<NextRequest, NextResponse<JSONBody>, OptsT>;
export type APIMiddleware<OptsT = unknown> = Middleware<NextRequest, NextResponse<JSONBody>, OptsT>;

export function createHandler<OptsT = unknown>(
    handler: APIHandler<OptsT>,
    ...middlewares: APIMiddleware<OptsT>[]
): APIHandler<OptsT> {
    const wrappedHandler = async (req: NextRequest, opts: OptsT) => {
        try {
            return await handler(req, opts);
        } catch (error) {
            return ApiResponse.error(error);
        }
    };

    if (middlewares.length > 0) {
        return withMiddlewares(wrappedHandler, ...middlewares);
    }

    return wrappedHandler;
}
