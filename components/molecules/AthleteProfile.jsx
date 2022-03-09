import React from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

const AthleteProfileCard = ({ athletePhoto, athleteName, athletePosition }) => {
    return (
        <Grid container my={3}>
            <Grid item xs={4}>
                <Avatar
                    alt="Remy Sharp"
                    src={athletePhoto}
                    sx={{ width: 128, height: 128 }}
                />
            </Grid>
            <Grid item>
                <h2 style={{ margin: 0 }}>{athleteName}</h2>
                <h4 style={{ margin: 0 }}>{athletePosition}</h4>
            </Grid>
        </Grid>
    );
};

export default AthleteProfileCard;
