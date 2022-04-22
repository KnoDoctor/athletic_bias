import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { generateGuid } from "../../../../utils/uuids";

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
                    sport_id,
                    natural_pref,
                    hard_work_pref,
                    preferences,
                    years_of_experience,
                    highest_level_coached,
                    currently_coaching,
                    last_age_coached,
                    athlete_in_sport,
                    level_of_experience,
                    primary_position_played,
                    completed_responses,
                    current_signup_step,
                } = req.body;

                const buildPreferencesArray = (preferences) => {
                    if (!preferences) return [];

                    let array = [];

                    preferences.map((preference) => {
                        array.push({
                            preference: {
                                connect: {
                                    preference_id: preference.preference_id,
                                },
                            },
                            coaches_preferences_id: generateGuid(),
                        });
                    });

                    return array;
                };

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
                        sport_id,
                        natural_pref,
                        hard_work_pref,
                        years_of_experience,
                        highest_level_coached,
                        currently_coaching,
                        last_age_coached,
                        athlete_in_sport,
                        level_of_experience,
                        primary_position_played,
                        completed_responses,
                        current_signup_step,
                        preferences: {
                            create: buildPreferencesArray(preferences),
                            //[
                            // {
                            //     preference: {
                            //         connect: {
                            //             preference_id:
                            //                 "c5fe206c-e0fa-4ed9-b795-854f3b2f6f71",
                            //         },
                            //     },
                            // },
                            // ],
                        },
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
