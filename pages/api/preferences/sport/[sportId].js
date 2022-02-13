import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handle(req, res) {
    const {
        query: { sportId },
        method,
    } = req;

    switch (method) {
        case "GET":
            try {
                const getPreferences = await prisma.preferences.findMany({
                    where: {
                        sports: {
                            some: {
                                sport: {
                                    sport_id: sportId,
                                },
                            },
                        },
                    },
                });

                if (getPreferences) {
                    res.status(200).json({
                        success: true,
                        data: getPreferences,
                    });
                } else {
                    res.status(404).json({
                        success: false,
                        data: getPreferences,
                    });
                }
            } catch (error) {
                console.log(error);

                res.status(400).json({
                    success: false,
                    error: error,
                });
            }
            break;

        default:
            res.status(400).json({
                success: false,
                error: "Invalid Request - Please provide a GET request.",
            });
            break;
    }
}
