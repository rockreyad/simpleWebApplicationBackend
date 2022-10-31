import { Request, Response } from 'express';
import { createCourse, deleteCourse, findAndUpdate, findCourse, findOneCourse } from '../service/course.service';

function getErrorStatus(error: any) {
    return error.status;
}

const create_course = async (req: Request, res: Response) => {
    try {
        const { name, code, credit } = req.body;

        if (!name || !code) {
            return res.status(400).json({
                message: 'Name & Course Code Required field'
            });
        }

        const courseInfo = {
            name,
            code,
            credit
        };

        const find_course = await findCourse({ code: courseInfo.code });

        if (find_course.length > 0) {
            throw {
                status: 409,
                message: 'Duplicated'
            };

            // return res.status(409).json({ message: 'Duplicated course' });
        }

        const course = await createCourse(courseInfo);
        return res.status(201).send({
            message: 'Course added successfully!',
            data: course
        });
    } catch (error: unknown) {
        let status: number = getErrorStatus(error);

        res.status(status || 500).json({
            status: 'FAILED',
            message: error
        });
    }
};

const update_course = async (req: Request, res: Response) => {
    const { code, name, credit } = req.body;

    if (!code || !(name || credit)) {
        return res.status(400).json({
            message: 'Course Code and name or credit is Required field'
        });
    }
    try {
        const courseInfo = {
            name,
            code,
            credit
        };

        if (courseInfo.name) {
        }
        const find_course = await findCourse({ code: courseInfo.code });
        if (!find_course) {
            throw {
                message: 'Not found!, Correct course name or course code'
            };
        }

        await findAndUpdate({ code: code }, { name: name, credit: credit }, { lean: true });
        return res.status(200).send({
            message: 'Course updated successfully!'
        });
    } catch (error: unknown) {
        res.status(500).json({
            status: 'FAILED',
            message: error
        });
    }
};

const all_course = async (req: Request, res: Response) => {
    const filter = {};
    const courses = await findCourse({ filter });

    const allCourse = courses.map((course) => course.name);
    return res.status(200).send({
        message: 'Course updated successfully!',
        data: allCourse
    });
};

const delete_course = async (req: Request, res: Response) => {
    const { code, name } = req.body;

    if (!(code || name)) {
        return res.status(400).json({
            message: 'Course Code or name is Required field'
        });
    }
    try {
        const courseInfo = {
            code,
            name
        };
        const find_course = await findOneCourse({ code: courseInfo.code } || { name: courseInfo.name });
        if (!find_course) {
            throw {
                message: 'Not found!, Correct course name or course code'
            };
        }

        await deleteCourse({ _id: find_course._id });
        return res.status(200).send({
            status: 'SUCCESS',
            message: 'Course deleted successfully!'
        });
    } catch (error: unknown) {
        res.status(500).json({
            message: error
        });
    }
};

export { create_course, update_course, delete_course, all_course };
