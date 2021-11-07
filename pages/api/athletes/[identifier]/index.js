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
                let athlete;

                athlete = await prisma.athletes.findUnique({
                    where: {
                        athlete_id: identifier,
                    },
                    include: {
                        sport: true,
                    },
                });

                if (athlete) {
                    res.status(200).json({
                        success: true,
                        data: athlete,
                    });
                } else {
                    res.status(404).json({
                        success: false,
                        data: athlete,
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
                const { first_name, email } = req.body;

                const patchedPost = await prisma.athletes.update({
                    where: {
                        athlete_id: identifier,
                    },
                    data: {
                        first_name,
                        email,
                    },
                });

                res.status(200).json({
                    success: true,
                    data: patchedPost,
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
                const deletedPost = await prisma.athletes.delete({
                    where: {
                        athlete_id: identifier,
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
