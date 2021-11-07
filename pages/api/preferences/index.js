import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { generateGuid } from "../../../utils/uuids";

export default async function handle(req, res) {
    switch (req.method) {
        case "GET":
            return getPreferences();
        case "POST":
            return createPreference();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function getPreferences() {
        try {
            const allPreferences = await prisma.preferences.findMany({
                // include: {
                //     sport: true,
                // },
            });

            res.status(200).json({
                success: true,
                data: allPreferences,
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                success: false,
                error: error,
            });
        }
    }

    async function createPreference() {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({
                    success: false,
                    error: "Could not create preference, name parameter is missing.",
                });
            }

            const createdPreference = await prisma.preferences.create({
                data: {
                    preference_id: generateGuid(),
                    name,
                },
            });

            res.status(201).json({
                success: true,
                data: createdPreference,
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
