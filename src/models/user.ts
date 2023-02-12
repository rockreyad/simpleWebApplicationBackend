import { Document, model, Schema, SchemaTypes, Types } from 'mongoose';

export interface UserDocument extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

const userSchmea = new Schema<User>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

const UserModel = model<User>('User', userSchmea);

export default UserModel;
