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
                let coach;

                coach = await prisma.coaches.findUnique({
                    where: {
                        coach_id: identifier,
                    },
                    //select: { coach_id: true, email: true, first_name: true },
                    include: {
                        preferences: { include: { preference: true } },
                        sport: true,
                    },
                });

                if (coach) {
                    res.status(200).json({
                        success: true,
                        data: coach,
                    });
                } else {
                    res.status(404).json({
                        success: false,
                        data: coach,
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
                const {
                    first_name,
                    last_name,
                    email,
                    date_of_birth,
                    education_level,
                    city_of_birth,
                    city_of_residence,
                    gender_identity,
                } = req.body;

                const patchedPost = await prisma.coaches.update({
                    where: {
                        coach_id: identifier,
                    },
                    data: {
                        first_name,
                        last_name,
                        email,
                        date_of_birth,
                        education_level,
                        city_of_birth,
                        city_of_residence,
                        gender_identity,
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
                const deletedPost = await prisma.coaches.delete({
                    where: {
                        coach_id: identifier,
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
