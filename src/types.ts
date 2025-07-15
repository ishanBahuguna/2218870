export interface LogPayload {
    stack:"frontend" | "backend";
    level: "info" | "warn" | "error" | "fatal";
    package:string;
    message:string;
}

export interface LogResponse {
    logId : string;
    message:string;
}

export interface UrllData {
    url:string;
    validity: number | 30;
    shortcode : string | "";
}