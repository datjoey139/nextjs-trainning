import jobService from "./job";
import authService from "./auth";

const services = {
    job: jobService,
    auth: authService,
}

export type ServiceRegistry = typeof services;

export default services;