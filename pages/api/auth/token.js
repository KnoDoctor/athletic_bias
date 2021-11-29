import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import { generateRefreshToken } from "../../../utils/tokens";
import { generateGuid } from "../../../utils/uuids";
import { getCookies } from "../../../utils/cookies";
import { authenticateToken, generateAccessToken } from "../../../utils/tokens";

const prisma = new PrismaClient();

export default async function handle(req, res) {
    switch (req.method) {
        case "GET":
            return token();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    async function token() {
        try {
            // const { refreshToken } = getCookies(req);

            if (!getCookies(req).refreshToken)
                return res.status(401).send({
                    sucess: false,
                    message: "No refresh token provided.",
                });

            // const refreshToken = await client.query(
            //     Get(Match(Index("refresh_token_by_token"), req.body.token))
            // );
            const token = authenticateToken(getCookies(req).refreshToken);

            if (!token)
                return res.status(401).send({
                    sucess: false,
                    message: "Invalid refresh token provided.",
                });

            const refreshToken = await prisma.tokens.findUnique({
                where: {
                    token_id: token.token_id,
                },
            });

            if (!refreshToken) {
                await prisma.tokens.deleteMany({
                    where: {
                        parent_id: token.parent_id,
                    },
                });
                return res.status(401).send({
                    sucess: false,
                    message: "Refresh token provided has expired.",
                });
            }

            const accessToken = generateAccessToken({
                email: token.email,
                token_id: token.token_id,
            });

            const deletedToken = await prisma.tokens.delete({
                where: {
                    token_id: token.token_id,
                },
            });

            let newRefreshTokenId = generateGuid();

            const newRefreshToken = generateRefreshToken({
                email: token.email,
                token_id: newRefreshTokenId,
                parent_id: token.parent_id,
            });

            const newRefreshTokenExpiryDate = new Date(
                Date.now() +
                    1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 7
            );

            await prisma.tokens.create({
                data: {
                    token_id: newRefreshTokenId,
                    token: newRefreshToken,
                    expiry_date: newRefreshTokenExpiryDate,
                    parent_id: refreshToken.parent_id,
                    user_id: refreshToken.user_id,
                },
            });

            res.setHeader("Set-Cookie", [
                serialize("refreshToken", newRefreshToken, {
                    // "sameSite": 'strict',
                    path: "/",
                    expires: newRefreshTokenExpiryDate,
                    httpOnly: true,
                    // "secure": true
                }),
                serialize("accessToken", accessToken, {
                    // "sameSite": 'strict',
                    path: "/",
                    expires: newRefreshTokenExpiryDate,
                    httpOnly: true,
                    // "secure": true
                }),
            ]);

            res.status(200);
            res.send({
                success: true,
                refreshToken,
                accessToken,
                newRefreshToken,
            });
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

// try {
//     let coach;

//     coach = await prisma.coaches.findUnique({
//         where: {
//             coach_id: identifier,
//         },
//         //select: { coach_id: true, email: true, first_name: true },
//         include: {
//             preferences: { include: { preference: true } },
//             sport: true,
//         },
//     });

//     if (coach) {
//         res.status(200).json({
//             success: true,
//             data: coach,
//         });
//     } else {
//         res.status(404).json({
//             success: false,
//             data: coach,
//         });
//     }
// } catch (error) {
//     console.log(error);

//     res.status(400).json({
//         success: false,
//         error: error,
//     });
// }
