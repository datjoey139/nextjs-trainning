import jobRepository from "./job";
import userRepository from "./user";

const repositories = {
  job: jobRepository,
  user: userRepository,
};

export type RepositoryRegistry = typeof repositories;

export default repositories;
