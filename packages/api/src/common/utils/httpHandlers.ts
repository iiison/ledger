import { NextFunction, Request, Response } from "express";
import { ServiceResponse, buildBadReqServiceResponse } from "../models/serviceResponse";
import { AllItemsFromDB } from "../../types";
import { ZodError, ZodSchema } from "zod";

export const handleServiceResponse = (
  serviceResponse: ServiceResponse<any>,
  response: Response
) => {
  return response.status(serviceResponse.statusCode).send(serviceResponse)
}

export const validateRequestData = (
  schema: ZodSchema
) => (
  req: Request, 
  res: Response,
  next: NextFunction
) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params
    })

    next()
  } catch(error) {
    const errorMessage = `Invalid input: ${(error as ZodError).errors.map((e) => e.message).join(', ')}`;

    buildBadReqServiceResponse(errorMessage)
  }
}
