import { PrismaClient } from "@prisma/client";
import { serialize } from "cookie";
import { authenticateToken } from "../../../utils/tokens";
import { getCookies } from "../../../utils/cookies";

const prisma = new PrismaClient();

export default async function handle(req, res) {
    switch (req.method) {
        case "GET":
            return logout();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    async function logout() {
        try {
            const { refreshToken } = getCookies(req);

            res.setHeader(
                "Set-Cookie",
                serialize("refreshToken", "deleted", {
                    path: "/",
                    expires: new Date(),
                })
            );
            if (!authenticateToken(refreshToken))
                return res.status(403).json({
                    success: false,
                    message: "No token provided with request",
                });

            await prisma.tokens.delete({
                where: {
                    token_id: authenticateToken(refreshToken).token_id,
                },
            });

            await prisma.tokens.deleteMany({
                where: {
                    parent_id: authenticateToken(refreshToken).parent_id,
                },
            });

            res.status(200).json({
                success: true,
                data: null,
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
