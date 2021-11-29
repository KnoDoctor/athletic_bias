import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import {
    generateRefreshToken,
    generateAccessToken,
} from "../../../utils/tokens";
import { generateGuid } from "../../../utils/uuids";

const prisma = new PrismaClient();

export default async function handle(req, res) {
    switch (req.method) {
        case "POST":
            return login();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    async function login() {
        try {
            const user = await prisma.users.findMany({
                where: {
                    email: req.body.email,
                },
            });

            if (await bcrypt.compare(req.body.password, user[0].password)) {
                let token_id = generateGuid();
                let parent_id = generateGuid();
                const accessToken = generateAccessToken({
                    email: user[0].email,
                });
                // const idToken = generateIdToken(user.data);
                const expiryDate = new Date(
                    Date.now() +
                        1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 7
                );
                const refreshToken = generateRefreshToken({
                    email: user[0].email,
                    token_id,
                    parent_id,
                });

                await prisma.tokens.create({
                    data: {
                        token_id: token_id,
                        token: refreshToken,
                        expiry_date: expiryDate,
                        parent_id: parent_id,
                        user_id: user[0].user_id,
                    },
                });

                res.status(200);
                res.setHeader("Set-Cookie", [
                    serialize("refreshToken", refreshToken, {
                        // "sameSite": 'strict',
                        path: "/",
                        expires: expiryDate,
                        httpOnly: true,
                        // "secure": true
                    }),
                    serialize("accessToken", accessToken, {
                        // "sameSite": 'strict',
                        path: "/",
                        expires: expiryDate,
                        httpOnly: true,
                        // "secure": true
                    }),
                ]);

                res.send({
                    success: true,
                    message: "Login succeeded",
                    accessToken: accessToken,
                    // idToken: idToken,
                    refreshToken: refreshToken,
                });
            } else {
                res.status(403);
                res.send({
                    success: false,
                    message: "Login failed",
                });
            }
        } catch (error) {
            console.log(error);
            res.status(400);
            res.send({
                success: false,
                error: error.message,
            });
        }
    }
}
