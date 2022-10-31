import { Document, model, Schema, SchemaTypes, Types } from 'mongoose';

export interface StudentDocument extends Document {
    name: string;
    studentId: Number;
    password: string;
    cgpa: Number;
    depId?: Types.ObjectId;
    creditTaken: number;
    creditAssign: number;
}

export interface Student {
    name: string;
    studentId: Number;
    password: string;
    cgpa: Number;
    depId?: Types.ObjectId;
    creditTaken: number;
    creditAssign: number;
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
    creditTaken: Number,
    creditAssign: {
        type: Number,
        default: 0
    }
});

const StudentModel = model<Student>('Student', studentSchmea);

export default StudentModel;
