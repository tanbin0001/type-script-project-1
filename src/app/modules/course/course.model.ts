import { Schema, model } from "mongoose";
import { TCourse, TCourseFaculty, TPreRequisiteCourses } from "./course.interface";



const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
    course: {
        type: Schema.ObjectId,
        ref:'Course'
    },
    isDeleted: {
        type:Boolean,
        default: false
    }
})

const courseSchema = new Schema<TCourse>({
    title: {
        type: String,
        require:true,
        unique: true,
        trim:true

    },
    prefix: {
        type: String,
        require:true,
        trim:true

    },
    code: {
        type: Number,
        require:true,
        trim:true

    },
    credits: {
        type: Number,
        require:true,
        trim:true

    },
    preRequisiteCourses:[preRequisiteCoursesSchema],
    isDeleted: {
        type:Boolean,
        default: false
    }
});
const courseFacultySchema = new Schema<TCourseFaculty>({
    course: {
        type: Schema.ObjectId,
        ref:'Course',
        unique: true
    },
    faculties:[ {
        type: Schema.Types.ObjectId,
        ref: 'Faculty'
 
    } ]
});

export const Course =   model<TCourse>('Course', courseSchema)
export const CourseFaculty = model<TCourseFaculty>('CourseFaculty', courseFacultySchema)