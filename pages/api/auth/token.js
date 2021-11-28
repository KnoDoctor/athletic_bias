import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import { generateRefreshToken } from "../../../utils/tokens";
import { generateGuid } from "../../../utils/uuids";
import { getCookies } from "../../../utils/cookies";

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
            const { refreshToken } = getCookies(req);

            res.status(200);
            res.send({
                success: true,
                refreshToken,
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
