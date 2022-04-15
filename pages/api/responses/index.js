import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { generateGuid } from "../../../utils/uuids";

export default async function handle(req, res) {
    switch (req.method) {
        // case "GET":
        //     return getBiases();
        case "POST":
            return createResponse();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    // async function getBiases() {
    //     try {
    //         const allBiases = await prisma.biases.findMany({});

    //         res.status(200).json({
    //             success: true,
    //             data: allBiases,
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(400).json({
    //             success: false,
    //             error: error,
    //         });
    //     }
    // }

    async function createResponse() {
        try {
            const {
                athlete_id,
                coach_id,
                likelihood_to_recruit,
                likelihood_to_succeed,
            } = req.body;

            if (!athlete_id) {
                return res.status(400).json({
                    success: false,
                    error: "Could not create response, athlete_id parameter is missing.",
                });
            }
            if (!coach_id) {
                return res.status(400).json({
                    success: false,
                    error: "Could not create response, coach_id parameter is missing.",
                });
            }
            if (!likelihood_to_recruit) {
                return res.status(400).json({
                    success: false,
                    error: "Could not create response, likelihood_to_recruit parameter is missing.",
                });
            }
            if (!likelihood_to_succeed) {
                return res.status(400).json({
                    success: false,
                    error: "Could not create response, likelihood_to_succeed parameter is missing.",
                });
            }

            const createdResponse = await prisma.responses.create({
                data: {
                    response_id: generateGuid(),
                    athlete_id,
                    coach_id,
                    likelihood_to_recruit: parseInt(likelihood_to_recruit),
                    likelihood_to_succeed: parseInt(likelihood_to_succeed),
                },
            });

            res.status(201).json({
                success: true,
                data: createdResponse,
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
