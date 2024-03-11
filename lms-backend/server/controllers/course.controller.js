import Course from "../models/course.model.js"
import AppError from "../utils/error.util.js";
import fs from 'fs/promises';
import cloudinary from 'cloudinary';
import { truncate } from "fs";



const getAllCourses = async(req, res,next) =>{

    try {
        const courses = await Course.find({}).select('-lectures');


        res.status(200).json({
            success:true,
            message:"All courses",
            courses,
        })
    } catch (e) {
        return next(new AppError(e.message, 500))
        
    }
   



}




 const getLecturesByCourseId = async (req ,res,next) =>{
    try {
        const {id} = req.params;
        const course = await Course.findById(id);

        if(!course){
            return next(new AppError('Invaid course id', 400))
        }

        res.status(200).json({
            success:true,
            message:'Course leactur lechree',
            lectures: course.lectures
        });

    } catch (e) {
        return next(new AppError(e.message, 500))
    }

 }

 const createdCourse = async(req , res, next) =>{
    const {title, description, category, createBy } =req.body ;

    if(!title || !description || !category || !createBy){
        return next(
            new AppError('All field are require', 400)
        )

    }

    const course = await Course.create({
        title,
        description,
        category,
        createBy,
        thumnail:{
            public_id:'Dummy',
            secure_url:'Dummy',
        },


    });

    if(!course){
        return next(
            new AppError('Course could not created, please try again', 500)
        )
    }

    if(req.file){
        const result = await cloudinary.v2.uploader.upload(req.file.path,{
            folder:'test'
        });
        if (result){
            course.thumnail.public_id = result.public_id;
            course.thumnail.secure_url= result.secure_url;
        }

        fs.rm(`uploads/${req.file.filename}`);
    }

    await course.save();
    res.status(200).json({
        success:true ,
        message:'Course created successfully',
        course,
    })

 }

 const updateCourse = async(req, res, next) =>{
    try {
        const {id} = req.params;
        const course = await Course.findById(id);

        if(!course){
            return next(
                new AppError('Coures with given id does not exist', 500)
            )
        }
           await Course.findByIdAndDelete(id);

           res.status(200).json({
            success:true,
            message:'Course deleted successfully'
           })


    } catch (e) {
        return next(
            new AppError(e.message, 500)
        )
    }

 }

 const removeCourse = async(req, res,next) =>{
    try {

        const {id} = req.params;
        const course =await Course.findByIdAndUpdate(
            {
                $et:req.body
            },
            {
              runValidatores: truncate
            }
        );

        if(!course){
            return next(
                new AppError('Coures with given id does not exist', 500)
            )
        }
          res.status(200).json({
            success:true,
            message:"Course updated successfully", 
          })
        
    } catch (e) {
        return next(
            new AppError(e.message, 500)
        )

    }
    

 }

 const  addLectureToCourseById = async (req, res, next) =>{
    try {
        const {title , description} = res.body;
        const {id} = req.params;
    
        if(!title || !description){
            return next(
                new AppError('All field are require', 400)
            )
    
        }
      
    
         const course = await Course.findById(id);
    
         if(!course){
            return next(
                new AppError('Coures with given id does not exist', 500)
            )
     
     }
    const lectureDate = {
        title,
        description,
        lecture:{}
    }
     if(req.file){
        if(req.file){
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'test'
            });
            if (result){
                lectureDate.lecture.public_id = result.public_id;
                lectureDate.lecture.secure_url= result.secure_url;
            }
    
            fs.rm(`uploads/${req.file.filename}`); 
        }
    
     }
           course.lectures.push(lectureDate);
           course.numberOfLecture = course.lectures.length;
    
           await course.save();
           res.status(200).json({
            success:true,
            message:'Lecture successfully added to this course',
            course,
    
           })
    } catch (e) {
        return next(
            new AppError(e.message, 500)
    )}
   
 }
 export {
    getAllCourses,
    getLecturesByCourseId,
    createdCourse,
    updateCourse,
    removeCourse,
    addLectureToCourseById


 }