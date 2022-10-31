import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import Student, { StudentDocument } from '../models/student';

export function createStudent(input: DocumentDefinition<StudentDocument>) {
    return Student.create(input);
}

export function findStudent(query: FilterQuery<StudentDocument>, options: QueryOptions = { lean: true }) {
    return Student.find(query, {}, options);
}
export function findOneStudent(query: FilterQuery<StudentDocument>, options: QueryOptions = { lean: true }) {
    return Student.findOne(query, {}, options);
}

export function findAndUpdate(query: FilterQuery<StudentDocument>, update: UpdateQuery<StudentDocument>, options: QueryOptions) {
    return Student.findOneAndUpdate(query, update, options);
}

export function deleteStudent(query: FilterQuery<StudentDocument>) {
    return Student.deleteOne(query);
}
