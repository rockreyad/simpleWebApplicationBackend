import { Schema, Document, model } from 'mongoose';

export interface UserDocument extends Document {
    name: string;
    dept: string;
}
interface User {
    name: string;
    dept: string;
}

const userSchema = new Schema<User>({
    name: {
        type: String,
        required: true
    },
    dept: {
        type: String
    }
});

const UserModel = model<User>('User', userSchema);
export default UserModel;
