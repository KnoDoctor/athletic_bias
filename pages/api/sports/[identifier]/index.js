import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handle(req, res) {
    const {
        query: { identifier },
        method,
    } = req;

    switch (method) {
        case "GET":
            try {
                let sport;

                sport = await prisma.sports.findUnique({
                    where: {
                        sport_id: identifier,
                    },
                });

                if (sport) {
                    res.status(200).json({
                        success: true,
                        data: sport,
                    });
                } else {
                    res.status(404).json({
                        success: false,
                        data: sport,
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

        case "PATCH":
            try {
                const { name } = req.body;

                const patchedSport = await prisma.sports.update({
                    where: {
                        sport_id: identifier,
                    },
                    data: {
                        name,
                    },
                });

                res.status(200).json({
                    success: true,
                    data: patchedSport,
                });
            } catch (error) {
                console.log(error);

                res.status(400).json({
                    success: false,
                    error: error,
                });
            }
            break;

        case "DELETE":
            try {
                const deletedSport = await prisma.sports.delete({
                    where: {
                        sport_id: identifier,
                    },
                });

                res.status(200).json({
                    success: true,
                    data: null,
                });
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
                error: "Invalid Request - Please provide a GET, PATCH, or DELETE request.",
            });
            break;
    }
}
