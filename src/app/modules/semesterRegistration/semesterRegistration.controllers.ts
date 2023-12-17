 
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterRegistrationServices } from "./semesterRegistration.service";

const createSemester = catchAsync(async(req, res) => {
    const result = await SemesterRegistrationServices.createSemesterRegistrationIntoDb(req.body)

    sendResponse(res, {
        statusCode: 200 ,
        success: true,
        message: 'Semester Registration is created successfully!',
        data: result
    })
})
const getAllSemestersRegistrations = catchAsync(async(req, res) => {
    
    const result = await SemesterRegistrationServices.getAllSemestersRegistrationsFromDB(req.query)

    sendResponse(res, {
        statusCode: 200 ,
        success: true,
        message: 'All Semester Registrations retrieved successfully!',
        data: result
    })
})
const getSingleSemestersRegistration = catchAsync(async(req, res) => {
    const {id} = req.params;
 
    const result = await SemesterRegistrationServices.getSingleSemestersRegistrationsFromDB(id)

    sendResponse(res, {
        statusCode: 200 ,
        success: true,
        message: 'Semester Registration retrieved successfully!',
        data: result
    })
})
const updateSemestersRegistration = catchAsync(async(req, res) => {
    const {id} = req.params;
 
    const result = await SemesterRegistrationServices.updateSemestersRegistrationsIntoDB(id,req.body)

    sendResponse(res, {
        statusCode: 200 ,
        success: true,
        message: 'Semester Registration updated successfully!',
        data: result
    })
})


export const SemesterRegistrationControllers = {
    createSemester,
    getAllSemestersRegistrations,
    getSingleSemestersRegistration,
    updateSemestersRegistration
}