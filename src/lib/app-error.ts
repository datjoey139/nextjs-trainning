import errorMsgs from "./message/errors"

export default class AppError extends Error {
    constructor(
        public message: keyof typeof errorMsgs,
        public code?: number,
    ) {
        super(message as string)
    }
}

export const errors = {
    // General errors
    invalidID: new AppError("INVALID_ID", 1),

    // Job errors (1000 - 1999)
    jobNotFound: new AppError("JOB_NOT_FOUND", 1001),

    // User errors (2000 - 2999)
    userNotFound: new AppError("USER_NOT_FOUND", 2001),
    usernameAlreadyExists: new AppError("USERNAME_ALREADY_EXISTS", 2002),
    invalidUsernameOrPassword: new AppError("INVALID_USERNAME_OR_PASSWORD", 2003),
    invalidAccessToken: new AppError("INVALID_ACCESS_TOKEN", 2004),
    invalidToken: new AppError("INVALID_TOKEN", 2005),
}
