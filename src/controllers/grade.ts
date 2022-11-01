import { Request, Response } from 'express';
import { findOneCourse } from '../service/course.service';
import { findInstructor, findOneInstructor } from '../service/courseInstructor.service';
import { findEnroll, findOneEnroll } from '../service/enroll.service';
import { findGrade, findOneGrade, setGrade } from '../service/grade.service';
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

const course_marks = async (req: Request, res: Response) => {
    const { course, student } = req.body;

    if (!course || !student) {
        return res.status(400).json({
            message: 'Course and student are Required field'
        });
    }
    try {
        const find_student = await findOneStudent({ studentId: student }, { lean: false });

        if (!find_student) {
            throw {
                message: 'No student with this id!'
            };
        }
        const find_course = await findOneCourse({ code: course }, { lean: false });
        if (!find_course) {
            throw {
                message: 'No course exists with this code!'
            };
        }

        const find_instructor = await findInstructor({ course: find_course._id }, { lean: false });

        if (find_instructor.length <= 0) {
            throw {
                message: `No teacher assigned for ${find_course.name} course!`
            };
        }

        const student_enroll = await findEnroll({ student: find_student._id }, { lean: false }).populate('instructor');

        if (student_enroll.length <= 0) {
            throw {
                message: 'Student did not enrolled any course!'
            };
        }

        let assign_instructor = find_instructor.map((value) => value.id);

        let enroll_instructors = student_enroll.map((value) => value.instructor.id);

        let get_instructor = enroll_instructors.filter((element) => assign_instructor.includes(element));

        if (get_instructor.length <= 0) {
            throw {
                message: `Student did not enrolled ${find_course.name} course!`
            };
        }
        let course_marks = await findOneGrade({ student: find_student.id, courseInstructor: get_instructor }, { lean: false });

        if (!course_marks) {
            throw {
                message: `You did not get any marks in ${find_course.name}!`
            };
        }
        return res.status(200).send({
            message: `Yout got ${course_marks?.marks} Marks in ${find_course.name}`
        });
    } catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: error
        });
    }
};

const view_marks = async (req: Request, res: Response) => {
    const { student } = req.body;
    try {
        const find_student = await findOneStudent({ studentId: student }, { lean: false });

        if (!find_student) {
            throw {
                message: 'No student with this id!'
            };
        }

        const grades = await findGrade({ student: find_student._id }, { lean: false }).select('marks courseInstructor _id').populate('courseInstructor');

        if (grades.length <= 0) {
            throw {
                message: `${find_student.name} has not assign any course marks`
            };
        }

        const view_grade = grades.map((course) => ({
            marks: course.marks,
            instructor: course.courseInstructor
        }));

        // findOneInstructor({ _id: course.courseInstructor._id }, { lean: false }).populate('course')
        return res.status(200).send({
            message: `Results`,
            data: view_grade
        });
    } catch (error) {
        res.status(500).json({
            status: 'FAILED',
            message: error
        });
    }
};
export { set_grade, course_marks, view_marks };
