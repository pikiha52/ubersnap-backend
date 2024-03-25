import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv"
import { response } from "../helpers/response";
import { todoRoutes } from "../modules/todo/routes";
import { handleTodoMessage } from "../modules/todo/services/todoService";
import amqp from 'amqplib/callback_api.js'
dotenv.config()

const port: any = process.env.APP_PORT || 3030;

const app: Express = express();

app.use(cors());
app.use(express.json());

const startTodoConsumer = async () => {
  consumeFromQueue("req.create.todo", handleTodoMessage);
  consumeFromQueue("req.delete.todo", handleTodoMessage);
}

export const consumeFromQueue = (queueName: string, callback: (message: any) => void, listAll: boolean = false) => {
  const rabbitUrl: string = process.env.RABBIT_HOST || 'amqp://guest:guest@localhost:5672'
  amqp.connect(rabbitUrl, function (error0, connection) {
      if (error0) {
          throw error0;
      }
      connection.createChannel(function (error1, channel) {
          if (error1) {
              throw error1;
          }
          channel.assertQueue(queueName, {
              durable: false
          });

          channel.consume(queueName, function (msg) {
              if (msg !== null) {
                  console.log(`Received message from ${queueName}`);
                  callback(msg);
                  channel.ack(msg);
              }
          }, {
              noAck: false
          });
      });
  });
}

app.use('/api', todoRoutes)
startTodoConsumer();

app.use((req: Request, res: Response, next: Function) => {
  return response(res, 404, '404', {}, 'Not Found')
})

app.listen(port, () => console.log(`Server up and running ${port} `));
