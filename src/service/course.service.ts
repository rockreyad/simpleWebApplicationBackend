import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import Course, { CourseDocument } from '../models/course';

export function createCourse(input: DocumentDefinition<CourseDocument>) {
    return Course.create(input);
}

export function findCourse(query: FilterQuery<CourseDocument>, options: QueryOptions = { lean: true }) {
    return Course.find(query, {}, options);
}
export function findOneCourse(query: FilterQuery<CourseDocument>, options: QueryOptions = { lean: true }) {
    return Course.findOne(query, {}, options);
}

export function findAndUpdate(query: FilterQuery<CourseDocument>, update: UpdateQuery<CourseDocument>, options: QueryOptions) {
    return Course.findOneAndUpdate(query, update, options);
}

export function deleteCourse(query: FilterQuery<CourseDocument>) {
    return Course.deleteOne(query);
}
