import { academicSemesterNameCodeMapper } from './academicSemester.const';
import { TAcademicSemester} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
const createAcademicSemesterInDB =  async (payLoad: TAcademicSemester) => {



   

// semester === semestercode 

if(academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code){
    throw new Error ('Invalid Semester code')
}

const result = await AcademicSemester.create(payLoad);
return result;
}

const getAllAcademicSemesterFromDB =  async () => {
    const result = await AcademicSemester.find();
    return result;
}
const getSingleAcademicSemesterFromDB =  async (id: string) => {
    const result = await AcademicSemester.findById(id);
    return result;
}

const updateAcademicSemesterIntoDB = async (
    id: string,
    payload: Partial<TAcademicSemester>,
) => {
    if(payload.name && payload.code && academicSemesterNameCodeMapper[payload.name] !== payload.code){
        throw new Error ('Invalid semester name/code');
    };

    const result = await AcademicSemester.findOneAndUpdate({_id : id}, payload, {
        new : true, 
    })
    return result;
}


export const AcademicSemesterServices = {
    createAcademicSemesterInDB,
    getAllAcademicSemesterFromDB,
    getSingleAcademicSemesterFromDB,
    updateAcademicSemesterIntoDB

}