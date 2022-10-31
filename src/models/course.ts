import { Document, model, Schema } from 'mongoose';

export interface CourseDocument extends Document {
    name: string;
    code: string;
    credit: Number;
}
interface Course {
    name: string;
    code: string;
    credit: Number;
}

const courseSchema = new Schema<Course>({
    name: String,
    code: String,
    credit: Number
});

const CourseModel = model<Course>('Course', courseSchema);

export default CourseModel;
