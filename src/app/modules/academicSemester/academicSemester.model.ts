
import { Schema, model } from 'mongoose';
import { TAcademicSemester} from './academicSemester.interface';
import { AcademicSemestersCode, AcademicSemestersName, Months } from './academicSemester.const';



const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemestersName
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemestersCode
    },
    startMonth: {
      type: String,
      enum:Months,
      required: true,
    },
    endMonth: {
      type: String,
      enum:Months,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

AcademicSemesterSchema.pre('save' ,async function (next) {

  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year, 
  })
  if(isSemesterExists){
    throw new Error ('Semester is already exists')
  }
  next()
  
})


export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', AcademicSemesterSchema)

    