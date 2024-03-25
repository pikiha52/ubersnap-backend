import { Request, Response } from "express"
import { response } from "../../../helpers/response"
import { SendMessage } from "../contracts/request/sendRequest";
import { getAllTodos, todoCreate, todoDelete } from "../services/todoService";
import { DeleteRequest } from "../contracts/request/deleteRequest";
import { TodoEntity } from "../entity/todo";

export const index = async (req: Request, res: Response) => {
    const requestData: SendMessage = req.body;
    todoCreate(requestData);
    return response(res, 201, `201`, null, "success send to queue");
}

export const deleteTodo = async (req: Request, res: Response) => {
    const requestData: DeleteRequest = req.body;
    todoDelete(requestData.id);
    return response(res, 201, `200`, null, "success delete queue");
}

export const listTodo = async (req: Request, res: Response) => {
    const todos: TodoEntity[] | null = await getAllTodos();
    return response(res, 200, '200', todos, "success");
}