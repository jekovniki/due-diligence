import { NextFunction, Request, Response } from "express";
import { SERVER } from "../utils/constants/status-codes";

export const loggingMiddleware = (request: Request, response: Response, next: NextFunction): void => {
    try {
        console.info(`HTTP: ${request.httpVersion} | METHOD: ${request.method} | URL: ${request.url}`);

        next();
    } catch (error) {
        response.status(SERVER.ERROR.CODE).send({
            success: false,
            message: SERVER.ERROR.MESSAGE
        })
    }
}