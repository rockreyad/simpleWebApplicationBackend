import { Document, model, Schema, SchemaTypes, Types } from 'mongoose';

export interface CourseInstructorDocument extends Document {
    course: Types.ObjectId;
    teacher: Types.ObjectId;
}

export interface CourseInstructor {
    course: Types.ObjectId;
    teacher: Types.ObjectId;
}

const courseInstructorSchema = new Schema<CourseInstructor>({
    course: {
        type: SchemaTypes.ObjectId,
        ref: 'Course'
    },
    teacher: {
        type: SchemaTypes.ObjectId,
        ref: 'Teacher'
    }
});

const CourseInstructorModel = model<CourseInstructor>('CourseInstructor', courseInstructorSchema);

export default CourseInstructorModel;
