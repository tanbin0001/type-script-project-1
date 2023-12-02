import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  LocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
  studentMethod,
} from './student.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
    // validate: {
    //   validator:(value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid'
    // }
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<TStudent, StudentModel, studentMethod>({
  id: {
    type: String,
    unique: true,
    required: [true, 'Student ID is required.'],
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'user ID is required.'],
    unique: true,
    ref: 'User',
  },
  name: {
    type: userNameSchema,
    required: [true, 'Student name is required.'],
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: [true, 'Gender is required.'],
  },
  dateOfBirth: {
    type: Date,
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email',
    },
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required.'],
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required.'],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required.'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required.'],
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian information is required.'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian information is required.'],
  },
  profileImg: {
    type: String,
  },
  academicSemester : {
    type: Schema.Types.ObjectId,
    ref: 'AcademicSemester'
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref: 'AcademicDepartment',
  },
});

export const Student = model<TStudent, StudentModel>('Student', studentSchema);

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });

  return existingUser;
};
