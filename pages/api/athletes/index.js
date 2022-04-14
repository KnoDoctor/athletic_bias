import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { generateGuid } from "../../../utils/uuids";

export default async function handle(req, res) {
    switch (req.method) {
        case "GET":
            return getAthletes();
        case "POST":
            return createAthlete();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function getAthletes() {
        try {
            const allAthletes = await prisma.athletes.findMany({
                include: {
                    sport: true,
                    bias: true,
                    rugby_stat: true,
                },
            });

            res.status(200).json({
                success: true,
                data: allAthletes,
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                success: false,
                error: error,
            });
        }
    }

    async function createAthlete() {
        try {
            const { first_name, last_name, email } = req.body;

            if (!first_name) {
                return res.status(400).json({
                    success: false,
                    error: "Could not create athlete, first name parameter is missing.",
                });
            }
            if (!last_name) {
                return res.status(400).json({
                    success: false,
                    error: "Could not create athlete, last name parameter is missing.",
                });
            }
            if (!email) {
                return res.status(400).json({
                    success: false,
                    error: "Could not create athlete, email parameter is missing.",
                });
            }

            const createdAthlete = await prisma.athletes.create({
                data: {
                    athlete_id: generateGuid(),
                    first_name,
                    last_name,
                    email,
                },
            });

            res.status(201).json({
                success: true,
                data: createdAthlete,
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
