import { NextRequest, NextResponse } from "next/server";
const jwt = require("jsonwebtoken");
import { parse } from "cookie";

export function middleware(req: NextRequest) {
    const authHeader = req.headers.get("cookie");

    if (authHeader) {
        const token = authHeader && parse(authHeader).accessToken;

        if (token == null)
            return new Response("No token provided", {
                status: 401,
            });

        return jwt.verify(
            token,
            process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET,
            (err) => {
                if (err)
                    return new Response("Forbidden", {
                        status: 403,
                    });

                return NextResponse.next();
            }
        );
    }

    return new Response("No cookies provided", {
        status: 403,
    });
}
