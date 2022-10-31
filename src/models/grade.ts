import { Document, model, Schema, SchemaTypes } from 'mongoose';

export interface GradeDocument extends Document {
    student: object;
    marks: Number;
    courseInstructor: object;
}

interface Grade {
    student: object;
    marks: Number;
    courseInstructor: object;
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
