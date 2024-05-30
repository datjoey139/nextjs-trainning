import { TypeFromMongooseDocument } from "@/lib/type-utils";
import mongoose from "mongoose";

export interface JobDocument extends mongoose.Document {
    title: string;
    description: string;
    datetime: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export type Job = TypeFromMongooseDocument<JobDocument>;

const schema = new mongoose.Schema<JobDocument>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    datetime: { type: Date, required: true },
}, { timestamps: true });

const JobModel = (mongoose.models.Job || mongoose.model<JobDocument>("Job", schema)) as mongoose.Model<JobDocument>;
export default JobModel;
