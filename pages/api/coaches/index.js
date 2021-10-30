import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { generateGuid } from "../../../utils/uuids";

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
        try {
            const allUsers = await prisma.coaches.findMany({
                select: { id: true, email: true, first_name: true },
            });

            res.status(200).json({
                success: true,
                data: allUsers,
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                success: false,
                error: error,
            });
        }
    }

    async function createCoach() {
        try {
            const { first_name, email } = req.body;

            if (!first_name || !email) {
                return res.status(400).json({
                    success: false,
                    error: "Could not create coach, first name or email parameter is missing.",
                });
            }

            const createdCoach = await prisma.coaches.create({
                data: {
                    id: generateGuid(),
                    first_name,
                    email,
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
