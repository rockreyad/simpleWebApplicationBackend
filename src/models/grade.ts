import { Document, model, PopulatedDoc, Schema, SchemaTypes, Types } from 'mongoose';
import { CourseInstructorDocument } from './courseInstructor';

export interface GradeDocument extends Document {
    student: Types.ObjectId;
    marks: Number;
    courseInstructor: PopulatedDoc<CourseInstructorDocument>;
}

interface Grade {
    student: Types.ObjectId;
    marks: Number;
    courseInstructor: PopulatedDoc<CourseInstructorDocument>;
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
