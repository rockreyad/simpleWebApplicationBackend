import { Document, model, Schema } from 'mongoose';

export interface DepartmentDocument extends Document {
    name: string;
    short: string;
}
interface Department {
    name: string;
    short: string;
}

const departmentSchema = new Schema<Department>({
    name: String,
    short: String
});

const DepartmentModel = model<Department>('Department', departmentSchema);

export default DepartmentModel;
