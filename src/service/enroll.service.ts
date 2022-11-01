import { AnyKeys, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import Enroll, { EnrollDocument } from '../models/enroll';

export function enrollStudent(input: AnyKeys<EnrollDocument>) {
    return Enroll.create(input);
}

export function findEnroll(query: FilterQuery<EnrollDocument>, options: QueryOptions = { lean: true }) {
    return Enroll.find(query, {}, options);
}
export function findOneEnroll(query: FilterQuery<EnrollDocument>, options: QueryOptions = { lean: true }) {
    return Enroll.findOne(query, {}, options);
}

export function findAndUpdate(query: FilterQuery<EnrollDocument>, update: UpdateQuery<EnrollDocument>, options?: QueryOptions) {
    return Enroll.findOneAndUpdate(query, update, options);
}

export function deleteEnroll(query: FilterQuery<EnrollDocument>) {
    return Enroll.deleteOne(query);
}
