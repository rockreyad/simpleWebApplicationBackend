import { Request, Response } from 'express';
import { findOneCourse } from '../service/course.service';
import { findOneInstructor } from '../service/courseInstructor.service';
import { enrollStudent, findAndUpdate, findOneEnroll } from '../service/enroll.service';
import { findOneStudent } from '../service/student.service';

const enroll_student = async (req: Request, res: Response) => {
    const { course, studentId } = req.body;

    if (!course || !studentId) {
        return res.status(400).json({
            message: 'course code and student id Required field'
        });
    }
    try {
        const find_course = await findOneCourse({ code: course });

        if (!find_course) {
            throw {
                message: 'No course exists with this code!'
            };
        }

        const find_student = await findOneStudent({ studentId: studentId }, { lean: false });

        if (!find_student) {
            throw {
                message: 'No student with this id!'
            };
        }

        const find_instructor = await findOneInstructor({ course: find_course._id });

        if (!find_instructor) {
            throw {
                message: 'No instructor with this name taking courses!'
            };
        }

        const find_enroll = await findOneEnroll({ instructor: find_instructor._id }, { lean: false }).populate('student');

        let already_enrolled = find_enroll?.student.find((value) => {
            return value.id == find_student.id;
        });

        if (already_enrolled) {
            throw {
                message: 'You already enrolled in this course'
            };
        }

        let enroll;
        if (!find_enroll) {
            enroll = await enrollStudent({ instructor: find_instructor._id, student: [find_student._id] });
        } else {
            await findAndUpdate({ _id: find_enroll._id }, { student: [...find_enroll.student, find_student._id] });
        }

        return res.status(201).send({
            status: 'SUCESS',
            message: 'student enrolled successfully!'
        });
    } catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: error
        });
    }
};

export { enroll_student };
