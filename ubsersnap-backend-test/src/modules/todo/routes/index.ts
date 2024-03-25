import express, { Request, Response } from "express";
import { deleteTodo, index, listTodo } from "../controllers/todoController";
import { sendRequest } from "../contracts/request/sendRequest";
import { validationResults } from "../../../middleware/validationResults";
import { deleteRequest } from "../contracts/request/deleteRequest";
const router = express.Router();

router.get('/todo', listTodo)
router.post('/todo', sendRequest(), validationResults, index)
router.delete('/todo', deleteRequest(), validationResults, deleteTodo)

export { router as todoRoutes };
