import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";
 
 

 
const createAcademicDepartmentInDB =  async (payLoad: TAcademicDepartment) => {



   
 

const result = await AcademicDepartment.create(payLoad);
return result;
}

const getAllAcademicFacultiesFromDB =  async () => {
    const result = await AcademicDepartment.find().populate('academicFaculty');
    return result;
}
const getSingleAcademicFacultiesFromDB =  async (id: string) => {
    const result = await AcademicDepartment.findById(id).populate('academicFaculty');
    return result;
}

const updateAcademicDepartmentIntoDB = async (
    id: string,
    payload: Partial<TAcademicDepartment>,
) => {
  
    const result = await AcademicDepartment.findOneAndUpdate({_id : id}, payload, {
        new : true, 
    })
    return result;
}


export const AcademicDepartmentServices = {
     createAcademicDepartmentInDB,
     getAllAcademicFacultiesFromDB,
     getSingleAcademicFacultiesFromDB,
updateAcademicDepartmentIntoDB

}