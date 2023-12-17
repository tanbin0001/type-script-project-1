 
import { semesterRegistrationStatus } from './semesterRegistration.constants';
import { TSemesterRegistration } from './semesterRegistration.interface';
import mongoose, { Schema } from "mongoose";


 





 const semesterRegistration = new mongoose.Schema<TSemesterRegistration>({
    academicSemester:{
        type:  Schema.ObjectId,
        ref:'AcademicSemester',
        required:true,
        unique: true,
    },
    status:{
        type:String,
        enum: semesterRegistrationStatus,
        default: 'UPCOMING'
    },
    startDate: {
        type:Date,
        required: true
    },
    endDate: {
        type:Date,
        required: true
    },
    minCredit: {
        type: Number,
        default:3,
    },
    maxCredit: {
        type: Number,
        default:15,
    }
 },{
    timestamps: true
 });


 export const SemesterRegistration = mongoose.model<TSemesterRegistration>('SemesterRegistration', semesterRegistration);