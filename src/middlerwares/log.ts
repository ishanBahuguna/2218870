import axios from "axios"
import { LogPayload , LogResponse } from "../types"
import dotenv from "dotenv"

dotenv.config()

const token = process.env.API_ACCESS_TOKEN
console.log(token)
export const log = async (
    stack: LogPayload['stack'],
    level: LogPayload['level'],
    pkg: string,
    message: string
): Promise<void> => {
    const payload: LogPayload = {
        stack,
        level,
        package: pkg,
        message
    }

    try {
        const res = await axios.post<LogResponse>("http://20.244.56.144/evaluation-service/logs" , payload  , {
            headers:{ 
                'Authorization':`Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        console.log(res)
    }
    catch(e:any) {
        console.log("error from log middleware : " , e)
    }
}