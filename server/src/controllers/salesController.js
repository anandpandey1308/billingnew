import Sales from "../models/salesSchema.js";
import {
  createErrorResponse,
  createSuccessResponse,
} from "../services/ResponseHandler.js";
import asyncHandler from "../services/asyncHandler.js";

export const createSale = asyncHandler(async (req, res) => {
  const { productName, quantitySold, totalPrice } = req.body;

  if (!productName || !quantitySold || !totalPrice) {
    throw createError("All fields are required", 400);
  }

  const sale = await Sales.create({
    productName,
    quantitySold,
    totalPrice,
  });

  if (!sale) {
    throw createError("Sale was not added", 400);
  }

  res
    .status(200)
    .json(
      createSuccessResponse(`Sale ${sale.productName} added successfully`, sale)
    );
});

export const getSales = asyncHandler(async (req, res) => {
  const sales = await Sales.find();

  if (sales.length === 0) {
    throw createErrorResponse("Sales not found", 404);
  }

  res
    .status(200)
    .json(createSuccessResponse("Sales retrieved successfully", sales));
});

export const deleteSale = asyncHandler(async (req, res) => {
  const { id: saleId } = req.params;
  const sale = await Sales.findByIdAndDelete(saleId);

  if (!sale) {
    throw createError("Sale not found", 404);
  }

  res
    .status(200)
    .json(createSuccessResponse("Sale deleted successfully", sale));
});
