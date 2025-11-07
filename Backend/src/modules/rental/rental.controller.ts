import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { RentalServices } from "./rental.service"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from 'http-status-codes'


const createRental= catchAsync(async( req:Request, res:Response)=>{
    const userId = req.user.userId
    const rent = await RentalServices.createRental(req.body, userId);

    sendResponse(res, {
        success:true,
        statusCode: httpStatus.CREATED,
        message:"Item rented request send successfully",
        data: rent
    })
   
})


export const RentalController = {
    createRental

}