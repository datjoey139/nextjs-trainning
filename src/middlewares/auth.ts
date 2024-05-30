import { APIMiddleware } from "@/lib/api/handler";

export function authMiddleware<OptsT>(): APIMiddleware<OptsT> {
    return async function (req, opts, next) {
        console.log("AuthMiddleware");
        return next(req, opts);
    }
}
