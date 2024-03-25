import { body, ValidationChain } from 'express-validator';

const sendRequest = (): ValidationChain[] => [
    body('message').isLength({ min: 1 }).withMessage('message is required'),
];

interface SendMessage {
    message: String;
}

export {
    sendRequest,
    SendMessage,
};
