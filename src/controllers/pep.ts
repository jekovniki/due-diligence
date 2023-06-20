import { Request, Response } from "express";
import { SERVER, SUCCESS } from '../utils/constants/status-codes';
import { getPEPList } from "../services/commission-against-corruption";


export async function getPEPstatus(request: Request, response: Response) {
    try {
        if (!request?.query?.name) {
            const result = await getPEPList();
            response.status(SUCCESS.OK.CODE).send(result);
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
