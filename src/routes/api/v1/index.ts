import { Router } from "express";
import pepRouter from "./pep";

const v1Router = Router();

v1Router.use(pepRouter);

export default v1Router;