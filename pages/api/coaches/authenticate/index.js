import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handle(req, res) {
    switch (req.method) {
        case "POST":
            return authenticateCoach();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function authenticateCoach() {
        try {
            const { email, accessCode } = req.body;

            if (!email) {
                return res.status(400).json({
                    success: false,
                    error: "Could not authenicate coach, email parameter is missing.",
                });
            }
            if (!accessCode) {
                return res.status(400).json({
                    success: false,
                    error: "Could not authenicate coach, access code parameter is missing.",
                });
            }

            const authenicatedCoach = await prisma.coaches.findMany({
                where: {
                    email: email,
                    access_code: accessCode,
                },
                //select: { coach_id: true, email: true, first_name: true },
                include: {
                    preferences: { include: { preference: true } },
                    sport: true,
                },
            });

            res.status(200).json({
                success: true,
                data: authenicatedCoach,
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                success: false,
                error: error,
            });
        }
    }
}
