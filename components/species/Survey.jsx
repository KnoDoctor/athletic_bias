import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import AthleteOverview from "../molecules/AthleteOverview";
import AthleteProfile from "../molecules/AthleteProfile";
import AthleteBiography from "../molecules/AthleteBiography";
import SurveryResponseForm from "../organisms/SurveryResponseForm";
import AthleteStats from "../molecules/AthleteStats";

const athletes = [
    {
        name: "John Stevenson",
        photo: "/images/profile-pictures/soccer-player-1.jpg",
        position: "Fullback",
        age: 14,
        height: 174.3,
        weight: 63.45,
        bio: [
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident aspernatur itaque ipsam iste ullam rem cum, quibusdam vero aut maiores doloribus quod nemo modi alias temporibus perspiciatis officiis incidunt quasi!",
            "John was born into a family of football players and from an early age demonstrated a natural talent for the sport. His father coached the local sport team to back to back championships and his mother was the first women to play football on Mars.",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident aspernatur itaque ipsam iste ullam rem cum, quibusdam vero aut maiores doloribus quod nemo modi alias temporibus perspiciatis officiis incidunt quasi!",
        ],
        stats: [
            {
                name: "Vertical Jump",
                value: 36.0,
                mean: 26.87,
            },
            {
                name: "Mid Thigh Pull",
                value: 118.0,
                mean: 102.01,
            },
            {
                name: "Relative Mid Thigh Pull",
                value: 1.98,
                mean: 1.59,
            },
            {
                name: "10m Sprint Time",
                value: 1.9,
                mean: 2.01,
            },
            {
                name: "505 Left",
                value: 2.55,
                mean: 2.63,
            },
            {
                name: "505 Right",
                value: 2.84,
                mean: 2.64,
            },
            {
                name: "Aggregate 505",
                value: 2.7,
                mean: 2.64,
            },
        ],
    },
    {
        name: "Sam Smith",
        photo: "/images/profile-pictures/soccer-player-2.jpg",
        position: "Wing",
        age: 14,
        height: 154.5,
        weight: 46.6,
        bio: [
            "From the day Sam saw his first rugby match he knew it was a sport he needed to play. Incredibly hardworking Sam practices a minimum a 2 hours each day and focuses on a combination of agility and stringth exercises.",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident aspernatur itaque ipsam iste ullam rem cum, quibusdam vero aut maiores doloribus quod nemo modi alias temporibus perspiciatis officiis incidunt quasi!",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident aspernatur itaque ipsam iste ullam rem cum, quibusdam vero aut maiores doloribus quod nemo modi alias temporibus perspiciatis officiis incidunt quasi!",
        ],
        stats: [
            {
                name: "Vertical Jump",
                value: 36.0,
                mean: 26.87,
            },
            {
                name: "Mid Thigh Pull",
                value: 118.0,
                mean: 102.01,
            },
            {
                name: "Relative Mid Thigh Pull",
                value: 1.98,
                mean: 1.59,
            },
            {
                name: "10m Sprint Time",
                value: 1.9,
                mean: 2.01,
            },
            {
                name: "505 Left",
                value: 2.55,
                mean: 2.63,
            },
            {
                name: "505 Right",
                value: 2.84,
                mean: 2.64,
            },
            {
                name: "Aggregate 505",
                value: 2.7,
                mean: 2.64,
            },
        ],
    },
    {
        name: "Kevin Richardson",
        photo: "/images/profile-pictures/soccer-player-3.jpg",
        position: "Prop",
        age: 14,
        height: 165.0,
        weight: 53.5,
        bio: [
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident aspernatur itaque ipsam iste ullam rem cum, quibusdam vero aut maiores doloribus quod nemo modi alias temporibus perspiciatis officiis incidunt quasi!",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident aspernatur itaque ipsam iste ullam rem cum, quibusdam vero aut maiores doloribus quod nemo modi alias temporibus perspiciatis officiis incidunt quasi!",
            "Kevin was born into a family of football players and from an early age demonstrated a natural talent for the sport. His father coached the local sport team to back to back championships and his mother was the first women to play football on Mars.",
        ],
        stats: [
            {
                name: "Vertical Jump",
                value: 36.0,
                mean: 26.87,
            },
            {
                name: "Mid Thigh Pull",
                value: 118.0,
                mean: 102.01,
            },
            {
                name: "Relative Mid Thigh Pull",
                value: 1.98,
                mean: 1.59,
            },
            {
                name: "10m Sprint Time",
                value: 1.9,
                mean: 2.01,
            },
            {
                name: "505 Left",
                value: 2.55,
                mean: 2.63,
            },
            {
                name: "505 Right",
                value: 2.84,
                mean: 2.64,
            },
            {
                name: "Aggregate 505",
                value: 2.7,
                mean: 2.64,
            },
        ],
    },
];

const Survey = () => {
    const [athleteProfileIndex, setAthleteProfileIndex] = useState(0);

    const handleNextClick = () => {
        setAthleteProfileIndex(athleteProfileIndex + 1);
        window.scrollTo(0, 0);
    };

    return (
        <Card elevation={5}>
            <Box
                style={{
                    width: "90%",
                    margin: "1rem auto",
                }}
            >
                <AthleteProfile
                    athleteName={athletes[athleteProfileIndex].name}
                    athletePhoto={athletes[athleteProfileIndex].photo}
                    athletePosition={athletes[athleteProfileIndex].position}
                />
                <AthleteOverview
                    athleteAge={athletes[athleteProfileIndex].age}
                    athleteHeight={athletes[athleteProfileIndex].height}
                    athleteWeight={athletes[athleteProfileIndex].weight}
                />
                <AthleteBiography bio={athletes[athleteProfileIndex].bio} />
                <AthleteStats stats={athletes[athleteProfileIndex].stats} />
                <SurveryResponseForm
                    athleteProfileIndex={athleteProfileIndex}
                    handleNextClick={handleNextClick}
                />
            </Box>
        </Card>
    );
};

export default Survey;
