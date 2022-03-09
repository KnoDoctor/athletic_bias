import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import AthleteOverview from "../molecules/AthleteOverview";
import AthleteProfile from "../molecules/AthleteProfile";
import AthleteBiography from "../molecules/AthleteBiography";
import SurveryResponseForm from "../organisms/SurveryResponseForm";

const Survey = () => {
    return (
        <Card elevation={5}>
            <Box
                style={{
                    width: "90%",
                    margin: "1rem auto",
                }}
            >
                <AthleteProfile
                    athleteName={"Jimmy Athlete"}
                    athletePhoto={
                        "/images/profile-pictures/soccer-player-1.jpg"
                    }
                    athletePosition={"Forward"}
                />
                <AthleteOverview />
                <AthleteBiography />
                <SurveryResponseForm />
            </Box>
        </Card>
    );
};

export default Survey;
