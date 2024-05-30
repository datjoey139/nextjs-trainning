import jobRepository from "./job"

const repositories = {
    job: jobRepository
}

export type RepositoryRegistry = typeof repositories

export default repositories
