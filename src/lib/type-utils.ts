import mongoose from "mongoose";

export type FlagExcludedType<Base, Type> = {
    [Key in keyof Base]: Base[Key] extends Type ? never : Key
}

export type TypeFromMongooseDocument<T extends mongoose.Document> = Omit<
    Pick<T, FlagExcludedType<Required<T>, Function>[keyof T]>,
    "$locals" | "$op" | "$where" | "errors" | "db" | "schema" | "baseModelName" | "isNew"
>;
