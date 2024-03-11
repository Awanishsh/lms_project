import {Router} from 'express';
import {createdCourse,getAllCourses, getLecturesByCourseId,updateCourse, removeCourse , addLectureToCourseById} from '../controllers/course.controller.js'
import {authorizedRoles,isLoggedIn} from '../middlewares/auth.middleware.js';
import update from '../middlewares/multer.middleware.js';

const router = new Router();

router.route('/')
.get(getAllCourses)
.post(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    update.single('thumbnail'),
    createdCourse
    );

router.route('/:id')
.get(isLoggedIn, getLecturesByCourseId)
.put(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    updateCourse)

.delete(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    removeCourse
    )

.post(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    update.single('lecture'),
    addLectureToCourseById
    );


export default router;