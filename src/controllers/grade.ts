import { Request, Response } from 'express';
import { findOneCourse } from '../service/course.service';
import { findOneInstructor } from '../service/courseInstructor.service';
import { findOneEnroll } from '../service/enroll.service';
import { findOneGrade, setGrade } from '../service/grade.service';
import { findOneStudent } from '../service/student.service';
import { findOneTeacher } from '../service/teacher.service';

const set_grade = async (req: Request, res: Response) => {
    const { teacher, course, student, marks } = req.body;

    if (!teacher || !course || !student || !marks) {
        return res.status(400).json({
            message: 'Teacher, course ,student and marks Required field'
        });
    }
    try {
        const find_teacher = await findOneTeacher({ name: teacher });

        if (!find_teacher) {
            throw {
                message: 'No teacher found!'
            };
        }
        const find_course = await findOneCourse({ code: course });
        if (!find_course) {
            throw {
                message: 'No course exists with this code!'
            };
        }

        const find_instructor = await findOneInstructor({ course: find_course._id, teacher: find_teacher._id }, { lean: false });

        if (!find_instructor) {
            throw {
                message: 'You are not the instructor for this course!'
            };
        }

        const find_student = await findOneStudent({ studentId: student }, { lean: false });

        if (!find_student) {
            throw {
                message: 'No student with this id!'
            };
        }

        const find_enroll = await findOneEnroll({ instructor: find_instructor._id }, { lean: false }).populate('student');

        let check_enrolled = find_enroll?.student.find((value) => {
            return value.id == find_student.id;
        });

        if (!check_enrolled) {
            throw {
                message: 'Student not enrolled in your course!'
            };
        }

        const gradeInfo = {
            student: find_student._id,
            marks: marks,
            courseInstructor: find_instructor._id
        };

        const duplicate_grade = await findOneGrade({ student: find_student._id, courseInstructor: find_instructor._id }, { lean: true });

        if (duplicate_grade) {
            throw {
                message: `Marks already submitted!`
            };
        }
        await setGrade(gradeInfo);

        return res.status(201).send({
            message: `${marks} marks added for this Id ${student} successfully!`
        });
    } catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: error
        });
    }
};

export { set_grade };
