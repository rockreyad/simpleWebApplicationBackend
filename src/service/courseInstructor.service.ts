import { DocumentDefinition, FilterQuery, QueryOptions } from 'mongoose';
import CourseInstructor, { CourseInstructorDocument } from '../models/courseInstructor';

export function setInstructor(input: DocumentDefinition<CourseInstructorDocument>) {
    return CourseInstructor.create(input);
}

export function findOneInstructor(query: FilterQuery<CourseInstructorDocument>, options: QueryOptions = { lean: true }) {
    return CourseInstructor.findOne(query, {}, options);
}
export function findInstructor(query: FilterQuery<CourseInstructorDocument>, options: QueryOptions = { lean: true }) {
    return CourseInstructor.find(query, {}, options);
}
