import Logger from "../utils/logger.util";
import { omit } from "lodash";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { formatExcludedFields } from "../utils/db.utils";
import { Pagination, SortProps } from '../schema/shared.schema';
import { ReturnModelType, getModelForClass } from "@typegoose/typegoose";
import { AnyParamConstructor, DocumentType } from "@typegoose/typegoose/lib/types";
import { IExcludedFields, IPopulate } from "../types";
import { SortOrder } from "../types/enums";


export class BaseService<
    T, U extends AnyParamConstructor<T> = AnyParamConstructor<T>
> {
    private readonly repository: ReturnModelType<U, T>;

    constructor(
        private cls: U,
        private excludedFields: IExcludedFields<T> = ['isDeleted' as keyof T]
    ) {
        this.repository = getModelForClass(this.cls);
    }
    createOne = async (
        input: UpdateQuery<DocumentType<InstanceType<U>, T>>
    ) => {
        try {
            const savedObject = await this.repository.create({
                ...input,
            })
            return omit(savedObject.toObject(), this.excludedFields) as Partial<T>
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    };

    findOne = async (
        query: FilterQuery<DocumentType<InstanceType<U>, T>>,
        options: QueryOptions = {},
        populate: IPopulate<T, U> | IPopulate<T, U>[] = []
    ) => {
        try {
            const object = await this.repository
                .findOne(query, null, options)
                .select([...(formatExcludedFields(this.excludedFields))])
                .populate(populate);

            return object as T;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    findMany = async (
        query: FilterQuery<DocumentType<InstanceType<U>, T>>,
        options: QueryOptions = {},
        pagination: Pagination,
        sort: SortProps,
        populate: IPopulate<T, U> | IPopulate<T, U>[] = []
    ) => {
        try {
            const { sortBy = "createdAt", order = SortOrder.ASC } = sort;
            const { page = 1, limit = 10 } = pagination;

            const objects = await this.repository
                .find(query, null, options)
                .select([...(formatExcludedFields(this.excludedFields))])
                .populate(populate)
                .sort({ [sortBy]: order })
                .skip((page - 1) * limit)
                .limit(limit);

            return objects as T[];
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    findById = async (
        id: string,
        options: QueryOptions = {},
        populate: IPopulate<T, U> | IPopulate<T, U>[] = []
    ) => {
        try {
            const object = await this.repository
                .findById(id, null, options)
                .select([...(formatExcludedFields(this.excludedFields))])
                .populate(populate);

            return object as T;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    findOneOrCreate = async (
        query: FilterQuery<DocumentType<InstanceType<U>, T>>,
        input: UpdateQuery<DocumentType<InstanceType<U>, T>>,
    ) => {
        try {
            let object = await this.repository.findOne(query) as DocumentType<InstanceType<U>, T>;

            if (!object) {
                object = await this.repository.create({
                    ...input,
                }) as DocumentType<InstanceType<U>, T>;
            }

            return omit(object.toObject(), this.excludedFields) as Partial<T>;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    updateOne = async (
        query: FilterQuery<DocumentType<InstanceType<U>, T>>,
        update: UpdateQuery<DocumentType<InstanceType<U>, T>>,
        options: QueryOptions = { returnOriginal: false },
        populate: IPopulate<T, U> | IPopulate<T, U>[] = []
    ) => {
        try {
            const updatedObject = await this.repository
                .findOneAndUpdate(query, update, options)
                .select([...(formatExcludedFields(this.excludedFields))])
                .populate(populate);

            return updatedObject as T;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    findManyByIds = async (
        ids: string[],
        options: QueryOptions = {},
        populate: IPopulate<T, U> | IPopulate<T, U>[] = []
    ) => {
        try {
            const objects = await this.repository
                .find({ _id: { $in: ids } }, null, options)
                .select([...(formatExcludedFields(this.excludedFields))])
                .populate(populate);

            return objects as T[];
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    updateMany = async (
        query: FilterQuery<DocumentType<InstanceType<U>, T>>,
        update: UpdateQuery<DocumentType<InstanceType<U>, T>>,
        options: QueryOptions = { returnOriginal: false },
        populate: IPopulate<T, U> | IPopulate<T, U>[] = []
    ) => {
        try {
            const updatedObjects = await this.repository
                .updateMany(query, update, options)
                .select([...(formatExcludedFields(this.excludedFields))])
                .populate(populate);

            return updatedObjects as T[];
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    updateById = async (
        id: string,
        update: UpdateQuery<DocumentType<InstanceType<U>, T>>,
        options: QueryOptions = { returnOriginal: false },
        populate: IPopulate<T, U> | IPopulate<T, U>[] = []
    ) => {
        try {
            const updatedObject = await this.repository
                .findByIdAndUpdate(id, update, options)
                .select([...(formatExcludedFields(this.excludedFields))])
                .populate(populate);
            return updatedObject as T;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    deleteOne = async (
        query: FilterQuery<DocumentType<InstanceType<U>, T>>,
        options: QueryOptions = {},
        populate: IPopulate<T, U> | IPopulate<T, U>[] = []
    ) => {
        try {
            const deletedObject = await this.repository
                .findOneAndDelete(query, options)
                .select([...(formatExcludedFields(this.excludedFields))])
                .populate(populate);

            return deletedObject as T;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    deleteMany = async (
        query: FilterQuery<DocumentType<InstanceType<U>, T>>,
        options: QueryOptions = {},
        populate: IPopulate<T, U> | IPopulate<T, U>[] = []
    ) => {
        try {
            const deletedObjects = await this.repository
                .deleteMany(query, options)
                .select([...(formatExcludedFields(this.excludedFields))])
                .populate(populate);

            return deletedObjects as T[];
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    deleteById = async (
        id: string,
        options: QueryOptions = {},
        populate: IPopulate<T, U> | IPopulate<T, U>[] = []
    ) => {
        try {
            const deletedObject = await this.repository
                .findByIdAndDelete(id, options)
                .select([...(formatExcludedFields(this.excludedFields))])
                .populate(populate);
            return deletedObject as T;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    count = async (
        query: FilterQuery<DocumentType<InstanceType<U>, T>>,
        options: QueryOptions = {}
    ) => {
        try {
            const count = await this.repository.countDocuments(query, options);
            return count;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }
}