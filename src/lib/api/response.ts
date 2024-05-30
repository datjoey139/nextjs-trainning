import { NextResponse } from "next/server";
import AppError from "../app-error";
import { JSONBody } from "./types";
import { ZodError } from "zod";

const ApiResponse = {
    ok: function (data?: unknown): NextResponse<JSONBody> {
        return NextResponse.json({
            code: 0,
            message: "Success",
            data,
        }, { status: 200, statusText: 'OK' })
    },

    error: function (error: unknown): NextResponse<JSONBody> {
        if (error instanceof AppError) {
            return handlerAppError(error)
        }

        if (error instanceof ZodError) {
            return handleZodError(error)
        }

        return handleInteralError(error);
    }
};

export default ApiResponse;

function handleInteralError(error: unknown) {
    console.error(error);
    return NextResponse.json({
        message: 'Internal Server Error',
    }, { status: 500, statusText: 'Internal Server Error' })
}

function handlerAppError(error: AppError) {
    return NextResponse.json({
        code: typeof error.code === "number" ? error.code : undefined,
        message: error.message
    }, { status: 400, statusText: 'Bad Request' })
}

function handleZodError(error: ZodError) {
    return NextResponse.json({
        code: 401,
        message: 'Validation error',
        errors: error.flatten().fieldErrors
    }, { status: 400, statusText: 'Bad Request' })
}
