import { errors } from "@/lib/app-error";
import mongooseConnect from "@/lib/mongodb/mongoose";
import { objectIDFromString } from "@/lib/mongodb/utils";
import JobModel, { Job, JobDocument } from "@/models/job";

export class JobRepository {
    async getById(id: string): Promise<Job> {
        await mongooseConnect();

        const job = await JobModel.findOne<JobDocument>({
            _id: objectIDFromString(id),
        }).exec();

        console.log(JSON.stringify(job));

        if (!job) {
            throw errors.jobNotFound;
        }

        return job;
    }

    async create(job: Job) {
        await mongooseConnect();

        const newJob = new JobModel(job);
        await newJob.save();
    }

    async get(): Promise<Job[]> {
        await mongooseConnect();

        const jobs = await JobModel.find({}).exec();

        return jobs;
    }
}

const jobRepository = new JobRepository();
export default jobRepository;

