import { sendResponse } from "../../utils/sendResponse"
import httpStatus from 'http-status-codes'
import { Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { ItemServices } from "./item.service"


const createItem = catchAsync(async( req:Request, res:Response)=>{
    const userId = req.user.userId
    const item= await ItemServices.createItem(req.body, userId);

    sendResponse(res,{
        success:true,
        statusCode: httpStatus.CREATED,
        message:"Item Created Successfully",
        data: item
    })
})

const allItem = catchAsync(async( req:Request, res:Response)=>{
    const query = req.query
    const items= await ItemServices.allItem(query);

    sendResponse(res,{
        success:true,
        statusCode: httpStatus.OK,
        message:"All Items retrieve successfully",
        data: items.data,
        meta: items.meta
    })
})

const itemById = catchAsync(async( req:Request, res:Response)=>{
    const id = req.params.id
    const item= await ItemServices.itemById(id);

    sendResponse(res,{
        success:true,
        statusCode: httpStatus.OK,
        message:"Item retrieve successfully",
        data: item,
    })
})

const updateItem= catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const userId = req.user.userId; 
  const payload = req.body;

  const updatedItem = await ItemServices.updateItem(id, userId, payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Item updated successfully",
    data: updatedItem,
  });
});

const deleteItem = catchAsync(async( req:Request, res:Response)=>{
    const id = req.params.id
    const userId = req.user.userId
    console.log(userId, id)

    await ItemServices.deleteItem(userId, id);

    sendResponse(res,{
        success:true,
        statusCode: httpStatus.OK,
        message:"Item deleted successfully",
        data: id,
    })
})


export const ItemControllers = {
    createItem,
    allItem,
    itemById,
    deleteItem,
    updateItem
}

