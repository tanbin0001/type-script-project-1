import httpStatus from "http-status";
import { AppError } from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TSemesterRegistration } from "./semesterRegistration.interface"
import { SemesterRegistration } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { RegistrationStatus } from "./semesterRegistration.constants";













const createSemesterRegistrationIntoDb = async (payload : TSemesterRegistration) => {
    // Check if there is any semester that is already upcoming or ongoing

    const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistration.findOne({
        $or : [
            {status: RegistrationStatus.UPCOMING},
            {status: RegistrationStatus.ONGOING}
        ]
    })

    if(isThereAnyUpcomingOrOngoingSemester){
        throw new AppError(httpStatus.BAD_REQUEST,  `There is already a ${isThereAnyUpcomingOrOngoingSemester.status} registered semester!`)
    }
    // check if semester is exists
    const academicSemester = payload?.academicSemester;
 
        const isAcademicSemesterExists = await AcademicSemester.findById(academicSemester)
        if(!isAcademicSemesterExists){
            throw new  AppError(httpStatus.NOT_FOUND, "Academic Semester not found")
        }


        // check if semester already exists
        const isSemesterRegistrationExists = await SemesterRegistration.findOne({academicSemester})
        if (isSemesterRegistrationExists){
            throw new  AppError(httpStatus.CONFLICT, "Academic Semester is already registered")
        }
      
        const result = await SemesterRegistration.create(payload);
        return result;
   
}


const getAllSemestersRegistrationsFromDB = async(query : Record<string,unknown>)=> {

    const semesterRegistrationQuery = await new QueryBuilder(SemesterRegistration.find().populate('academicSemester'), query).filter().sort().paginate().fields();
    const result = await semesterRegistrationQuery.modelQuery;
    return result;
}
const getSingleSemestersRegistrationsFromDB = async(id:string)=> {
const result  = await SemesterRegistration.findById(id)
    return result;
}

const updateSemestersRegistrationsIntoDB = async(id:string, payload: Partial<TSemesterRegistration>)=> {

 // check if semester is exists
 
 const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
const requestedStatus = payload.status;

 if(!isSemesterRegistrationExists){
     throw new  AppError(httpStatus.NOT_FOUND, "This semester is  not found")
 }


 // if the req semester is ended , it shouldn't be updated
 const currentSemesterStatus = isSemesterRegistrationExists.status
 if(currentSemesterStatus === 'ENDED'){
    throw new AppError(httpStatus.BAD_REQUEST, `This semester is already ${currentSemesterStatus}`)
 }



if(currentSemesterStatus === 'UPCOMING' && requestedStatus === 'ENDED'){
    throw new AppError(httpStatus.BAD_REQUEST, `You cannot change the the status from ${currentSemesterStatus}  to ${requestedStatus} directly!`)
}
if(currentSemesterStatus === 'ONGOING' && requestedStatus === 'UPCOMING'){
    throw new AppError(httpStatus.BAD_REQUEST, `You cannot change the the status from ${currentSemesterStatus}  to ${requestedStatus} directly!`)
}


const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new:true,
    runValidators: true,
})
return result;

}





export const  SemesterRegistrationServices = {
    createSemesterRegistrationIntoDb,
    getAllSemestersRegistrationsFromDB,
    getSingleSemestersRegistrationsFromDB,
    updateSemestersRegistrationsIntoDB
}