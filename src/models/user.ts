import { TypeFromMongooseDocument } from "@/lib/type-utils";
import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type User = TypeFromMongooseDocument<UserDocument>;

const schema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const UserModel = (mongoose.models.User ||
  mongoose.model<UserDocument>("User", schema)) as mongoose.Model<UserDocument>;
export default UserModel;
