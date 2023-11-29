import { Student } from './student.model';


const getAllStudents = async () => {
  const result = await Student.find();
  return result;
};

const getSingleFromDb = async (id: string) => {
  const result = await Student.findOne({ id: id });
  return result;
};

export const StudentServices = {
  getAllStudents,
  getSingleFromDb,
};
