import { Document, model, Schema, SchemaTypes, Types } from 'mongoose';

export interface StudentDocument extends Document {
    name: string;
    studentId: Number;
    password: string;
    cgpa: Number;
    depId?: Types.ObjectId;
    credit: Number;
}

export interface Student {
    name: string;
    studentId: Number;
    password: string;
    cgpa: Number;
    depId?: Types.ObjectId;
    credit?: Number;
}

const studentSchmea = new Schema<Student>({
    name: {
        type: String,
        required: true
    },
    studentId: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cgpa: {
        type: Number,
        default: null
    },
    depId: {
        type: SchemaTypes.ObjectId,
        default: null
    },
    credit: Number
});

const StudentModel = model<Student>('Student', studentSchmea);

export default StudentModel;
