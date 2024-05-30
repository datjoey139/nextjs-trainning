import mongoose from "mongoose";
import { errors } from "../app-error";

export function objectIDFromString(id: string): mongoose.Types.ObjectId {
    let _id: mongoose.Types.ObjectId;
    try {
        _id = new mongoose.Types.ObjectId(id);
    } catch (error) {
        throw errors.invalidID;
    }

    return _id;
}
