import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = ["http://localhost:3000", "https://localhost:3000"];

export const enableCors = (req: NextRequest, res: NextResponse) => {
    res.headers.set("Access-Control-Allow-Credentials", "true");
    if (allowedOrigins.includes(req.headers.get("origin") ?? "")) {
        res.headers.set("Access-Control-Allow-Origin", req.headers.get("origin") ?? "");
    } else {
        res.headers.set("Access-Control-Allow-Origin", "https://demo.usenextbase.com");
    }

    res.headers.set("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    res.headers.set(
        "Access-Control-Allow-Headers",
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
};
