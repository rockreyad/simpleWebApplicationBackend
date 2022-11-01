import { Express, Request, Response } from 'express';

import { all_course, create_course, delete_course, update_course } from '../controllers/course';
import { all_department, create_department, delete_department, update_department } from '../controllers/department';
import { all_student, create_student, update_student } from '../controllers/student';
import { all_teacher, create_teacher, update_teacher } from '../controllers/teacher';

import { set_instructor } from '../controllers/courseInstructor';
import { course_drop, enroll_student } from '../controllers/enroll';
import { course_marks, set_grade, view_marks } from '../controllers/grade';

function routes(app: Express) {
    /** Home Page */
    app.get('/', (req: Request, res: Response) => {
        res.status(200).send('Welcome to Rest Api Service');
    });

    /** Course:  create,read,updateByFilter,update,delete */
    app.post('/create-new-course', create_course);
    app.get('/course', all_course);
    app.patch('/update-course', update_course);
    app.delete('/delete-course', delete_course);

    /** Department: create,read,updateByFilter,update,delete */
    app.post('/create-new-department', create_department);
    app.get('/department', all_department);
    app.patch('/update-department', update_department);
    app.delete('/delete-department', delete_department);

    /** Student: create,update*/
    app.get('/student', all_student);
    app.post('/create-new-student', create_student);
    app.patch('/update-student', update_student);

    /** Teacher: create,update,read */
    app.get('/teacher', all_teacher);
    app.post('/create-new-teacher', create_teacher);
    app.patch('/update-teacher', update_teacher);

    /** Instructor : set*/
    app.post('/set-instructor', set_instructor);

    /** Enroll : enroll student */
    app.post('/enroll', enroll_student);
    app.delete('/enroll', course_drop);

    /** Grade: set ,get marks of one course*/
    app.post('/set-grade', set_grade);
    app.get('/course-marks', course_marks);
    app.get('/grade', view_marks);

    /** About Page */
    app.get('/about', (req: Request, res: Response) => {
        res.status(200).send({
            message: 'We are working only for your service'
        });
    });
}

export default routes;
