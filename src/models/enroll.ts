import { Document, model, Schema, SchemaTypes, Types } from 'mongoose';

export interface EnrollDocument extends Document {
    student: [Types.ObjectId];
    instructor: Object;
}

interface Enroll {
    student: [Types.ObjectId];
    instructor: Object;
}

const enrollSchema = new Schema<Enroll>(
    {
        instructor: {
            type: SchemaTypes.ObjectId,
            ref: 'CourseInstructor',
            required: true
        },
        student: [
            {
                _id: false,
                type: SchemaTypes.ObjectId,
                ref: 'Student'
            }
        ]
    },
    { timestamps: true }
);

const EnrollModel = model<Enroll>('Enroll', enrollSchema);

export default EnrollModel;
