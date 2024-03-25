import { Response } from "express";

const response = (res: Response, status: number = 200, code: string = '200', data: any = {}, message: any = '') => {
    res.status(status)
    let messageError: any
    if (Array.isArray(message)) {
        if (message.length == 1) {
            const key = Object.keys(message[0])
            messageError = getValue(message[0], key)
            res.json({
                status,
                code,
                data,
                message: messageError,
            })
        } else {
            res.json({
                status,
                code,
                data,
                message,
            })
        }
    } else {
        res.json({
            status,
            code,
            data,
            message,
        })
    }


    res.end()
}

function getValue(obj: any, key: any) {
    if (key in obj) {
        return obj[key];
    }
    return undefined;
}

export {
    response,
}