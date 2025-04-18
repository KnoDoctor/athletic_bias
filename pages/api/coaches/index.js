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
            const allCoaches = await prisma.coaches.findMany({
                // select: {
                //     coach_id: true,
                //     email: true,
                //     first_name: true,
                //     sport: true,
                //     preferences: true,
                // },

                include: {
                    preferences: { include: { preference: true } },
                    sport: true,
                },
            });

            let finalResult = allCoaches.map((coach) => {
                return {
                    ...coach,
                    preferences: coach.preferences.map(
                        (preference) => preference.preference
                    ),
                };
            });

            res.status(200).json({
                success: true,
                data: finalResult,
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
            const {
                first_name,
                last_name,
                email,
                access_code,
                date_of_birth,
                current_signup_step,
            } = req.body;

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
                    coach_id: generateGuid(),
                    first_name,
                    last_name,
                    email,
                    date_of_birth,
                    access_code,
                    has_consented: true,
                    is_control: Math.random() < 0.5,
                    current_signup_step,
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
