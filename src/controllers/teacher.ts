import { Request, Response } from 'express';
import { createTeacher, findAndUpdate, findTeacher } from '../service/teacher.service';

function getErrorStatus(error: any) {
    return error.status;
}

const create_teacher = async (req: Request, res: Response) => {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            return res.status(400).json({
                message: 'Name and Password Required field'
            });
        }

        const teacherInfo = {
            name,
            password
        };

        const find_teacher = await findTeacher({ name: teacherInfo.name });

        if (find_teacher.length > 0) {
            throw {
                status: 409,
                message: 'Duplicated'
            };

            // return res.status(409).json({ message: 'Duplicated course' });
        }

        const teacher = await createTeacher(teacherInfo);
        return res.status(201).send({
            message: 'Teacher added successfully!',
            data: teacher
        });
    } catch (error: unknown) {
        let status: number = getErrorStatus(error);

        res.status(status || 500).json({
            status: 'FAILED',
            message: error
        });
    }
};

const update_teacher = async (req: Request, res: Response) => {
    const { name, newName, password } = req.body;

    if (!name || !(password || newName)) {
        return res.status(400).json({
            message: 'Teacher name and newName or password is Required field'
        });
    }
    try {
        const teacherInfo = {
            name,
            newName,
            password
        };

        const find_teacher = await findTeacher({ name: teacherInfo.name });

        if (find_teacher.length <= 0) {
            throw {
                message: 'No teacher found!'
            };
        }

        await findAndUpdate({ name: teacherInfo.name }, { name: teacherInfo.newName, password: teacherInfo.password }, { lean: true });
        return res.status(200).send({
            message: 'Teacher updated successfully!'
        });
    } catch (error: unknown) {
        res.status(500).json({
            status: 'FAILED',
            message: error
        });
    }
};

const all_teacher = async (req: Request, res: Response) => {
    const filter = {};
    const teacher = await findTeacher({ filter });

    const allTeacher = teacher.map((teacher) => teacher.name);
    return res.status(200).send({
        message: 'Teacher name fetched successfully',
        data: allTeacher
    });
};

//TODO:Delete Teacher
export { create_teacher, update_teacher, all_teacher };
