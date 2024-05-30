import { NextRequest, NextResponse } from "next/server";

export type HandlerFunc<RequestT = NextRequest, ResponseT = NextResponse<unknown>, OptsT = unknown> = (req: RequestT, opts: OptsT) => Promise<ResponseT> | ResponseT;

export type Middleware<RequestT = NextRequest, ResponseT = NextResponse<unknown>, OptsT = unknown> = (
    req: RequestT,
    opts: OptsT,
    next: HandlerFunc<RequestT, ResponseT, OptsT>
) => Promise<ResponseT> | ResponseT;

export type JSONBody = {
    code?: number;
    message?: string;
    data?: any;
    errors?: any;
};
