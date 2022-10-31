import { Request, Response } from 'express';
import { findOneCourse } from '../service/course.service';
import { setInstructor } from '../service/courseInstructor.service';
import { findOneTeacher } from '../service/teacher.service';

const set_instructor = async (req: Request, res: Response) => {
    try {
        const { course, teacher } = req.body;

        if (!course || !teacher) {
            return res.status(400).json({
                message: 'course and teacher Required field'
            });
        }

        const find_course = await findOneCourse({ code: course } || { name: course });

        if (!find_course) {
            return res.status(404).json({
                message: 'Please give a correct course code'
            });
        }

        const find_teacher = await findOneTeacher({ name: teacher });

        if (!find_teacher) {
            throw {
                message: 'No teacher Found!'
            };
        }

        const instructorInfo = {
            course: find_course._id,
            teacher: find_teacher._id
        };
        const instructor = await setInstructor(instructorInfo);
        return res.status(201).send({
            message: 'Instructor added successfully!',
            data: instructor
        });
    } catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: error
        });
    }
};

export { set_instructor };
