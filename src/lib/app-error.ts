export default class AppError extends Error {
    constructor(
        public message: string,
        public code?: number,
    ) {
        super(message)
    }
}

export const errors = {
    // General errors
    invalidID: new AppError("Invalid ID", 1),

    // Job errors (1000 - 1999)
    jobNotFound: new AppError("Job not found", 1002),
}
