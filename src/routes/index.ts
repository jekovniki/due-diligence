import { Request, Response, Router } from "express";
import { SUCCESS } from "../utils/constants/status-codes";
import { loggingMiddleware } from "../middleware/logging";
import apiRouter from "./api";

const router = Router();

router.use('/api', loggingMiddleware, apiRouter);
router.get('/', loggingMiddleware, (_request: Request, response: Response) => {
    response.status(SUCCESS.OK.CODE).send({
        message: 'Welcome to Due Diligence platform'
    })
})

export default router;