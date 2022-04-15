import React, { useState } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import SurveyAthleteOverview from "../n_cells/SurveyAthleteOverview";
import SurveyResponseForm from "../organisms/SurveyResponseForm";

const Survey = ({ athletes }) => {
    const [athleteProfileIndex, setAthleteProfileIndex] = useState(0);

    const handleNextClick = () => {
        setAthleteProfileIndex(athleteProfileIndex + 1);
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <Card elevation={5}>
            <Box
                style={{
                    width: "90%",
                    margin: "1rem auto",
                }}
            >
                <SurveyAthleteOverview
                    athlete={athletes[athleteProfileIndex]}
                />
                <SurveyResponseForm
                    athleteProfileIndex={athleteProfileIndex}
                    athletes={athletes}
                    handleNextClick={handleNextClick}
                />
            </Box>
        </Card>
    );
};

export default Survey;
