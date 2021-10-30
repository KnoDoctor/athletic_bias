import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { checkIfGuid } from "../../../../utils/uuids";

export default async function handle(req, res) {
    const {
        query: { identifier },
        method,
    } = req;

    const isGuid = checkIfGuid(identifier);

    switch (method) {
        case "GET":
            try {
                let coach;

                coach = await prisma.coaches.findUnique({
                    where: {
                        id: identifier,
                    },
                    select: { id: true, email: true, first_name: true },
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
                const { first_name, email } = req.body;

                const patchedPost = await prisma.coaches.update({
                    where: {
                        id: identifier,
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
                const deletedPost = await prisma.coaches.delete({
                    where: {
                        id: identifier,
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
