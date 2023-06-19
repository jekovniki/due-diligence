import { Request, Response } from "express";
import { ERRORS, SERVER, SUCCESS } from '../utils/constants/status-codes';


export async function getPEPstatus(request: Request, response: Response) {
    try {
        if (!request.query.name) {
            response.status(ERRORS.BAD_REQUEST.CODE).send(ERRORS.BAD_REQUEST.MESSAGE);
            return;
        }

        const result = "person"

        response.status(SUCCESS.OK.CODE).send(result);
    } catch (error) {
        response.status(SERVER.ERROR.CODE).send({
            success: false,
            message: SERVER.ERROR.MESSAGE
        })
    }
}
