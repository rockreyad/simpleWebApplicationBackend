import { Schema, Document, model } from 'mongoose';

export interface TeacherDocument extends Document {
    name: string;
    password: string;
}

interface Teacher {
    name: string;
    password: string;
}

const teacherSchema = new Schema<Teacher>({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const TeacherModel = model<Teacher>('Teacher', teacherSchema);

export default TeacherModel;
