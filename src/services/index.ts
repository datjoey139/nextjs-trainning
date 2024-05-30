import jobService from "./job";

const services = {
    job: jobService,
}

export type ServiceRegistry = typeof services;

export default services;
