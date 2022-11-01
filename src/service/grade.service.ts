import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import Grade, { GradeDocument } from '../models/grade';

export function setGrade(input: DocumentDefinition<GradeDocument>) {
    return Grade.create(input);
}

export function findGrade(query: FilterQuery<GradeDocument>, options: QueryOptions = { lean: true }) {
    return Grade.find(query, {}, options);
}

export function findOneGrade(query: FilterQuery<GradeDocument>, options: QueryOptions = { lean: true }) {
    return Grade.findOne(query, {}, options);
}

export function findAndUpdate(query: FilterQuery<GradeDocument>, update: UpdateQuery<GradeDocument>, options: QueryOptions) {
    return Grade.findOneAndUpdate(query, update, options);
}

export function deleteGrade(query: FilterQuery<GradeDocument>) {
    return Grade.deleteOne(query);
}
