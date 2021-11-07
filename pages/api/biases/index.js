import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { generateGuid } from "../../../utils/uuids";

export default async function handle(req, res) {
    switch (req.method) {
        case "GET":
            return getBiases();
        case "POST":
            return createBias();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function getBiases() {
        try {
            const allBiases = await prisma.biases.findMany({});

            res.status(200).json({
                success: true,
                data: allBiases,
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                success: false,
                error: error,
            });
        }
    }

    async function createBias() {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({
                    success: false,
                    error: "Could not create bias, name parameter is missing.",
                });
            }

            const createdBias = await prisma.biases.create({
                data: {
                    bias_id: generateGuid(),
                    name,
                },
            });

            res.status(201).json({
                success: true,
                data: createdBias,
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
