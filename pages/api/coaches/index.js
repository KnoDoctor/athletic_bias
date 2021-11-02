import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import Cors from "cors";
import initMiddleware from "../../../utils/init-middleware";

import { generateGuid } from "../../../utils/uuids";

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        methods: ["GET", "POST", "OPTIONS"],
    })
);

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
            await cors(req, res);

            const { first_name, last_name, email } = req.body;

            if (!first_name) {
                return res.status(400).json({
                    success: false,
                    error: "Could not create coach, first name parameter is missing.",
                });
            }
            if (!last_name) {
                return res.status(400).json({
                    success: false,
                    error: "Could not create coach, last name parameter is missing.",
                });
            }
            if (!email) {
                return res.status(400).json({
                    success: false,
                    error: "Could not create coach, email parameter is missing.",
                });
            }

            const createdCoach = await prisma.coaches.create({
                data: {
                    id: generateGuid(),
                    first_name,
                    last_name,
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
