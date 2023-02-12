import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import User, { UserDocument } from '../models/user';

export function createUser(input: DocumentDefinition<UserDocument>) {
    return User.create(input);
}

export function findUser(query: FilterQuery<UserDocument>, options: QueryOptions = { lean: true }) {
    return User.find(query, {}, options);
}
export function findOneUser(query: FilterQuery<UserDocument>, options: QueryOptions = { lean: true }) {
    return User.findOne(query, {}, options);
}

export function findAndUpdate(query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument>, options: QueryOptions) {
    return User.findOneAndUpdate(query, update, options);
}

export function deleteStudent(query: FilterQuery<UserDocument>) {
    return User.deleteOne(query);
}
