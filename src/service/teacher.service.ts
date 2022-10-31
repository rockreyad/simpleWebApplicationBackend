import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import Teacher, { TeacherDocument } from '../models/teacher';

export function createTeacher(input: DocumentDefinition<TeacherDocument>) {
    return Teacher.create(input);
}

export function findTeacher(query: FilterQuery<TeacherDocument>, options: QueryOptions = { lean: true }) {
    return Teacher.find(query, {}, options);
}
export function findOneTeacher(query: FilterQuery<TeacherDocument>, options: QueryOptions = { lean: true }) {
    return Teacher.findOne(query, {}, options);
}

export function findAndUpdate(query: FilterQuery<TeacherDocument>, update: UpdateQuery<TeacherDocument>, options: QueryOptions) {
    return Teacher.findOneAndUpdate(query, update, options);
}

export function deleteTeacher(query: FilterQuery<TeacherDocument>) {
    return Teacher.deleteOne(query);
}
