import { Job } from "@/models/job";
import repositories, { RepositoryRegistry } from "@/repositories";

class JobService {
    constructor(
        private readonly repo: RepositoryRegistry
    ) { }

    async get(): Promise<Job[]> {
        return this.repo.job.get();
    }

    async getByID(id: string): Promise<Job> {
        return this.repo.job.getById(id);
    }

    async create(job: Job) {
        await this.repo.job.create(job);
    }
}

const jobService = new JobService(repositories);

export default jobService;
