import { randomUUID } from "crypto";
import { sendToQueue } from "../../../helpers/sendToRabbit";
import { SendMessage } from "../contracts/request/sendRequest";
import { TodoEntity } from "../entity/todo";
import { consumeFromQueue } from "../../../app/app";

export const todoCreate = async (sendMessage: SendMessage): Promise<void> => {
    const currentTimeMillis = new Date().getTime();
    const entity: TodoEntity = {
        id: randomUUID(),
        name: sendMessage.message,
        created: currentTimeMillis
    }

    sendToQueue("req.create.todo", entity);
}

export const todoDelete = async (id: string): Promise<void> => {
    sendToQueue("req.delete.todo", { id });
}

export const getAllTodos = async () => {
    try {
        const todos: TodoEntity[] = [];
        const handleTodoMessage = (message: any) => {
            const { content } = message;
            const todoData = JSON.parse(content.toString());
            todos.push(todoData);
        };

        consumeFromQueue("todo.created", handleTodoMessage);
        await new Promise(resolve => setTimeout(resolve, 3000));
        return todos;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const handleTodoMessage = async (message: any) => {
    const { content, fields } = message;
    const { routingKey } = fields;

    try {
        const todoData = JSON.parse(content.toString());
        switch (routingKey) {
            case "req.create.todo":
                await createTodoFromMessage(todoData);
                break;
            case "req.delete.todo":
                await deleteTodoFromMessage(todoData);
                break;
            default:
                console.log("failed routing:", routingKey);
        }
    } catch (error) {
        console.error(error);
    }
}

async function createTodoFromMessage(todoData: any) {
    const { name } = todoData;
    const currentTimeMillis = new Date().getTime();
    const entity: TodoEntity = {
        id: randomUUID(),
        name: name,
        created: currentTimeMillis
    };
    sendToQueue("todo.created", entity);
}

async function deleteTodoFromMessage(todoData: any) {
    const { id } = todoData;
    const deletedEntity: any = { id: id };
    sendToQueue("todo.deleted", deletedEntity);
}


