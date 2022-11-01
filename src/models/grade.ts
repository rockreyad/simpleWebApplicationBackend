import { Document, model, Schema, SchemaTypes, Types } from 'mongoose';

export interface GradeDocument extends Document {
    student: Types.ObjectId;
    marks: Number;
    courseInstructor: Types.ObjectId;
}

interface Grade {
    student: Types.ObjectId;
    marks: Number;
    courseInstructor: Types.ObjectId;
}

const gradeSchmea = new Schema<Grade>({
    student: {
        type: SchemaTypes.ObjectId,
        ref: 'Student',
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    courseInstructor: {
        type: SchemaTypes.ObjectId,
        ref: 'CourseInstructor',
        required: true
    }
});

const GradeModel = model<Grade>('Grade', gradeSchmea);

export default GradeModel;
