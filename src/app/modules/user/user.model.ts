import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";
import { UserStatus } from "./user.const";

const userSchema = new Schema<TUser, UserModel>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true,
        select: 0
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    passwordChangedAt: {
        type: Date,
    },

    role: {
        type: String,
        enum: ['student', 'faculty', 'admin']
    },
    status: {
        type: String,
        enum: UserStatus,
        default: 'in-progress',
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },

}, {
    timestamps: true
});


userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    );
    next();

})


userSchema.post('save', function (doc, next) {
    doc.password = '';
    next()
})

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
    return await User.findOne({ id }).select('+password');
}
userSchema.statics.isUserPasswordMatched = async function (plainTextPassword, hashedPassword) {
    return await bcrypt.compare(plainTextPassword, hashedPassword)
        ;
}

userSchema.statics.isJwtIssuedBeforePasswordChange = function(passwordChangedTimeStamp : Date, jwtIssuedTimeStamp: number){
    const passwordChangeTime = new Date (passwordChangedTimeStamp).getTime()/1000;
return passwordChangeTime > jwtIssuedTimeStamp;
}
export const User = model<TUser, UserModel>('User', userSchema);