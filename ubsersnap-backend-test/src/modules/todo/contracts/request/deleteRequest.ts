import { body, ValidationChain } from 'express-validator';

const deleteRequest = (): ValidationChain[] => [
    body('id').isLength({ min: 1 }).withMessage('id is required'),
];

interface DeleteRequest {
    id: string;
}

export {
    deleteRequest,
    DeleteRequest,
};
