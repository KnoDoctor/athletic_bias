import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { generateGuid } from "../../../utils/uuids";

export default async function handle(req, res) {
    switch (req.method) {
        case "GET":
            return getSports();
        case "POST":
            return createSport();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function getSports() {
        try {
            const allSports = await prisma.sports.findMany({});

            res.status(200).json({
                success: true,
                data: allSports,
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                success: false,
                error: error,
            });
        }
    }

    async function createSport() {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({
                    success: false,
                    error: "Could not create sport, name parameter is missing.",
                });
            }

            const createdSport = await prisma.sports.create({
                data: {
                    sport_id: generateGuid(),
                    name,
                },
            });

            res.status(201).json({
                success: true,
                data: createdSport,
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
