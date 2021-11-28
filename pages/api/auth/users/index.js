import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

import { generateGuid } from "../../../../utils/uuids";

export default async function handle(req, res) {
    switch (req.method) {
        case "GET":
            return getUsers();
        case "POST":
            return createUser();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    async function getUsers() {
        try {
            const allUsers = await prisma.users.findMany({
                select: {
                    user_id: true,
                    email: true,
                },
            });

            res.status(200).json({
                success: true,
                data: allUsers,
            });
        } catch (error) {
            console.log(error);
            res.status(400).json({
                success: false,
                error: error,
            });
        }
    }

    async function createUser() {
        try {
            const { email, password } = req.body;

            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            if (!email) {
                return res.status(400).json({
                    success: false,
                    error: "Could not create user, email parameter is missing.",
                });
            }

            if (!password) {
                return res.status(400).json({
                    success: false,
                    error: "Could not create user, password parameter is missing.",
                });
            }

            const createdUser = await prisma.users.create({
                data: {
                    user_id: generateGuid(),
                    email,
                    password: hashedPassword,
                },
            });

            res.status(201).json({
                success: true,
                data: createdUser,
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
