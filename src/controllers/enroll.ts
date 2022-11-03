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

        if (countCredit(find_student.creditTaken, find_course.credit, 'add') > find_student.creditAssign) {
            throw {
                message: 'You can not take this code, credit limits'
            };
        }
        let enroll;
        if (!find_enroll) {
            enroll = await enrollStudent({ instructor: find_instructor._id, student: [find_student._id] });
        } else {
            await findAndUpdate({ _id: find_enroll._id }, { student: [...find_enroll.student, find_student._id] });
        }

        await find_student.updateOne({ creditTaken: countCredit(find_student.creditTaken, find_course.credit, 'add') });
        return res.status(201).send({
            status: 'SUCESS',
            message: `${find_student.name} enrolled in ${find_course.name} successfully!`
        });
    } catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: error
        });
    }
};

const course_drop = async (req: Request, res: Response) => {
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

        const find_enroll = await findOneEnroll({ instructor: find_instructor._id, student: find_student._id }, { lean: false }).populate('student');

        if (!find_enroll) {
            throw {
                message: 'You did not enroll in this course!'
            };
        }

        //Drop the student from course
        let drop_student = find_enroll.student.filter((value) => value.id != find_student.id);

        await findAndUpdate({ instructor: find_instructor._id, student: find_student._id }, { student: drop_student }, { lean: false });

        await find_student.updateOne({ creditTaken: countCredit(find_student.creditTaken, find_course.credit, 'sub') });
        return res.status(200).send({
            status: 'SUCESS',
            message: `${find_student.name} drop from ${find_course.name} successfully!`
        });
    } catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: error
        });
    }
};

/** Custom Function */
function countCredit(fetchCredit: number, addCredit: number, operaton: string) {
    let credit = 0;
    switch (operaton) {
        case 'add':
            credit = fetchCredit + addCredit;
            break;
        case 'sub':
            credit = fetchCredit - addCredit;
            break;
        default:
            break;
    }
    return credit;
}

export { enroll_student, course_drop };
