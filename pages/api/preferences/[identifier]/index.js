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
                let preference;

                preference = await prisma.preferences.findUnique({
                    where: {
                        preference_id: identifier,
                    },
                });

                if (preference) {
                    res.status(200).json({
                        success: true,
                        data: preference,
                    });
                } else {
                    res.status(404).json({
                        success: false,
                        data: preference,
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

                const patchedPreference = await prisma.preferences.update({
                    where: {
                        preference_id: identifier,
                    },
                    data: {
                        name,
                    },
                });

                res.status(200).json({
                    success: true,
                    data: patchedPreference,
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
                const deletedPreference = await prisma.preferences.delete({
                    where: {
                        preference_id: identifier,
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
