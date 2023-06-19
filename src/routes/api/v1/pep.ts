import { Router } from "express";
import { getPEPstatus } from "../../../controllers/pep";

const pepRouter = Router({ mergeParams: true });

pepRouter
.get(`/pep`, getPEPstatus);

export default pepRouter;