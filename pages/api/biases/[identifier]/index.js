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
                let bias;

                bias = await prisma.biases.findUnique({
                    where: {
                        bias_id: identifier,
                    },
                });

                if (bias) {
                    res.status(200).json({
                        success: true,
                        data: bias,
                    });
                } else {
                    res.status(404).json({
                        success: false,
                        data: bias,
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

                const patchedBias = await prisma.biases.update({
                    where: {
                        bias_id: identifier,
                    },
                    data: {
                        name,
                    },
                });

                res.status(200).json({
                    success: true,
                    data: patchedBias,
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
                const deletedBias = await prisma.biases.delete({
                    where: {
                        bias_id: identifier,
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
