import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handle(req, res) {
    switch (req.method) {
        case "GET":
            return getCoaches();
        case "POST":
            return createCoach();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function getCoaches() {
        const allUsers = await prisma.coaches.findMany({
            select: { first_name: true, id: true },
        });

        res.json(allUsers);
    }

    async function createCoach() {
        try {
            const { first_name } = req.body;

            if (!first_name) {
                return res.status(400).json({
                    success: false,
                    error: "Could not create coach, first name parameter is missing.",
                });
            }

            const createdCoach = await prisma.coaches.create({
                data: {
                    first_name,
                },
            });

            res.status(201).json({
                success: true,
                data: createdCoach,
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
