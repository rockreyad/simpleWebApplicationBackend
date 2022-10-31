import { Request, Response } from 'express';
import { findOneDepartment } from '../service/department.service';
import { createStudent, findAndUpdate, findOneStudent, findStudent } from '../service/student.service';

function getErrorStatus(error: any) {
    return error.status;
}

const create_student = async (req: Request, res: Response) => {
    try {
        const { name, id, password, department, credit } = req.body;

        if (!name || !password || !department || !credit) {
            return res.status(400).json({
                message: 'Name , Password, department and credit Required field'
            });
        }

        const fetchDepartment = await findOneDepartment({ short: department });

        const studentInfo = {
            name,
            studentId: id,
            password,
            depId: fetchDepartment?._id,
            credit,
            cgpa: 0
        };

        const find_student = await findStudent({ studentId: studentInfo.studentId });

        if (find_student.length > 0) {
            throw {
                status: 409,
                message: 'Duplicated'
            };

            // return res.status(409).json({ message: 'Duplicated course' });
        }

        const student = await createStudent(studentInfo);
        return res.status(201).send({
            message: 'Student added successfully!',
            data: student
        });
    } catch (error: unknown) {
        let status: number = getErrorStatus(error);

        res.status(status || 500).json({
            status: 'FAILED',
            message: error
        });
    }
};

const update_student = async (req: Request, res: Response) => {
    const { name, id, password, department } = req.body;

    if (!id || !(name || password || department)) {
        return res.status(400).json({
            message: 'Student Id and name or password or department is Required field'
        });
    }
    try {
        const fetchDepartment = await findOneDepartment({ short: department });

        const studentInfo = {
            name,
            studentId: id,
            password,
            depId: fetchDepartment?._id
        };

        const find_student = await findOneStudent({ id: studentInfo.studentId });
        if (!find_student) {
            throw {
                message: 'Not found!, Department course name or course code'
            };
        }

        await findAndUpdate({ id: studentInfo.studentId }, { name: name, password: studentInfo.password, depId: studentInfo.depId }, { lean: true });
        return res.status(200).send({
            message: 'Student updated successfully!'
        });
    } catch (error: unknown) {
        res.status(500).json({
            status: 'FAILED',
            message: error
        });
    }
};

const all_student = async (req: Request, res: Response) => {
    const filter = {};
    const student = await findStudent({ filter });

    const allStudent = student.map((student) => student.studentId);
    return res.status(200).send({
        message: 'Student Id fetched successfully',
        data: allStudent
    });
};

//TODO:Delete Student
export { create_student, update_student, all_student };
