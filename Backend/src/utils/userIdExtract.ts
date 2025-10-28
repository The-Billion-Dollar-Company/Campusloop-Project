import AppError from "../errorHelpers/AppError"
import httpStatus from 'http-status-codes'

export const extractUniversityId = (email:string):string=>{
    if(!email.endsWith("@cse.bubt.edu.bd")){
    throw new AppError(httpStatus.BAD_REQUEST, "Please Register with BUBT Edu mail");
    }
    const universityId = email.split("@")[0];

    // check if it's all digits (since student IDs are numeric)
    if (!/^\d+$/.test(universityId)) {
        throw new Error("Invalid student ID format in email.");
    }
    return universityId
}